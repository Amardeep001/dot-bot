import React, { useState } from "react";
import ProcurementChatbot from "./components/procurementChatbot";
import bharatLogo from "../src/assets/images/kpmg.jpg";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Extend dayjs with the UTC plugin
dayjs.extend(utc);

// main component of app
// default ui component for home page
function App() {
  const [startValue, setStartValue] = React.useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endValue, setEndValue] = React.useState(null);
  const [endTime, setEndTime] = useState(null);
  const [submit, setSubmit] = useState(false);

  // console.log(startTime, "line17");
  const handleStartChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
      : null;
    setStartTime(formattedDate);
    setStartValue(newValue);
    setSubmit(false);
  };

  const handleEndChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
      : null;
    setEndTime(formattedDate);
    setEndValue(newValue);
    setSubmit(false);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    // setBase64Html("");
    // setLoading(true);
    // const startTime = "2024-08-21T08:00:00.000Z";
    // const endTime = "2024-08-21T08:05:00.000Z";
    // try {
    //   const response = await fetch(`${API_URL}generate_maps/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       start_time: startTime || "2024-08-21T08:00:00.000Z",
    //       end_time: endTime || "2024-08-21T08:05:00.000Z",
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Fetch failed with status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   // console.log(data, "line62");
    //   const eventSource = new EventSource(`${API_URL}generate_maps/events`);

    //   eventSource.onopen = () => {
    //     console.log("Connection to server opened.");
    //   };

    //   eventSource.onmessage = (event) => {
    //     try {
    //       setLoading(false);
    //       // console.log("Received message:", event.data);
    //       setBase64Html(event?.data);
    //     } catch (error) {
    //       console.error("Error parsing JSON", error);
    //     }
    //   };

    //   eventSource.onerror = (error) => {
    //     setLoading(false);
    //     console.error("EventSource failed:", error);
    //     eventSource.close();
    //   };

    //   return () => {
    //     eventSource.close();
    //   };
    // } catch (error) {
    //   console.error("Fetch failed:", error);
    // }
  };

  return (
    <div className="h-[100vh] relative flex bg-gradient-to-r from-[#6c95ab] to-[#2a3f61] gap-x-3 p-3">
      <div className="w-[20%] px-4 py-7 flex flex-col">
        <div className="w-[80%]">
          <div className="flex items-center justify-center gap-x-4">
            <img
              alt="bihar_logo"
              src={bharatLogo}
              className="w-8 h-8 rounded-[100%] mix-blend-multiply"
            />
            <h1 className="text-white font-medium text-[20px]">DIGITAL TWIN</h1>
          </div>
          <div className="text-right text-[12px] font-bold">Powered by AI</div>
        </div>

        <hr className="h-px my-5 bg-gray-400 border-0"></hr>
        <button className="cursor-default text-center text-[14px] font-medium bg-[#d0d7b9] text-black rounded-md py-2 px-3 ">
          {/* <img alt="bihar_logo" src={waterDropLogo} className="w-5 h-5" /> */}
          SELECT DATE & TIME
        </button>
        <div className="mt-3 relative inline-block text-left w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem label="Start Time">
                <DateTimePicker
                  value={startValue}
                  onChange={handleStartChange}
                  slotProps={{
                    textField: {
                      className: "w-full",
                      InputLabelProps: {
                        sx: {
                          fontSize: "18px",
                          color: startValue ? "green" : "blue",
                        },
                      },
                    },
                    popper: {
                      placement: "bottom-end", // Automatically adjust the placement
                      modifiers: [
                        {
                          name: "preventOverflow",
                          options: {
                            altBoundary: true,
                            rootBoundary: "viewport",
                            tether: true,
                            padding: 8,
                          },
                        },
                        {
                          name: "flip",
                          options: {
                            fallbackPlacements: ["top-end", "bottom-end"],
                          },
                        },
                        {
                          name: "offset",
                          options: {
                            offset: [0, -100], // Horizontal offset of 0px, vertical offset of 10px (adjust as needed)
                          },
                        },
                      ],
                      PaperProps: {
                        sx: {
                          maxHeight: "calc(100vh - 64px)", // Adjust to fit within viewport height
                          overflowY: "auto",
                        },
                      },
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="mt-3 relative inline-block text-left w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem label="End Time">
                <DateTimePicker
                  value={endValue}
                  onChange={handleEndChange}
                  slotProps={{
                    textField: {
                      className: "w-full",
                      InputLabelProps: {
                        sx: {
                          fontSize: "18px",
                          color: endValue ? "green" : "blue",
                        },
                      },
                    },
                    popper: {
                      placement: "top-end", // Adjust placement to top-right
                      modifiers: [
                        {
                          name: "preventOverflow",
                          options: {
                            altBoundary: true,
                            rootBoundary: "viewport",
                            tether: true,
                            padding: 8,
                          },
                        },
                        {
                          name: "flip",
                          options: {
                            fallbackPlacements: ["top-end", "bottom-end"],
                          },
                        },
                        {
                          name: "offset",
                          options: {
                            offset: [0, -100], // Horizontal offset of 0px, vertical offset of 10px (adjust as needed)
                          },
                        },
                      ],
                      PaperProps: {
                        sx: {
                          maxHeight: "calc(100vh - 64px)",
                          overflowY: "auto",
                        },
                      },
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <button
          className="mt-3 text-center font-medium bg-gray-200 text-black rounded-md py-2 px-3 hover:bg-[#4a844a] "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <ProcurementChatbot
        startTime={startTime}
        endTime={endTime}
        submit={submit}
      />
      <div className="absolute bottom-2 w-[20%] left-4 text-[14px] font-medium font-serif">
        © Site Maintained by KPMG Advisory Services Pvt. Ltd. 2024
      </div>
    </div>
  );
}

export default App;
