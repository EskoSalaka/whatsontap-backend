module.exports = {
  apps: [
    {
      name: 'whatsontap-backend',
      script: './dist/server.js',
      cron_restart: '0 0 * * *',
    }
  ]
}
