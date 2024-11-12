import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentValue = '';
let storedValue = '';
let currentOperation = null;

window.appendToDisplay = (value) => {
    currentValue += value;
    display.value = currentValue;
};

window.clearDisplay = () => {
    currentValue = '';
    storedValue = '';
    currentOperation = null;
    display.value = '';
};

window.setOperation = (operation) => {
    if (currentValue !== '') {
        storedValue = currentValue;
        currentValue = '';
        currentOperation = operation;
    }
};

window.calculate = async () => {
    if (storedValue !== '' && currentValue !== '' && currentOperation) {
        const x = parseFloat(storedValue);
        const y = parseFloat(currentValue);
        let result;

        display.value = 'Calculating...';

        try {
            switch (currentOperation) {
                case '+':
                    result = await backend.add(x, y);
                    break;
                case '-':
                    result = await backend.subtract(x, y);
                    break;
                case '*':
                    result = await backend.multiply(x, y);
                    break;
                case '/':
                    const divisionResult = await backend.divide(x, y);
                    if (divisionResult === null) {
                        throw new Error('Division by zero');
                    }
                    result = divisionResult;
                    break;
            }

            currentValue = result.toString();
            display.value = currentValue;
            storedValue = '';
            currentOperation = null;
        } catch (error) {
            display.value = 'Error: ' + error.message;
            setTimeout(() => {
                clearDisplay();
            }, 2000);
        }
    }
};
