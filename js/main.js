class controller {
    constructor(userInput, output) {
        new display(userInput, output);
        display.displayString("Hello World!");
        document.body.onkeydown = function (e) {
            if (e.key == "Enter") {
                display.solve();
            }
        };
    }
}
class display {
    constructor(userInput, output) {
        if (userInput == null) {
            console.error("ERR: missing userInput DOM!");
        }
        else {
            display.userInput = userInput;
            display.userInput.addEventListener("input", display.eventInput);
        }
        if (output == null) {
            console.error("ERR: missing output DOM!");
        }
        else {
            display.output = output;
        }
        display.displayString("Hello World!");
        console.log(display.getFirstumberAndEndIdex("2-1"));
    }
    static eventInput() {
        display.updateLastChar();
        display.output.innerText = display.readInput();
    }
    static updateLastChar() {
        var lastChar = this.readLastChar();
        if (lastChar == "*") {
            display.setLastChar(this.multiply);
        }
    }
    static readLastChar() {
        return display.userInput.value.charAt(display.userInput.value.length - 1);
    }
    static setLastChar(value) {
        display.userInput.value = display.userInput.value.substring(0, display.userInput.value.length - 1) + value;
    }
    static removeLastChar() {
        if (display.userInput.value.length == 1) {
            display.userInput.value = display.userInput.value.substring(0, display.userInput.value.length - 1);
        }
    }
    static isCharOperator(value) {
        for (let i = 0; i < display.operators.length; i++) {
            const item = display.operators[i];
            if (item == value) {
                return true;
            }
        }
        return false;
    }
    static readInput() {
        return display.userInput.value;
    }
    static displayString(value) {
        display.output.textContent = value;
    }
    static solve() {
        let equasions = display.getEquasions(display.readInput());
    }

    static getEquasions(stringEquasion) {
        let result = [];
        while (true) {
            let number = display.getFirstumberAndEndIdex(stringEquasion);
            break;
        }
        return null;
    }

    static getFirstumberAndEndIdex(value) {
        let foundFloatingPoint = false;
        for (let i = 0; i < value.length; i++) {
            let x = Number(value[i]);
            if (x == NaN && !foundFloatingPoint) {
                foundFloatingPoint = true;
            }
            else {
                return [(Number(value.substring(0, i))), i];
            }
        }
        return NaN;
    }

    static removeFirstThreeOperads(value) {
        return value.substring(3, value.length);
    }

    static solveTwoVariables(value) {
        switch (value[1]) {
            case this.operators[0]: return (String)(parseInt(value[0]) * parseInt(value[2]));
            default:
                console.error("devastating error, congratulationsn...");
                break;
        }
    }
}
display.operators = ["·", "/", "+", "-"];
display.multiply = "·";
const mainController = new controller(document.getElementById("userinput"), document.getElementById("output"));
