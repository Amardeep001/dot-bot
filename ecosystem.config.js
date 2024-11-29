module.exports = {
  apps: [
    {
      name: "dot-bot",
      script: "npm",
      args: "start",
      env: {
        PORT: 8080,
        NODE_ENV: "development",
      },
    },
  ],
};
