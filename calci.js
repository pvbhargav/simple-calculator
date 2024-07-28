document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.getElementById('calculator-screen');
    let currentInput = '';
    let operator = null;
    let shouldResetScreen = false;
  
    const updateScreen = (value) => {
      calculatorScreen.value = value;
    };
  
    const handleNumberClick = (number) => {
      if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
      } else {
        currentInput += number;
      }
      updateScreen(currentInput);
    };
  
    const handleOperatorClick = (selectedOperator) => {
      if (operator !== null && !shouldResetScreen) {
        calculate();
      }
      operator = selectedOperator;
      currentInput += ` ${selectedOperator} `;
      updateScreen(currentInput);
      shouldResetScreen = false;
    };
  
    const handleEqualSignClick = () => {
      if (operator === null || shouldResetScreen) return;
      calculate();
      operator = null;
      shouldResetScreen = true;
    };
  
    const calculate = () => {
      const expression = currentInput.split(' ');
      if (expression.length !== 3) return;
      const a = parseFloat(expression[0]);
      const b = parseFloat(expression[2]);
      let result;
  
      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
        default:
          return;
      }
  
      currentInput = result.toString();
      updateScreen(currentInput);
    };
  
    const handleAllClear = () => {
      currentInput = '';
      operator = null;
      shouldResetScreen = false;
      updateScreen(currentInput);
    };
  
    const handleDecimalClick = () => {
      const currentOperand = currentInput.split(' ').pop();
      if (!currentOperand.includes('.')) {
        currentInput += '.';
      }
      updateScreen(currentInput);
    };

    const handleBackspaceClick = () => {
      if (shouldResetScreen) {
        shouldResetScreen = false;
        return;
      }
      currentInput = currentInput.slice(0, -1);
      updateScreen(currentInput);
    };

    document.querySelectorAll('.number').forEach((button) =>
      button.addEventListener('click', (event) => {
        handleNumberClick(event.target.dataset.number);
      })
    );
  
    document.querySelectorAll('.operator').forEach((button) =>
      button.addEventListener('click', (event) => {
        handleOperatorClick(event.target.dataset.operator);
      })
    );
  
    document.querySelector('.equal-sign').addEventListener('click', handleEqualSignClick);
    document.querySelector('.all-clear').addEventListener('click', handleAllClear);
    document.querySelector('.decimal').addEventListener('click', handleDecimalClick);
    document.querySelector('.backspace').addEventListener('click', handleBackspaceClick); // Handle backspace
  });
