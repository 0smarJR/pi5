module.exports = {
  apps: [
    {
      name: "discorbot",
      script: "./bot.js",
      env: {
        NODE_ENV: "development"
      },
      // eslint-disable-next-line camelcase
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
