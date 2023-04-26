function addTimestamps() {
  const originalLog = console.log;

  const newLog = function(...args) {
    const timestamp = new Date().toISOString();
    originalLog(timestamp, ...args);
  }

  return newLog;
}

module.exports = { addTimestamps };
