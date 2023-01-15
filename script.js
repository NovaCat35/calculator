const displayResult = document.querySelector('.resultDisplay');
const displayEquation = document.querySelector('.equationDisplay');
const buttons = document.querySelectorAll('button');
const clickAudio = document.querySelector('audio[data-sound="click"]');

let firstNum = '0';
let secondNum = '';
let operator = '';
let result = '';


buttons.forEach(button => button.addEventListener('click', function (event) {
    clickAudio.currentTime = 0;
    clickAudio.play();

    // Issue with buttons being focus[keyboard support] after an alert prompt. To clear focus, we include the below.
    document.activeElement.blur();

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
        showEquation();
    }
    else if(btnClass == 'divBtn' || btnClass == 'mulBtn' || btnClass == 'subBtn' || btnClass == 'addBtn') {
        if(firstNum == '') return;
        // We have already an given num1, num2, and operator. Go ahead and evaluate result.
        if(secondNum != '') {
            result = evaluate(firstNum, secondNum, operator);
            if(Number.isNaN(result)){
                displayResult.innerText = 'Undefined';
                return;
            }
            displayResult.innerText = result;
            reassign();
        }
        operator = btnValue;
        showEquation();
    }
    else if(btnClass == 'numBtn') {
        // Case 1: replace placeholder 0
        if(firstNum == '0' && operator == '') {
            firstNum = '' + btnValue;
            displayResult.innerText = firstNum;
        }
        // Case 2: Currently at 1st operand, we have not hit operator yet
        else if(operator == '') {
            if(firstNum.length <= 9) {
                firstNum += btnValue;
                displayResult.innerText = addCommas(firstNum);
            } else {
                firstNum += btnValue;
                displayResult.innerText = Number(firstNum).toExponential(2)
            }
        // Case 3: We have enter operator and ready for 2nd operand. Awaiting result
        } else if(operator != '' && result == '') {
            if(secondNum.length <= 9) {
                secondNum += btnValue;
                displayResult.innerText = addCommas(secondNum);
            } else {
                secondNum += btnValue;
                displayResult.innerText = Number(secondNum).toExponential(2)
            }
        } 
        showEquation();
    }
    else if(btnClass == 'equalBtn') {
        if(firstNum == '' || secondNum == '') return;

        result = evaluate(firstNum, secondNum, operator);
        if(Number.isNaN(result)){
            displayResult.innerText = 'Undefined';
            reassign();
            return;
        }
        displayResult.innerText = addCommas(result);
        showEquation(true);
        reassign();
    }
    else if(btnClass == 'dotBtn') {
        if(operator == '') {
            decimalInput('1stOperand');
        } else {
            decimalInput('2ndOperand');
        }
    } else if(btnClass == 'negPos') {
        if(displayResult.innerText == 0) 
            return;
        else if(operator == '') {
            makeSign('1stOperand');
        } else {
            makeSign('2ndOperand');
        }
    }
}))

// Assign firstNum as the evaluated result and clear room for new evaluation
function reassign() {
    firstNum = String(result);
    secondNum = '';
    operator = '';
    result = '';
}

function addCommas(num) {
    // To account for decimals, we split to avoid putting commas after the dot
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/(?=(?:\d{3})+$)(?!^)/g, ",");
    return parts.join(".");
}

function showEquation(equalBtn = false) {
    if(equalBtn == true) {
        displayEquation.innerText = `${firstNum} ${operator} ${secondNum} =`;
    } else {
        displayEquation.innerText = `${firstNum} ${operator} ${secondNum}`;
    }
}

function makeSign(operand) {
    if(operand == '1stOperand') {
        if(!firstNum.includes('-')) {
            firstNum = '-' + firstNum;
        } else {
            firstNum = firstNum.slice(1);
        }
        displayResult.innerText = firstNum;
    } 
    else {
        if(!secondNum.includes('-')) {
            secondNum = '-' + secondNum;
        } else {
            secondNum = secondNum.slice(1);
        }
        displayResult.innerText = secondNum;
    }
}

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
        alert(`ERROR: DIVISION BY ZERO\nI'M AFRAID I CAN'T DO THAT!\n\nImagine the due consequence being equivalent to the creation of a black whole in your neighborhood, the chaos of a time continuation paradox, or even worst . . . \nEating bitter gourd 苦瓜 >:P `);
        return;
    }
    return num1 / num2;
}

function clear() {
    firstNum = '0';
    secondNum = '';
    operator = '';
    result = '';
    displayResult.innerText = 0;
    displayEquation.innerText = '';
    showEquation();
}

function back(operand) {
    if(operand == '1stOperand') {
        firstNum = firstNum.slice(0, -1);
        if(firstNum.length <= 9){
            displayResult.innerText = addCommas(firstNum);
        } else{
            displayResult.innerText = Number(firstNum).toExponential(2);
        }
    } else {
        secondNum = secondNum.slice(0, -1);
        if(secondNum.length <= 9){
            displayResult.innerText = addCommas(secondNum);
        } else{
            displayResult.innerText = Number(secondNum).toExponential(2);
        }
    }
}

function decimalInput(operand) {
    switch (operand) {
        case '1stOperand':
            if (firstNum == '') {
                firstNum = '0.';
            }
            else if(!firstNum.includes('.')) {
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

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    if(event.key == 'Backspace') {
        document.getElementById('delete').click();
        document.getElementById('delete').classList.add('active');
    } 
    if(event.key == 'Enter') {
        document.getElementById('=').click();
        document.getElementById('=').classList.add('active');
    }
    else{
        document.getElementById(`${event.key}`).click();
        document.getElementById(`${event.key}`).classList.add('active');
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event.key);
    // if(event.key == 'Backspace') {
    //     document.getElementById('delete').classList.remove('active');
    // } 
    // if(event.key == 'Enter') {
    //     document.getElementById('=').classList.remove('active');
    // }
    // else{
    //     document.getElementById(`${event.key}`).classList.remove('active');
    // }
    buttons.forEach(button =>  button.classList.remove('active'));
});