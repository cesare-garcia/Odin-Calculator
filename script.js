let digit_buttons = Array.from(document.querySelectorAll('.digit'));
let operator_buttons = Array.from(document.querySelectorAll('.operator'));
let clear_button = document.querySelector('.clear');
let equals_button = document.querySelector('.equal');
let screen = document.querySelector('.screen');;

let selectedInputs = [];
let firstNum = '';
let operator = '';
let secondNum = '';

digit_buttons.forEach(digit_button => {
    digit_button.addEventListener('click', (e) => {
        if ( selectedInputs[0] == undefined ) {
            firstNum += e.target.textContent;
            screen.textContent = `${firstNum}`;
        } else {
            secondNum += e.target.textContent;
            screen.textContent = `${secondNum}`;
        }
    })
})

operator_buttons.forEach(operator_button => {
    operator_button.addEventListener('click', (e) => {
        
        if ( selectedInputs.length > 2 ) {
            console.log(operate(selectedInputs[0], selectedInputs[1], selectedInputs[2]));
            // console.log('test');
        } else {
            operator = e.target.textContent;
            if ( selectedInputs[0] == undefined ) {
                selectedInputs.push(firstNum);
                selectedInputs.push(operator);
                console.log(selectedInputs);
            }
        }
    })
})

equals_button.addEventListener('click', (e) => {
    
    if ( selectedInputs[2] == undefined ) {
        selectedInputs.push(secondNum);
    }
    
    let result = operate(selectedInputs[0], selectedInputs[1], selectedInputs[2]);
    console.log(result);
})

clear_button.addEventListener('click', (e) => {
    screen.textContent = ''; //need a solution that won't make the grey screen disappear.
    firstNum = '';
    operator = '';
    secondNum = '';
    selectedInputs = [];
});

function operate(firstNum, operator, secondNum) {
    if ( operator === '+' ) {
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
    let quotient = parseInt(firstNum) / parseInt(secondNum);
    return quotient;
}