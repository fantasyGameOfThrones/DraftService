export class Timer {

  constructor(seconds) {
    this.seconds = seconds || 120;
    this.counter = null;
  }
  makeTimeObject() {
    return {
      seconds: this.seconds,
      time: this.getTime()
    };
  }
  start(viewUpdate, alarm) {
    viewUpdate = viewUpdate || function(){};
    alarm = alarm || function(){};
    viewUpdate(this.makeTimeObject());
    this.counter = setInterval(this.decrement.bind(this, viewUpdate, alarm), 1000);
  }

  stop(viewUpdate) {
    console.log('stop function called');
    viewUpdate = viewUpdate || function(){};
    this.seconds = 0;
    clearInterval(this.counter);
    viewUpdate(this.makeTimeObject());
    return 0;
  }
  countEnd(alarm){
    clearInterval(this.counter);
    alarm();
    return 0;
  }

  decrement(viewUpdate, alarm) {
    this.seconds = this.seconds > 0 ? this.seconds - 1 : this.countEnd(alarm);
    viewUpdate(this.makeTimeObject());
  }

  getTime() {
    let timeString = '';
    if(!this.seconds){
      timeString = '0:00';
    }else{
      timeString = (this.seconds / 60 | 0).toString();
      timeString += ':';
      timeString += this.seconds % 60 < 10 ? '0' : '';
      timeString += (this.seconds % 60).toString();

    }
    return timeString;
  }
};

export default Timer;