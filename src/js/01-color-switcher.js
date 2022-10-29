const refs = {
    startColorBtn: document.querySelector('[data-start]'),
    stopColorBtn: document.querySelector('[data-stop]'),
};
let timerId = null;
  

refs.startColorBtn.addEventListener('click', startChangeColorRandom);
refs.stopColorBtn.addEventListener('click', stopColorRandom);

function startChangeColorRandom() {
    document.body.style.backgroundColor = getRandomHexColor();
    refs.startColorBtn.disabled = true;
    refs.stopColorBtn.disabled = false; 

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
};

function stopColorRandom() {
    clearInterval(timerId);
    // document.body.style.backgroundColor = '';
    refs.startColorBtn.disabled = false;   
    refs.stopColorBtn.disabled = true;   
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  function getRandomHexColorTrue() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
