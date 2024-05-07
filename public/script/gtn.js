// gtn.js

document.addEventListener('DOMContentLoaded', function() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');
    const message = document.querySelector('.message');
    const resetButton = document.querySelector('.resetButton');
    let guessCount = 1;
    let resetButtonEnabled = false;
  
    function checkGuess() {
        message.textContent = 'Previous guesses: ';
      let userGuess = Number(guessField.value);
      message.textContent += userGuess + ' ';
  
      if (userGuess === randomNumber) {
        message.textContent = 'Congratulations! You got it right!';
        endGame();
      } else if (guessCount === 10) {
        message.textContent += 'Sorry, you lost! The correct number was ' + randomNumber;
        endGame();
      } else {
        message.textContent += userGuess > randomNumber ? ' - Too high!' : ' - Too low!';
        guessCount++;
      }
  
      guessField.value = '';
      guessField.focus();
    }
  
    function endGame() {
      guessField.disabled = true;
      guessSubmit.disabled = true;
      resetButtonEnabled = true;
      resetButton.style.display = 'block';
    }
  
    guessSubmit.addEventListener('click', checkGuess);
  
    resetButton.addEventListener('click', function() {
      guessCount = 1;
      message.textContent = '';
      resetButton.style.display = 'none';
      guessField.disabled = false;
      guessSubmit.disabled = false;
      resetButtonEnabled = false;
      randomNumber = Math.floor(Math.random() * 100) + 1;
    });
  });
  