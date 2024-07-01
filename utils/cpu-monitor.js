const os = require('os');

let cpuUsage = 0;

setInterval(() => {
  const usage = os.loadavg()[0];
  cpuUsage = (usage * 100).toFixed(2);
  console.log(`CPU usage: ${cpuUsage}%`);

  if (cpuUsage >= 70) {
    console.log('Restarting server due to high CPU usage');
    process.exit(1);
  }
}, 1000);