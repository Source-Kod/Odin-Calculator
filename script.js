function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch(operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.log('ERROR');
  };
}

function createButtonEvents() {
  let displayedNumbers = "";
  let clearOnInput = false;

  // numbers
  const n0 = document.querySelector('#n0');
  const n1 = document.querySelector('#n1');
  const n2 = document.querySelector('#n2');
  const n3 = document.querySelector('#n3');
  const n4 = document.querySelector('#n4');
  const n5 = document.querySelector('#n5');
  const n6 = document.querySelector('#n6');
  const n7 = document.querySelector('#n7');
  const n8 = document.querySelector('#n8');
  const n9 = document.querySelector('#n9');
  const nDot = document.querySelector('#nDot');

  // operation buttons
  const op1 = document.querySelector('#op1');
  const op2 = document.querySelector('#op2');
  const op3 = document.querySelector('#op3');
  const op4 = document.querySelector('#op4');
  const op5 = document.querySelector('#op5');
  const opClear = document.querySelector('#opClear');
  const opBackspace = document.querySelector('#opBackspace');

  // numbers
  n0.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "0"));
  });

  n1.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "1"));
  });

  n2.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "2"));
  });

  n3.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "3"));
  });

  n4.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "4"));
  });

  n5.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "5"));
  });

  n6.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "6"));
  });

  n7.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "7"));
  });

  n8.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "8"));
  });

  n9.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "9"));
  });

  nDot.addEventListener('click', () => {
    ({displayedNumbers, clearOnInput} = handleNumberClicks(displayedNumbers, clearOnInput, "."));
  })

  //operations
  op1.addEventListener('click', () => {
    clearOnInput = false;
    displayedNumbers += "+";
    updateDisplay(displayedNumbers);
  });

  op2.addEventListener('click', () => {
    clearOnInput = false;
    displayedNumbers += "-";
    updateDisplay(displayedNumbers);
  });

  op3.addEventListener('click', () => {
    clearOnInput = false;
    displayedNumbers += "*";
    updateDisplay(displayedNumbers);
  });

  op4.addEventListener('click', () => {
    clearOnInput = false;
    displayedNumbers += "/";
    updateDisplay(displayedNumbers);
  });

  op5.addEventListener('click', () => {
    let array = displayedNumbers.split("");

    if (checkIfArrayIsValid(array)) { 
      displayedNumbers = solveArray(array);
      updateDisplay(displayedNumbers);
      clearOnInput = true;
    } 
  });

  opClear.addEventListener('click', () => {
    displayedNumbers = "";
    updateDisplay(displayedNumbers);
    clearOnInput = false;
  })

  opBackspace.addEventListener('click', () => {
    displayedNumbers = displayedNumbers.toString().slice(0, -1);
    updateDisplay(displayedNumbers);
  })

  // Keyboard event
  document.addEventListener('keydown', (key) => {
    if (key.key === '0') {
      n0.click();
    }

    if (key.key === '1') {
      n1.click();
    }

    if (key.key === '2') {
      n2.click();
    }

    if (key.key === '3') {
      n3.click();
    }

    if (key.key === '4') {
      n4.click();
    }

    if (key.key === '5') {
      n5.click();
    }

    if (key.key === '6') {
      n6.click();
    }

    if (key.key === '7') {
      n7.click();
    }
    
    if (key.key === '8') {
      n8.click();
    }

    if (key.key === '9') {
      n9.click();
    }

    if (key.key === '.') {
      nDot.click();
    }

    if (key.key === '+') {
      op1.click();
    }

    if (key.key === '-') {
      op2.click();
    }

    if (key.key === '*') {
      op3.click();
    }

    if (key.key === '/') {
      op4.click();
    }
    
    if (key.key === 'Enter') {
      op5.click();
    }

    if (key.key === 'Escape') {
      opClear.click();
    }

    if (key.key === 'Backspace') {
      opBackspace.click();
    }

    if (key.key === ' ') {
      key.preventDefault();
    }
  })
}

function solveArray(array) {
  let num1 = [];
  let num2 = [];
  let op = "";
  let num1Completed = false;

  array.forEach((element, index) => {
    if ((element != '+' && element != '-' && element != '*' && element != '/') || (element === '-' && element === array[index - 1]) || (element === '-' && index === 0)) {
      if (!num1Completed) num1.push(element);
      if (num1Completed) num2.push(element);
    }

    if ((element === '+' || element === '-' || element === '*' || element === '/') && !(element === array[index - 1]) && !(index === 0)) {
      // fix bug when adding a negative number. ex.10+-1. by just skipping the + and making it 10-1.
      if (element === '+' && array[index + 1] === '-') return;

      if (num1Completed){
        num1 = operate(op,parseFloat(num1.join('')),parseFloat(num2.join(''))).toString().split('');
        num2 = [];
      }
      op = element;
      num1Completed = true;
    }
  });

  return operate(op,parseFloat(num1.join('')),parseFloat(num2.join('')));
}

function handleNumberClicks(displayedNumbers, clearOnInput, number) {
  if (clearOnInput) displayedNumbers = "", clearOnInput = false;

  displayedNumbers += number;
  updateDisplay(displayedNumbers);
  return {displayedNumbers, clearOnInput};
}

function updateDisplay(displayedNumbers) {
  const display_text = document.querySelector('#display_text');

  display_text.textContent = displayedNumbers;
}

function checkIfArrayIsValid(array) {
  let arrayLast = array[array.length - 1];

  return ((array.includes('+') || array.includes('-') || array.includes('*') || array.includes('/')) && (arrayLast != '+' && arrayLast != '-' && arrayLast != '*' && arrayLast != '/'));

}


createButtonEvents();
