// cast textContent of target as Int, then modify number and return
function modifyTime(target, mod) {
  var current = parseInt(target.textContent, 10);
  if (current + mod >= 0) {
    target.textContent = String(current + mod);
  }
}

// human readable time formatting
function formatTime(value) {
  var time = value.toString();
  if (time.length < 2) {
    return '0' + value;
  } else {
    return value;
  }
}

// Pomodoro constructor definition
function Pomodoro() {
  this.runningTime = null;
  this.timerHandler = null;
  this.isWorkTime = true;
  this.isTimerRunning = false;
}

// extend Pomodoro prototype functionality
Pomodoro.prototype = {
  getTime: function(time) {
    var mins = Math.floor(time / 60);
    var secs = time - (mins * 60);
    return formatTime(mins) + ' : ' + formatTime(secs);
  },

  startTimer: function() {
    var timer = document.getElementById('timerNum');
    var that = this;
    this.isTimerRunning = !this.isTimerRunning;

    this.timerHandler = setInterval(function() {
      if (that.runningTime > 0) {
        that.runningTime--;
      } else {
        that.stopTimer();
        that.isWorkTime = !that.isWorkTime;
        that.setTimer();
      }
      timer.textContent = that.getTime(that.runningTime);
    }, 1000);
  },

  stopTimer: function() {
    clearInterval(this.timerHandler);
  },

  setTimer: function() {
    var timer = document.getElementById('timerNum');
    var seconds;
    var timerID;

    if (this.isWorkTime) {
      timerID = document.getElementById('sessionLng');
    } else {
      timerID = document.getElementById('breakLng');
    }

    // set seconds equal to breakLng/sessionLng
    seconds = parseInt(timerID.textContent, 10) * 60;
    this.runningTime = seconds;
    timer.textContent = this.getTime(seconds);

    // automatically start break timer after work timer ends
    if (!this.isWorkTime) {
      this.startTimer();
    }
  }
};

// instantiate new pomodoro object
var pomodoro = new Pomodoro();

// define event listeners
var breakT = document.getElementById('breakLng');
var sessionT = document.getElementById('sessionLng');

var toggleTimer = document.getElementById('toggle');
toggleTimer.addEventListener('click', function() {
  if (!pomodoro.isTimerRunning) {
    pomodoro.startTimer();
  } else {
    pomodoro.isTimerRunning = !pomodoro.isTimerRunning;
    pomodoro.stopTimer();
  }
});

var plusBreak = document.getElementById('break-up');
plusBreak.addEventListener('click', function() {
  if (!pomodoro.isTimerRunning) {
    modifyTime(breakT, +1);
    pomodoro.setTimer();
  }
});

var minusBreak = document.getElementById('break-down');
minusBreak.addEventListener('click', function() {
  if (!pomodoro.isTimerRunning) {
    modifyTime(breakT, -1);
    pomodoro.setTimer();
  }
});

var plusSession = document.getElementById('session-up');
plusSession.addEventListener('click', function() {
  if (!pomodoro.isTimerRunning) {
    modifyTime(sessionT, +1);
    pomodoro.setTimer();
  }
});

var minusSession = document.getElementById('session-down');
minusSession.addEventListener('click', function() {
  if (!pomodoro.isTimerRunning) {
    modifyTime(sessionT, -1);
    pomodoro.setTimer();
  }
});

// get app ready on document load
pomodoro.setTimer();
