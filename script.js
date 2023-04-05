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
    current_number += "1";
    updateDisplay();
  });

  n2.addEventListener('click', () => {
    current_number += "2";
    updateDisplay();
  });

  //operations
  op1.addEventListener('click', () => {
    current_number += "+";
    updateDisplay();
  });

  op5.addEventListener('click', () => {
    let array = current_number.split("")
    if (array.includes(...['+','-','*','/'])) current_number = solveArray(array);
    updateDisplay();
  });
}

function solveArray(array) {
  let num1 = [];
  let num2 = [];
  let op = "";
  let num1Completed = false;

  array.forEach(e => {
    if (e != '+' && e != '-' && e != '*' && e != '/') {
      if (!num1Completed) num1.push(e);
      if (num1Completed) num2.push(e);
    }

    if (e === '+' || e === '-' || e === '*' || e === '/') {
      // if e is +-*/ and op != "" the solve and set as num1? this may work using the num1Completed instead?
      if (num1Completed){
        num1 = operate(op.toString(),parseInt(num1.join('')),parseInt(num2.join(''))).toString().split('');
        num2 = [];
      }
      op = e;
      num1Completed = true;
    }
  });

  return operate(op.toString(),parseInt(num1.join('')),parseInt(num2.join('')));
}

function updateDisplay() {
  const display_text = document.querySelector('#display_text');

  display_text.textContent = current_number;
}


createButtonEvents();
