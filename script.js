let displayResult = document.querySelector('.resultDisplay');
let buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('mousedown', function(event){
    let btnValue = event.target.innerText;
    
    // if number display
    // if operator
    // call operate() when classbtnValue is equal
    // if 
    displayResult.innerText = btnValue;
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
    if (num2 == 0) {
        alert(`ERROR... \n I'm afraid I can't do that.`) 
    }
    return num1 /= num2;
}

function display(number) {
    displayResult.innerText = number
}

function operate(num1, num2, operator) {
    let result = 0;
    switch (operator) {
        case 'add':
            result = add(num1,num2);
            break;
        case 'subtract':
            result = subtract(num1,num2);
            break;  
        case 'multiply':
            result = multiply(num1,num2);
            break;          
        case 'divide':
            result = divide(num1,num2);
            break;
        default:
            console.log('error')
    }
    return result;
}