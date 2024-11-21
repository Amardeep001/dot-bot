module.exports = {
  apps: [
    {
      name: "dot-bot",
      script: "npm",
      args: "start",
      env: {
        PORT: 3007,
        NODE_ENV: "development",
      },
    },
  ],
};
