'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      //WorkTime default props
      workMin: 25,
      selectedTime: 25 * 60,
      time: {},
      seconds: 1500,
      status: 'notWorking',
      //BreakTime default props
      breakMin: 5,
      selectedBreakTime: 5 * 60,
      breakTime: { m: 5, s: 0 },
      breakInSeconds: 300
    };

    _this.sound = document.getElementById("sound");
    _this.addMin = _this.addMin.bind(_this);
    _this.subMin = _this.subMin.bind(_this);
    _this.addBreakMin = _this.addBreakMin.bind(_this);
    _this.subBreakMin = _this.subBreakMin.bind(_this);
    _this.timer = null;
    _this.breakTimer = null;
    _this.startTimer = _this.startTimer.bind(_this);
    _this.pauseTimer = _this.pauseTimer.bind(_this);
    _this.resetTimer = _this.resetTimer.bind(_this);
    _this.countDown = _this.countDown.bind(_this);
    _this.startBreakTimer = _this.startBreakTimer.bind(_this);
    _this.pauseBreakTimer = _this.pauseBreakTimer.bind(_this);
    _this.resetBreakTimer = _this.resetBreakTimer.bind(_this);
    _this.breakCountDown = _this.breakCountDown.bind(_this);
    return _this;
  }

  App.prototype.workStart = function workStart() {
    this.setStatus({ status: isWorking });
  };

  App.prototype.addMin = function addMin() {
    var _this2 = this;

    this.setState({ workMin: this.state.workMin + 1 }, function () {
      //update selectedTime
      _this2.setState({ selectedTime: _this2.state.workMin * 60 }, function () {
        _this2.setState({ seconds: _this2.state.selectedTime });
        _this2.componentDidMount();
      });
    });
  };

  App.prototype.subMin = function subMin() {
    var _this3 = this;

    if (this.state.workMin > 1) {
      this.setState({ workMin: this.state.workMin - 1 }, function () {
        //update selectedTime
        _this3.setState({ selectedTime: _this3.state.workMin * 60 }, function () {
          _this3.setState({ seconds: _this3.state.selectedTime });
          _this3.componentDidMount();
        });
      });
    }
  };

  App.prototype.addBreakMin = function addBreakMin() {
    var _this4 = this;

    this.setState({ breakMin: this.state.breakMin + 1 }, function () {
      //update selectedTime
      _this4.setState({ selectedBreakTime: _this4.state.breakMin * 60 }, function () {
        _this4.setState({ breakInSeconds: _this4.state.selectedBreakTime });
        _this4.componentDidMountBreak();
      });
    });
  };

  App.prototype.subBreakMin = function subBreakMin() {
    var _this5 = this;

    if (this.state.breakMin > 1) {
      this.setState({ breakMin: this.state.breakMin - 1 }, function () {
        //update selectedTime
        _this5.setState({ selectedBreakTime: _this5.state.breakMin * 60 }, function () {
          _this5.setState({ breakInSeconds: _this5.state.selectedBreakTime });
          _this5.componentDidMountBreak();
        });
      });
    }
  };

  App.prototype.secondsToTime = function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  };

  //converts seconds to h:m:s update time object

  App.prototype.componentDidMount = function componentDidMount() {
    var timeLeftVar = this.secondsToTime(this.state.selectedTime);
    this.setState({ time: timeLeftVar });
  };

  App.prototype.componentDidMountBreak = function componentDidMountBreak() {
    var timeLeftVar = this.secondsToTime(this.state.selectedBreakTime);
    this.setState({ breakTime: timeLeftVar });
  };

  App.prototype.startTimer = function startTimer() {
    if (this.timer !== null) return;
    this.setState({ status: 'isWorking' });
    this.timer = setInterval(this.countDown, 1000);
  };

  App.prototype.pauseTimer = function pauseTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ status: 'notWorking' });
  };

  App.prototype.resetTimer = function resetTimer() {
    var _this6 = this;

    clearInterval(this.timer);
    this.timer = null;
    this.setState({ status: 'notWorking' });
    this.setState({
      seconds: this.state.selectedTime,
      breakInSeconds: this.state.selectedBreakTime }, function () {
      _this6.componentDidMount();
      _this6.componentDidMountBreak();
    });
  };

  App.prototype.startBreakTimer = function startBreakTimer() {
    if (this.breakTimer !== null) return;
    this.breakTimer = setInterval(this.breakCountDown, 1000);
  };

  App.prototype.pauseBreakTimer = function pauseBreakTimer() {
    clearInterval(this.breakTimer);
    this.breakTimer = null;
  };

  App.prototype.resetBreakTimer = function resetBreakTimer() {
    var _this7 = this;

    clearInterval(this.breakTimer);
    this.breakTimer = null;
    this.setState({ breakInSeconds: this.state.selectedBreakTime }, function () {
      _this7.componentDidMountBreak();
    });
  };

  App.prototype.countDown = function countDown() {
    // Remove one second, set state so a re-render happens.
    var seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      this.sound.play();
      clearInterval(this.timer);
      //start BREAK TIMER HERE
      if (this.breakTimer !== null) return;
      this.setState({ status: 'takingBreak' });
      this.breakTimer = setInterval(this.breakCountDown, 1000);
    }
  };

  App.prototype.breakCountDown = function breakCountDown() {
    // Remove one second, set state so a re-render happens.
    var seconds = this.state.breakInSeconds - 1;
    this.setState({
      breakTime: this.secondsToTime(seconds),
      breakInSeconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      this.sound.play();
      clearInterval(this.breakTimer);
      this.breakTimer = null;
      this.setState({ status: 'finished' });
    }
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Pomodoro Clock'
      ),
      React.createElement(
        'div',
        { className: 'block' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(WorkTime, { addMin: this.addMin, subMin: this.subMin, workMin: this.state.workMin }),
          React.createElement(BreakTime, {
            addBreakMin: this.addBreakMin,
            subBreakMin: this.subBreakMin,
            breakMin: this.state.breakMin
          })
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(Timer, {
            selectedTime: this.state.selectedTime,
            time: this.state.time,
            startTimer: this.startTimer,
            pauseTimer: this.pauseTimer,
            resetTimer: this.resetTimer,
            selectedBreakTime: this.state.selectedBreakTime,
            breakTime: this.state.breakTime,
            startBreakTimer: this.startBreakTimer,
            pauseBreakTimer: this.pauseBreakTimer,
            resetBreakTimer: this.resetBreakTimer,
            status: this.state.status
          })
        ),
        React.createElement('div', { id: 'space' })
      )
    );
  };

  return App;
}(React.Component);

