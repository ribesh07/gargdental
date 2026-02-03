module.exports = {
  apps: [
    {
      name: "garg",
      script: "npm",
      args: "run start",
      cwd: "/home/sanjaya/development/gargdental",
      env: {
        NODE_ENV: "production",
        PORT:4444
      },
    },
  ],
};
