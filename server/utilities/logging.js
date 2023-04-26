const timestamp = new Date().toISOString();

function augmentedLog() {
  const originalLog = console.log;

  const newLog = function(...args) {    
    originalLog(timestamp, ...args);
  }

  return newLog;
}

function augmentedError() {
  const originalError = console.error;

  const newError = function(...args) {    
    originalError(timestamp, ...args);
  }

  return newError;
}

function augmentedDebug() {
  const originalDebug = console.debug;

  const newDebug = function(...args) {    
    originalDebug(timestamp, ...args);
  }
  return newDebug;
}

module.exports = { augmentedLog, augmentedError, augmentedDebug };
