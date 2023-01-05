const displayResult = document.querySelector('.resultDisplay');
const buttons = document.querySelectorAll('button');

let firstNum = '';
let secondNum = '';
let operator = '';
let result = 0;

buttons.forEach(button => button.addEventListener('click', function (event) {
    let btnValue = event.target.innerText;
    let btnClass = event.target.classList.value;

    if(btnClass == 'clearBtn') {
        clear();
    }
    else if(btnClass == 'backBtn') {
        back();
    }
    else if(btnClass == 'dotBtn') {
        decimalInput();
    }
    else if(btnClass == 'divBtn' || btnClass == 'mulBtn' || btnClass == 'subBtn' || btnClass == 'addBtn') {
        operator = btnValue;
    }
    else if(btnClass == 'numBtn') {
        // Case 1: Starting off 1st operand, we have not hit operator yet
        console.log(operator)
        if(operator == '') {
            firstNum += btnValue;
            displayResult.innerText = firstNum;
        // Case 2: We have enter operator and ready for 2nd operand
        } else if(operator != '') {
            secondNum += btnValue;
            displayResult.innerText = secondNum;
        }
    }
}))

function add(num1, num2) {
    return num1 += num2;
}

function subtract(num1, num2) {
    return num1 -= num2;
}

function multiply(num1, num2) {
    return num1 *= num2;
}

function divide(num1, num2) {
    if(num2 == 0) {
        alert(`ERROR... \n I'm afraid I can't do that.`)
    }
    return num1 /= num2;
}

function clear() {
    firstNum = '';
    secondNum = '';
    displayResult.innerText = 0;
}

function back() {
    firstNum = firstNum.slice(0, -1);
    displayResult.innerText = firstNum;
}

function decimalInput() {
    // Case 1: we start with decimal
    if (firstNum == '') {
        firstNum = '0.'
    } 
    // Case 2: not the first number and does not already contain decimal
    else if(!firstNum.includes('.')) {
        firstNum += '.'
    } 
    displayResult.innerText = firstNum;
}

function evaluate(num1, num2, operator) {
    let result = 0;
    switch (operator) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            result = divide(num1, num2);
            break;
        default:
            console.log('error')
    }
    return result;
}