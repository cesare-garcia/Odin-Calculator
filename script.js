let digit_buttons = Array.from(document.querySelectorAll('.digit'));
let operator_buttons = Array.from(document.querySelectorAll('.operator'));
let clear_button = document.querySelector('.clear');
let equals_button = document.querySelector('.equal');
let screen = document.querySelector('.screen');
let negative = document.querySelector('.negative');
let decimal_button = document.querySelector('.decimal');
let backspace_button = document.querySelector('.delete')

let selectedInputs = [];
let firstNum = '';
let operator = '';
let secondNum = '';

digit_buttons.forEach(digit_button => {
    digit_button.addEventListener('click', (e) => {
        if ( selectedInputs[0] == undefined ) {
            firstNum += e.target.textContent;
            screen.textContent = `${firstNum}`;
        } else if ( selectedInputs[0] != undefined && selectedInputs[1] != undefined) {
            secondNum += e.target.textContent;
            screen.textContent = `${secondNum}`;
        }
    })
})

operator_buttons.forEach(operator_button => {
    operator_button.addEventListener('click', (e) => {
        
        if ( selectedInputs.length == 2 ) {
            selectedInputs.push(secondNum);
            let result = operate(selectedInputs[0], selectedInputs[1], selectedInputs[2]);
            screen.textContent = result;
            firstNum = result;
            operator = e.target.textContent;
            secondNum = '';
            selectedInputs = [];
            selectedInputs.push(result);
            selectedInputs.push(operator);
        } else {
            operator = e.target.textContent;
            if ( selectedInputs[0] != undefined && selectedInputs[1] == undefined ) {
                selectedInputs.push(operator);
            } else if ( selectedInputs[0] == undefined && selectedInputs[1] == undefined ) {
                selectedInputs.push(firstNum);
                selectedInputs.push(operator);
            }
        }
    })
})

equals_button.addEventListener('click', (e) => {
    
    if ( selectedInputs[2] == undefined ) {
        selectedInputs.push(secondNum);
    }
    
    let result = operate(selectedInputs[0], selectedInputs[1], selectedInputs[2]);
    screen.textContent = result;
    firstNum = result;
    operator = '';
    secondNum = '';
    selectedInputs = [];
    selectedInputs.push(result);
});

clear_button.addEventListener('click', (e) => {
    resetCalc();
});

negative.addEventListener('click', (e) => {
    console.log(e.target);
    if ( selectedInputs[0] != undefined && selectedInputs[1] == undefined ) {
        selectedInputs.shift();
        firstNum *= -1;
        selectedInputs.push(firstNum);
        screen.textContent = firstNum;
    } else if ( selectedInputs[0] == undefined ) {
        parseInt(firstNum);
        firstNum *= -1;
        screen.textContent = firstNum;
    } else if ( selectedInputs[0] != undefined && selectedInputs[1] != undefined ) {
        parseInt(secondNum);
        secondNum *= -1;
        console.log(secondNum);
        screen.textContent = secondNum;
    }
})

backspace_button.addEventListener('click', (e) => {
    
    if ( selectedInputs[0] == undefined ) {
        resetCalc();
    } else if ( selectedInputs[0] != undefined && selectedInputs[1] != undefined ) {
        selectedInputs.pop();
        secondNum = '';
        screen.textContent = selectedInputs[0];
    } else if ( selectedInputs[0] != undefined ) {
        resetCalc();
    }
});

function operate(firstNum, operator, secondNum) {
    if ( secondNum == '' ) {
        return 'ERROR, Press Clear';
    } else if ( operator === '+' ) {
        let displaySum = addNumbers(firstNum, secondNum);
        return displaySum;
    } else if ( operator === '-' ) {
        let displayDifference = subtractNumbers(firstNum, secondNum);
        return displayDifference;
    } else if ( operator === '*' ) {
        let displayProduct = multiplyNumbers(firstNum, secondNum);
        return displayProduct;
    } else if ( operator === '/' ) {
        let displayQuotient = divideNumbers(firstNum, secondNum);
        return displayQuotient;
    } else {
        return 'ERROR';
    }
}

function addNumbers(firstNum, secondNum) {
    let sum = parseInt(firstNum) + parseInt(secondNum);
    return sum;
}

function subtractNumbers(firstNum, secondNum) {
    let difference = parseInt(firstNum) - parseInt(secondNum);
    return difference;
}

function multiplyNumbers(firstNum, secondNum) {
    let product = parseInt(firstNum) * parseInt(secondNum);
    return product;
}

function divideNumbers(firstNum, secondNum) {
    if ( secondNum == 0 ) {
        return `You can't divide by 0`;
    } else {
        let quotient = parseInt(firstNum) / parseInt(secondNum);
        return quotient;
    }
}

function resetCalc() {
    screen.textContent = 0;
    firstNum = '';
    operator = '';
    secondNum = '';
    selectedInputs = [];
}