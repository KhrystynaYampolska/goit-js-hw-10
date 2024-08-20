import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: 'red',
      });
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const updateTimerDisplay = timeDifference => {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', () => {
  if (!userSelectedDate) {
    return;
  }

  document.querySelector('#datetime-picker').disabled = true;

  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      iziToast.show({
        message: 'Time is up!',
        position: 'topRight',
        color: 'grey',
      });
      document.querySelector('#datetime-picker').disabled = false;
    } else {
      updateTimerDisplay(timeDifference);
    }
  }, 1000);
});
