const displayResult = document.querySelector('.resultDisplay');
const buttons = document.querySelectorAll('button');

let firstNum = '';
let secondNum = '';
let operator = '';
let result = '';

buttons.forEach(button => button.addEventListener('click', function (event) {
    let btnValue = event.target.innerText;
    let btnClass = event.target.classList.value;

    if(btnClass == 'clearBtn') {
        clear();
    }
    else if(btnClass == 'backBtn') {
        // Case 1: we're working with firstNum so we haven't made operator yet
        if(operator == '') {
            back('1stOperand');
        } else {
            back('2ndOperand');
        }
    }
    else if(btnClass == 'divBtn' || btnClass == 'mulBtn' || btnClass == 'subBtn' || btnClass == 'addBtn') {
        // We have already an given num1, num2, and operator. Go ahead and evaluate result.
        // Then, we assign firstNum as result to be use to calculate next expression
        if(secondNum != '') {
            result = evaluate(firstNum, secondNum, operator);
            displayResult.innerText = result;
            firstNum = result;
            secondNum = '';
            result = '';
        }
        operator = btnValue;
    }
    else if(btnClass == 'numBtn') {
        // Case 1: Starting off 1st operand, we have not hit operator yet
        if(operator == '') {
            firstNum += btnValue;
            displayResult.innerText = firstNum;
        // Case 2: We have enter operator and ready for 2nd operand. Awaiting result
        } else if(operator != '' && result == '') {
            secondNum += btnValue;
            displayResult.innerText = secondNum;
        } 
    }
    else if(btnClass == 'equalBtn') {
        if (firstNum == '' || secondNum == '') return;
        result = evaluate(firstNum, secondNum, operator);
        displayResult.innerText = result;
    }
    else if(btnClass == 'dotBtn') {
        if(operator == '') {
            decimalInput('1stOperand');
        } else {
            decimalInput('2ndOperand');
        }

    }
}))

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
    if(num2 == 0) {
        alert(`ERROR... \n I'm afraid I can't do that.`)
    }
    return num1 / num2;
}

function clear() {
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    displayResult.innerText = 0;
}

function back(operand) {
    if(operand == '1stOperand') {
        firstNum = firstNum.slice(0, -1);
        displayResult.innerText = firstNum;
    } else {
        secondNum = secondNum.slice(0, -1);
        displayResult.innerText = secondNum;
    }
}

function decimalInput(operand) {
    switch (operand) {
        case '1stOperand':
            if (firstNum == '') {
                firstNum = '0.';
            } else if(!firstNum.includes('.')) {
                firstNum += '.';
            }
            displayResult.innerText = firstNum;
            break;
        case '2ndOperand':
            if (secondNum == '') {
                secondNum = '0.';
            } else if(!secondNum.includes('.')) {
                secondNum += '.';
            } 
            displayResult.innerText = secondNum;
            break;
    }
}

function evaluate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            console.log('error');
    }
    return Math.round(result*100)/100;
}