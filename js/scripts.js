document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".buttons button");

  let currentInput = ""; // keeps actual value on display
  let previousInput = ""; // keeps displays value before the operation
  let operation = null; // keeps the current operation (+, -, *, /)

  // add the click event for each button
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (!isNaN(value) || value === ",") {
        handleNumber(value);
      } else {
        handleOperation(value);
      }

      updateDisplay();
    });
  });

  // add the keyboard event
  document.addEventListener("keydown", (event) => {
    handleKeyboardInput(event.key);
  });

  function handleKeyboardInput(key) {
    // converts the pressed key to a corresponding operation or number
    if (!isNaN(key) || key === "." || key === ",") {
      handleNumber(key === "." ? "," : key); // change the dot for a comma
    } else {
      switch (key) {
        case "Enter":
          handleOperation("=");
          break;
        case "Backspace":
          handleBackspace();
          break;
        case "c":
          handleOperation("AC");
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          handleOperation(mapOperation(key));
          break;
      }
    }
    updateDisplay();
  }

  function mapOperation(key) {
    // Map the keys for corresponding operation on the layout
    switch (key) {
      case "*":
        return "X";
      case "/":
        return "÷";
      default:
        return key;
    }
  }

  function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
  }

  function handleNumber(value) {
    if (value === "," && currentInput.includes(",")) return; // avoids multiple commas
    currentInput += value === "," ? "." : value; // change the dot for a comma
  }

  function handleOperation(value) {
    switch (value) {
      case "AC":
        clearAll();
        break;
      case "+/-":
        toggleSign();
        break;
      case "%":
        convertToPercentage();
        break;
      case "+":
      case "-":
      case "X":
      case "÷":
        setOperation(value);
        break;
      case "=":
        calculate();
        break;
    }
  }

  function clearAll() {
    currentInput = "";
    previousInput = "";
    operation = null;
  }

  function toggleSign() {
    if (currentInput) {
      currentInput = String(-parseFloat(currentInput));
    }
  }

  function convertToPercentage() {
    if (currentInput) {
      currentInput = String(parseFloat(currentInput) / 100);
    }
  }

  function setOperation(value) {
    if (currentInput === "") return;
    if (previousInput !== "") {
      calculate();
    }

    operation = value;
    previousInput = currentInput;
    currentInput = "";
  }

  function calculate() {
    if (currentInput === "" || previousInput === "") return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operation) {
      case "+":
        currentInput = String(num1 + num2);
        break;
      case "-":
        currentInput = String(num1 - num2);
        break;
      case "X":
        currentInput = String(num1 * num2);
        break;
      case "÷":
        currentInput = num2 === 0 ? "Erro" : String(num1 / num2);
        break;
    }

    operation = null;
    previousInput = "";
  }

  function updateDisplay() {
    display.value = currentInput.replace(".", ","); // shows the comma instead the dot
  }
});
