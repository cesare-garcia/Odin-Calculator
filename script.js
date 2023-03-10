let digit_buttons = Array.from(document.querySelectorAll(".digit"));
let operator_buttons = Array.from(document.querySelectorAll(".operator"));
let clear_button = document.querySelector(".clear");
let equals_button = document.querySelector(".equal");
let screen = document.querySelector(".screen");
let negative = document.querySelector(".negative");
let decimal_button = document.querySelector(".decimal");
let backspace_button = document.querySelector(".delete");

let selectedInputs = [];
let firstNum = "";
let operator = "";
let secondNum = "";

// Keyboard functionality Start

window.addEventListener("keydown", (e) => {
  if (
    e.key == 0 ||
    e.key == 1 ||
    e.key == 2 ||
    e.key == 3 ||
    e.key == 4 ||
    e.key == 5 ||
    e.key == 6 ||
    e.key == 7 ||
    e.key == 8 ||
    e.key == 9
  ) {
    if (selectedInputs[0] == undefined) {
      if (firstNum.length < 20) {
        firstNum += e.key;
        screen.textContent = `${firstNum}`;
      } else {
        screen.textContent = `ERROR, string too long.`;
      }
    } else if (
      selectedInputs[0] != undefined &&
      selectedInputs[1] != undefined
    ) {
      if (secondNum.length < 20) {
        secondNum += e.key;
        screen.textContent = `${secondNum}`;
      } else {
        screen.textContent = `ERROR, string too long.`;
      }
    }
  } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    if (firstNum == "" && e.key == "+") {
      resetCalc();
    } else if (firstNum == "" && e.key == "-") {
      resetCalc();
    } else if (firstNum == "" && e.key == "*") {
      resetCalc();
    } else if (firstNum == "" && e.key == "/") {
      resetCalc();
    } else if (selectedInputs.length == 2) {
      decimal_button.disabled = false;
      selectedInputs.push(secondNum);
      let result = operate(
        selectedInputs[0],
        selectedInputs[1],
        selectedInputs[2]
      );
      screen.textContent = result;
      firstNum = result;
      operator = e.key;
      secondNum = "";
      selectedInputs = [];
      selectedInputs.push(result);
      selectedInputs.push(operator);
    } else {
      operator = e.key;
      if (selectedInputs[0] != undefined && selectedInputs[1] == undefined) {
        selectedInputs.push(operator);
        decimal_button.disabled = false;
      } else if (
        selectedInputs[0] == undefined &&
        selectedInputs[1] == undefined
      ) {
        selectedInputs.push(firstNum);
        selectedInputs.push(operator);
        decimal_button.disabled = false;
      }
    }
  } else if (e.key == "=") {
    if (selectedInputs[0] == undefined && firstNum == "") {
      resetCalc();
    } else {
      if (selectedInputs[2] == undefined) {
        selectedInputs.push(secondNum);
      }

      let result = operate(
        selectedInputs[0],
        selectedInputs[1],
        selectedInputs[2]
      );

      if (result != undefined) {
        let resultString = result.toString();

        if (resultString.length < 20) {
          screen.textContent = result;
          firstNum = result;
          operator = "";
          secondNum = "";
          selectedInputs = [];
          selectedInputs.push(result);
          decimal_button.disabled = true;
        } else {
          screen.textContent = `ERROR, string too long.`;
        }
      }
    }
  } else if (e.key == "Backspace") {
    if (selectedInputs[0] == undefined) {
      resetCalc();
      decimal_button.disabled = false;
    } else if (
      selectedInputs[0] != undefined &&
      selectedInputs[1] != undefined
    ) {
      selectedInputs.pop();
      secondNum = "";
      screen.textContent = selectedInputs[0];
    } else if (selectedInputs[0] != undefined) {
      resetCalc();
      decimal_button.disabled = false;
    }
  } else if (e.key == ".") {
    if (selectedInputs[0] == undefined) {
      firstNum += ".";
      screen.textContent = firstNum;
      decimal_button.disabled = true;
    } else if (
      selectedInputs[0] != undefined &&
      selectedInputs[1] != undefined
    ) {
      secondNum += ".";
      screen.textContent = secondNum;
      decimal_button.disabled = true;
    }
  } else if (e.key == "_") {
    if (selectedInputs[0] != undefined && selectedInputs[1] == undefined) {
      selectedInputs.shift();
      firstNum *= -1;
      selectedInputs.push(firstNum);
      screen.textContent = firstNum;
    } else if (selectedInputs[0] == undefined) {
      parseInt(firstNum);
      firstNum *= -1;
      screen.textContent = firstNum;
    } else if (
      selectedInputs[0] != undefined &&
      selectedInputs[1] != undefined
    ) {
      parseInt(secondNum);
      secondNum *= -1;
      console.log(secondNum);
      screen.textContent = secondNum;
    }
  } else if (e.key == "z") {
    resetCalc();
    decimal_button.disabled = false;
  }
});

// Mouse functionality start
// Eventually add scientific notation to account for extremely long numbers

digit_buttons.forEach((digit_button) => {
  digit_button.addEventListener("click", (e) => {
    if (selectedInputs[0] == undefined) {
      if (firstNum.length < 20) {
        firstNum += e.target.textContent;
        screen.textContent = `${firstNum}`;
      } else {
        screen.textContent = `ERROR, string too long.`;
      }
    } else if (
      selectedInputs[0] != undefined &&
      selectedInputs[1] != undefined
    ) {
      if (secondNum.length < 20) {
        secondNum += e.target.textContent;
        screen.textContent = `${secondNum}`;
      } else {
        screen.textContent = `ERROR, string too long.`;
      }
    }
  });
});

