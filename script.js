function addNumbers(firstNum, secondNum) {
    let sum = firstNum + secondNum;
    return sum;
}

function subtractNumbers(firstNum, secondNum) {
    let difference = firstNum - secondNum;
    return difference;
}

function multiplyNumbers(firstNum, secondNum) {
    let product = firstNum * secondNum;
    return product;
}

function divideNumbers(firstNum, secondNum) {
    let quotient = firstNum/secondNum;
    return quotient;
}

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