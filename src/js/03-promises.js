import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const {
  elements: { delay, step, amount },
} = form;
const options = {
  backOverlay: true,  
};

form.addEventListener('submit', onSubmitForm);

function onSubmitForm (event) {
  event.preventDefault();
  
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, 
      options);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
      options);
    });

    delayValue += stepValue;
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);

  }); 
};
