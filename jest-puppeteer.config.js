module.exports = {
  launch: {
    headless: true,
    slowMo: 150,
    args: [`--window-size=${1440},${900}`],
  },
  server: {
    command: 'yarn start',
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
}
