// globals
let current_number = "";


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
  let num1 = 0;
  let num2 = 0;
  let setNum1 = true;
  let lastWasOp = false;

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

  // operation buttons
  const op1 = document.querySelector('#op1');
  const op2 = document.querySelector('#op2');
  const op3 = document.querySelector('#op3');
  const op4 = document.querySelector('#op4');
  const op5 = document.querySelector('#op5');

  // numbers
  n0.addEventListener('click', () => {
    current_number += "0";
    updateDisplay();
  });

  n1.addEventListener('click', () => {
    if (lastWasOp) current_number = "", lastWasOp = false;
    current_number += "1";
    updateDisplay();
  });

  n2.addEventListener('click', () => {
    if (lastWasOp) current_number = "", lastWasOp = false;
    current_number += "2";
    updateDisplay();
  });

  //operations
  op1.addEventListener('click', () => {
    if (!setNum1) {
      console.log('false')
      num2 = parseInt(current_number);
      current_number = operate("+",num1,num2).toString();
      num1 = parseInt(current_number);
      updateDisplay();
    }
    if (setNum1) {
      console.log('true')
      num1 = parseInt(current_number);
      current_number = "";
      updateDisplay();
      setNum1 = false;
    }

    lastWasOp = true;
  });

  op5.addEventListener('click', () => {
    if (!checkIfNum1(num1)) {
      num2 = parseInt(current_number);
      current_number = operate("+",num1,num2);
      updateDisplay();
    }
  });
}

function checkIfNum1(num1) {
  return num1 === 0;
}

function updateDisplay() {
  const display_text = document.querySelector('#display_text');

  display_text.textContent = current_number;
}


createButtonEvents();
