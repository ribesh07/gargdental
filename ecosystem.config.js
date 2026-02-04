module.exports = {
  apps: [
    {
      name: "garg",
      script: "server.js",
      cwd: "/home/sanjaya/development/gargdental",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 4444,
      },
      node_args: "--max-old-space-size=848",
      watch: false,
      autorestart: true,
      max_restarts: 5,
    },
  ],
};
