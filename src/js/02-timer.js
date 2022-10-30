import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate;
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
startBtn.disabled = true;

const fpOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];

        if (selectedDate.getTime() > Date.now()) {
            startBtn.disabled = false;
            Notify.success('Date is correct! Click start!');
        } else {
            Notify.failure('Please choose a date in the future');
        }  
    },
};

flatpickr('#datetime-picker', fpOptions);

const countDownTimer = {
    intervalId: null,
    refs: {},

    start(getEl, countDownDate) {
      Notify.success('Countdown start!');
    
      this.update(getEl);
      this.intervalId = setInterval(() => {
        const ms = countDownDate.getTime() - Date.now();
        startBtn.disabled = true;
        if (ms < 1000) {
          clearInterval(this.intervalId);
          Notify.success('Arrived!');
        }
  
        const dataConvert = this.convertMs(ms);
         Object.entries(dataConvert).forEach(([name, value]) => {
            this.refs[name].textContent = this.addLeadinZero(value);
        });
       }, 1000);
    },
  
    update(getEl) {
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

  startBtn.addEventListener('click', () => countDownTimer.start(timer, selectedDate));