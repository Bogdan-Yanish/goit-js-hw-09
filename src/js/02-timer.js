import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let countDownDate;
let intervalId = null; 
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const notifyOptions = {
  backOverlay: true,  
  clickToClose: true,
  closeButton: true,
};
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        countDownDate = selectedDates[0];

        if (countDownDate.getTime() > Date.now()) {
            startBtn.disabled = false;
            Notify.success('Date is correct! Click start!', notifyOptions);            
        } else {
            Notify.failure('Please choose a date in the future', notifyOptions);
        }  
    },
};

flatpickr('#datetime-picker', options);

// ===================================================================================================
const countDownTimer = {
    refs: {},
   
    start(getEl, countDownDate) {
      Notify.info('Countdown start!');
    
      this.getRefs(getEl);
      this.intervalId = setInterval(() => {
        const ms = countDownDate.getTime() - Date.now();
        startBtn.disabled = true;
        if (ms < 0) {
          clearInterval(this.intervalId);
          Notify.warning('Arrived!')
        }
  
        const dataConvert = this.convertMs(ms);
         Object.entries(dataConvert).forEach(([name, value]) => {
            this.refs[name].textContent = this.addLeadinZero(value);
        });
       }, 1000);
    },
  
    getRefs(getEl) {
      this.refs.days = getEl.querySelector('[data-days]');
      this.refs.hours = getEl.querySelector('[data-hours]');
      this.refs.minutes = getEl.querySelector('[data-minutes]');
      this.refs.seconds = getEl.querySelector('[data-seconds]');
    },

    convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      return { days, hours, minutes, seconds };
    },

    addLeadinZero(value) {
      return String(value).padStart(2, '0');
    },
  };

  startBtn.addEventListener('click', () => countDownTimer.start(timer, countDownDate));

//   =======================================================================================

// const getEl = selector => document.querySelector(selector);

// startBtn.addEventListener('click', startCountDownTimer);

// function startCountDownTimer() {
//     Notify.info('Countdown start!');
//     if (intervalId) {
//       clearInterval(intervalId);
//       Notify.warning('Arrived!')
//     }
//     countDownTime();
//     intervalId = setInterval(countDownTime, 1000);
// };

// function countDownTime() {
//     const ms = countDownDate - Date.now();
//     const { days, hours, minutes, seconds } = convertMs(ms);
//     if (ms < 0) {
//       return;
//     }
  
//     getEl('[data-days]').textContent = days;
//     getEl('[data-hours]').textContent = hours;
//     getEl('[data-minutes]').textContent = minutes;
//     getEl('[data-seconds]').textContent = seconds;
// };

// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
        
//     const days = addLeadinZero(Math.floor(ms / day));
//     const hours = addLeadinZero(Math.floor((ms % day) / hour));
//     const minutes = addLeadinZero(Math.floor(((ms % day) % hour) / minute));
//     const seconds = addLeadinZero(Math.floor((((ms % day) % hour) % minute) / second));

//     return { days, hours, minutes, seconds };
// };
    
// function addLeadinZero(value) {
//     return String(value).padStart(2, '0');
// };





