class Calculator {
    constructor() {
    }

    sum(num1, num2) {
        let result = num1 + num2;
        return result;
    }

    deduct(num1, num2) {
        let result = num1 - num2;
        return result;
    }

    multiply(num1, num2) {
        let result = num1 * num2;
        return result;
    }

    division(num1, num2) {
        let result = num1 / num2;
        return result;
    }
}

export {Calculator};