document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".buttons button");

  let currentInput = ""; // armazena o valor atual no display
  let previousInput = ""; // armazena o valor do display antes da operação
  let operation = null; // armazena a operação atual (+, -, *, /)

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      // verifica se é número ou vírgula

      if (!isNaN(value) || value === ",") {
        handleNumber(value);
      } else {
        handleOperation(value);
      }

      updateDisplay();
    });
  });

  // adiociona o evento de keydown
  document.addEventListener("keydown", (event) => {
    handleKeyboardInput();
  });

  function handleKeyboardInput(key) {
    if (!isNaN(key) || key === "." || key === ",") {
      handleNumber(key === "." ? "," : key);
    } else {
      switch (key) {
        case "Enter":
          handleOperation("=");
          break;
        case "Backspace":
          handleBackspace();
          break;
        case "Escape":
          handleOperation("AC");
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          handleOperation(mapOperation(key));
          break;
      }
      updateDisplay();
    }
  }

  function mapOperation(key) {
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
    if (value === "," && currentInput.includes(",")) return; // evita múltiplas vírgulas
    currentInput += value === "," ? "." : value; // converte a vírgula em ponto decimal
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
    display.value = currentInput.replace(".", ","); // exibe a vírgula no lugar do ponto
  }
});