operator_buttons.forEach((operator_button) => {
  operator_button.addEventListener("click", (e) => {
    if (firstNum == "" && e.target.textContent == "+") {
      resetCalc();
    } else if (firstNum == "" && e.target.textContent == "-") {
      resetCalc();
    } else if (firstNum == "" && e.target.textContent == "*") {
      resetCalc();
    } else if (firstNum == "" && e.target.textContent == "/") {
      resetCalc();
    } else if (selectedInputs.length == 2) {
      decimal_button.disabled = false;
      selectedInputs.push(secondNum);
      let result = operate(
        selectedInputs[0],
        selectedInputs[1],
        selectedInputs[2]
      );
      screen.textContent = result;
      firstNum = result;
      operator = e.target.textContent;
      secondNum = "";
      selectedInputs = [];
      selectedInputs.push(result);
      selectedInputs.push(operator);
    } else {
      operator = e.target.textContent;
      if (selectedInputs[0] != undefined && selectedInputs[1] == undefined) {
        selectedInputs.push(operator);
        decimal_button.disabled = false;
      } else if (
        selectedInputs[0] == undefined &&
        selectedInputs[1] == undefined
      ) {
        selectedInputs.push(firstNum);
        selectedInputs.push(operator);
        decimal_button.disabled = false;
      }
    }
  });
});

// Eventually add scientific notation to account for extremely long numbers

equals_button.addEventListener("click", (e) => {
  if (selectedInputs[0] == undefined && firstNum == "") {
    resetCalc();
  } else {
    if (selectedInputs[2] == undefined) {
      selectedInputs.push(secondNum);
    }

    let result = operate(
      selectedInputs[0],
      selectedInputs[1],
      selectedInputs[2]
    );

    if (result != undefined) {
      let resultString = result.toString();

      if (resultString.length < 20) {
        screen.textContent = result;
        firstNum = result;
        operator = "";
        secondNum = "";
        selectedInputs = [];
        selectedInputs.push(result);
        decimal_button.disabled = true;
      } else {
        screen.textContent = `ERROR, string too long.`;
      }
    }
  }
});

clear_button.addEventListener("click", (e) => {
  resetCalc();
  decimal_button.disabled = false;
});

// eventually may need to figure out better way to add negative sign.

negative.addEventListener("click", (e) => {
  if (selectedInputs[0] != undefined && selectedInputs[1] == undefined) {
    selectedInputs.shift();
    firstNum *= -1;
    selectedInputs.push(firstNum);
    screen.textContent = firstNum;
  } else if (selectedInputs[0] == undefined) {
    parseInt(firstNum);
    firstNum *= -1;
    screen.textContent = firstNum;
  } else if (selectedInputs[0] != undefined && selectedInputs[1] != undefined) {
    parseInt(secondNum);
    secondNum *= -1;
    screen.textContent = secondNum;
  }
});

backspace_button.addEventListener("click", (e) => {
  if (selectedInputs[0] == undefined) {
    resetCalc();
    decimal_button.disabled = false;
  } else if (selectedInputs[0] != undefined && selectedInputs[1] != undefined) {
    selectedInputs.pop();
    secondNum = "";
    screen.textContent = selectedInputs[0];
  } else if (selectedInputs[0] != undefined) {
    resetCalc();
    decimal_button.disabled = false;
  }
});

decimal_button.addEventListener("click", (e) => {
  if (selectedInputs[0] == undefined) {
    firstNum += ".";
    screen.textContent = firstNum;
    decimal_button.disabled = true;
  } else if (selectedInputs[0] != undefined && selectedInputs[1] != undefined) {
    secondNum += ".";
    screen.textContent = secondNum;
    decimal_button.disabled = true;
  }
});

function operate(firstNum, operator, secondNum) {
  if (secondNum == "") {
    return "ERROR, Press Clear";
  } else if (operator === "+") {
    let displaySum = addNumbers(firstNum, secondNum);
    return displaySum;
  } else if (operator === "-") {
    let displayDifference = subtractNumbers(firstNum, secondNum);
    return displayDifference;
  } else if (operator === "*") {
    let displayProduct = multiplyNumbers(firstNum, secondNum);
    return displayProduct;
  } else if (operator === "/") {
    let displayQuotient = divideNumbers(firstNum, secondNum);
    return displayQuotient;
  } else {
    return "ERROR, press Clear";
  }
}

// May need to eventually create some filtering method by which a number is shortened to X decimal places if it's too long.

function addNumbers(firstNum, secondNum) {
  let sum = parseFloat(firstNum) + parseFloat(secondNum);
  return sum;
}

function subtractNumbers(firstNum, secondNum) {
  let difference = parseFloat(firstNum) - parseFloat(secondNum);
  return difference;
}

function multiplyNumbers(firstNum, secondNum) {
  let product = parseFloat(firstNum) * parseFloat(secondNum);
  return product;
}

function divideNumbers(firstNum, secondNum) {
  if (secondNum == 0) {
    screen.textContent = `You can't divide by 0`;
  } else {
    let quotient = parseFloat(firstNum) / parseFloat(secondNum);
    return quotient;
  }
}

function resetCalc() {
  screen.textContent = 0;
  firstNum = "";
  operator = "";
  secondNum = "";
  selectedInputs = [];
}
