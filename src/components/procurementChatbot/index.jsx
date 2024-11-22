import React, { useState, useEffect } from "react";
import bharatLogo from "../../assets/images/kpmg.jpg";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define a custom icon for markers
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Create a custom icon for counts on lines
const createIcon = (count, direction) => {
  const arrow = direction === "forward" ? "↑" : "↓"; // Use up and down arrows
  return new L.DivIcon({
    className: `leaflet-div-icon ${direction}`,
    html: `<div style="background: white; padding: 2px 4px; border: 1px solid black; border-radius: 3px; color: black; font-size: 10px; line-height: 12px; display: flex; align-items: center; justify-content: center;">${arrow} ${count}</div>`,
    iconSize: [40, 20], // Size of the box with number and arrow
    iconAnchor: [20, 10], // Center the icon
  });
};

const JalJeevanBot = ({
  startTime = "2024-08-21T08:00:00.000Z",
  endTime = "2024-08-21T08:05:00.000Z",
  submit,
}) => {
  const [points, setPoints] = useState([]);
  const [movements, setMovements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://20.244.107.209:8005/generate_maps/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_time: startTime || "2024-08-21T08:00:00.000Z",
            end_time: endTime || "2024-08-21T08:05:00.000Z",
          }),
        }
      );
      const data = await response.json();
      const result = data.result;

      // Extract time range keys
      const timeRange = Object.keys(result);

      // Prepare points and movements for all minutes
      const allPoints = [];
      const allMovements = [];

      timeRange.forEach((time) => {
        result[time].vehicle_counts.forEach((point) => {
          allPoints.push({
            id: allPoints.length,
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
            count: point.vehicle_count,
          });
        });

        result[time].vehicle_movements.forEach((movement) => {
          allMovements.push({
            fromLat: parseFloat(movement.from_latitude),
            fromLng: parseFloat(movement.from_longitude),
            toLat: parseFloat(movement.to_latitude),
            toLng: parseFloat(movement.to_longitude),
            count: movement.movement_count,
            direction:
              movement.from_latitude < movement.to_latitude ||
              movement.from_longitude < movement.to_longitude
                ? "forward"
                : "backward", // Determine direction based on coordinates
          });
        });
      });

      setPoints(allPoints);
      setMovements(allMovements);

      let index = 0;
      const interval = setInterval(() => {
        if (index >= timeRange.length) {
          clearInterval(interval); // Stop when done
          return;
        }

        const currentTime = timeRange[index];
        const currentPoints = result[currentTime].vehicle_counts.map(
          (point) => ({
            id: point.latitude + point.longitude,
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
            count: point.vehicle_count,
          })
        );
        const currentMovements = result[currentTime].vehicle_movements.map(
          (movement) => ({
            fromLat: parseFloat(movement.from_latitude),
            fromLng: parseFloat(movement.from_longitude),
            toLat: parseFloat(movement.to_latitude),
            toLng: parseFloat(movement.to_longitude),
            count: movement.movement_count,
            direction:
              movement.from_latitude < movement.to_latitude ||
              movement.from_longitude < movement.to_longitude
                ? "forward"
                : "backward", // Determine direction based on coordinates
          })
        );

        setPoints(currentPoints);
        setMovements(currentMovements);
        setCurrentIndex(index);

        index++;
      }, 3000); // Update every 3 seconds

      // Cleanup on component unmount
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (submit) {
      setPoints([]);
      setMovements([]);
      fetchData(); // Fetch data on component mount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  const colorForMovement = (movement) => {
    // Define different colors based on direction
    return movement.direction === "forward" ? "blue" : "blue";
  };

  return (
    <div className="w-[80%] relative h-full rounded-lg shadow-md bg-white">
      <div className="flex px-6 h-[17%] py-3 items-center rounded-t-lg bg-[#d7d3cd]">
        <img
          alt="bihar_logo"
          src={bharatLogo}
          className="rounded-[50%] h-[80px] w-auto mix-blend-multiply"
        />
        <h1 className="text-black text-[22px] font-medium mx-9">
          Virtual representation of real world
        </h1>
      </div>
      <hr className="h-px bg-gray-400 border-0"></hr>
      <div className="relative w-full h-[83%] rounded-md overflow-y-auto">
        <MapContainer
          center={[28.7041, 77.1025]}
          zoom={10}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {points.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={customIcon}
            >
              <Popup>{`Latitude: ${point.lat}, Longitude: ${point.lng}, Count: ${point.count}`}</Popup>
            </Marker>
          ))}
          {movements.map((movement, index) => {
            const positions = [
              [movement.fromLat, movement.fromLng],
              [movement.toLat, movement.toLng],
            ];

            // Calculate the angle of the line
            const angle = Math.atan2(
              movement.toLat - movement.fromLat,
              movement.toLng - movement.fromLng
            );

            return (
              <Polyline
                key={index}
                positions={positions}
                color={colorForMovement(movement)}
                weight={4}
                opacity={0.7}
                dashArray="5,10"
                lineCap="round"
              >
                <Marker
                  position={[
                    (movement.fromLat + movement.toLat) / 2,
                    (movement.fromLng + movement.toLng) / 2,
                  ]}
                  icon={createIcon(movement.count, movement.direction)}
                  className={`icon-${movement.direction}`}
                  style={{
                    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                    transformOrigin: "center",
                  }}
                />
              </Polyline>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default JalJeevanBot;
