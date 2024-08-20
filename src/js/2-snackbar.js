import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const radios = document.querySelectorAll('input[name="state"]');

const onFormSubmit = event => {
  event.preventDefault();
  const delay = parseInt(
    document.querySelector('input[name="delay"]').value,
    10
  );

  let state;
  radios.forEach(radio => {
    if (radio.checked) {
      state = radio.value;
    }
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay} ms`);
      } else if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => iziToast.success({ title: 'Success', message: message }))
    .catch(error => iziToast.error({ title: 'Error', message: error }));
};

form.addEventListener('submit', onFormSubmit);