var WorkTime = function WorkTime(props) {
  return React.createElement(
    'div',
    { id: 'sessionTime', className: 'col-sm-6 col-md-6' },
    React.createElement(
      'h2',
      { id: 'title-session' },
      'Session Time'
    ),
    React.createElement(
      'button',
      { id: 'minus-5', className: 'btn', onClick: props.subMin },
      '-'
    ),
    React.createElement(
      'h3',
      { id: 'sessionNum' },
      props.workMin
    ),
    React.createElement(
      'button',
      { id: 'plus-5', className: 'btn', onClick: props.addMin },
      '+'
    )
  );
};

var BreakTime = function BreakTime(props) {
  return React.createElement(
    'div',
    { id: 'breakTime', className: 'col-sm-6 col-md-6' },
    React.createElement(
      'h2',
      { id: 'title-session' },
      'Break Time'
    ),
    React.createElement(
      'button',
      { id: 'minus-5-break', className: 'btn', onClick: props.subBreakMin },
      '-'
    ),
    React.createElement(
      'h3',
      { id: 'breakNum' },
      props.breakMin
    ),
    React.createElement(
      'button',
      { id: 'plus-5-break', className: 'btn', onClick: props.addBreakMin },
      '+'
    )
  );
};

var Timer = function Timer(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      { className: classNames({
          "mainNum": true,
          "hidden": props.status === "takingBreak"
        }) },
      props.time.m,
      ' : ',
      props.time.s
    ),
    React.createElement(
      'h3',
      { className: classNames({
          "mainNum": true,
          "hidden": props.status !== "takingBreak"
        }) },
      props.breakTime.m,
      ' : ',
      props.breakTime.s
    ),
    React.createElement(
      'button',
      { id: 'start', className: classNames({
          'btn': true,
          'hidden': props.status === 'isWorking' || props.status === 'takingBreak'
        }), onClick: props.startTimer },
      'Start'
    ),
    React.createElement(
      'button',
      { id: 'pause', className: classNames({
          'btn': true,
          'hidden': props.status !== 'isWorking'
        }), onClick: props.pauseTimer },
      'Pause'
    ),
    React.createElement(
      'button',
      { id: 'reset', className: classNames({
          'btn': true,
          'hidden': props.status === 'takingBreak'
        }), onClick: props.resetTimer },
      'Reset'
    ),
    React.createElement(
      'button',
      { className: classNames({
          'btn': true,
          'hidden': props.status !== 'takingBreak' || props.status === 'finished'
        }), onClick: props.startBreakTimer },
      'StartB'
    ),
    React.createElement(
      'button',
      { className: classNames({
          'btn': true,
          'hidden': props.status !== 'takingBreak' || props.status === 'finished'
        }), onClick: props.pauseBreakTimer },
      'PauseB'
    ),
    React.createElement(
      'button',
      { className: classNames({
          'btn': true,
          'hidden': props.status !== 'takingBreak' || props.status === 'finished'
        }), onClick: props.resetBreakTimer },
      'ResetB'
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.querySelector(".container-fluid"));