class controller {

    constructor(userInput: HTMLInputElement, output: HTMLSpanElement) {
        new display(userInput, output);
        display.displayString("Hello World!");        

        document.body.onkeydown = function(e) {
            if (e.key == "Enter") {
                display.solve();
            }
        }
    }
}



class display {
    static operators = ["·", "/", "+", "-"];
    static multiply = "·";
    static userInput: HTMLInputElement;
    static output: HTMLSpanElement;
    static equation;

    constructor(userInput:HTMLInputElement, output:HTMLSpanElement) {
        if (userInput == null) {
            console.error("ERR: missing userInput DOM!");
        }
        else{
            display.userInput = userInput;
            display.userInput.addEventListener("input", display.eventInput);
        }

        if (output == null) {
            console.error("ERR: missing output DOM!");
        }
        else{
            display.output = output;
        }

        display.displayString("Hello World!");

        console.log(display.getFirstumberAndEndIdex("2-1"));
    }

    private static eventInput(): void {
        display.updateLastChar();
        display.output.innerText = display.readInput();
    }

    private static updateLastChar(): void {
        var lastChar = this.readLastChar();

        if (lastChar == "*") {
            display.setLastChar(this.multiply);
        }
    }

    private static readLastChar(): string{
        return display.userInput.value.charAt(display.userInput.value.length - 1);
    }

    private static setLastChar(value: string): void{
        display.userInput.value = display.userInput.value.substring(0, display.userInput.value.length - 1) + value;
    }

    private static removeLastChar(): void{
        if (display.userInput.value.length == 1) {
            display.userInput.value = display.userInput.value.substring(0, display.userInput.value.length - 1);
        }
    }

    private static isCharOperator(value: string): boolean{
        for (let i = 0; i < display.operators.length; i++) {
            const item = display.operators[i];
            if (item == value) {
                return true;
            }
        }

        return false;
    }
    
    static readInput(): string {
        return display.userInput.value;
    }

    static displayString(value: string): void {
        display.output.textContent = value;
    }



    static solve(): void{
        let equasions = display.getEquasions(display.readInput());

        
        // let answer = display.userInput.value;

        // for (let i = 0; i < display.userInput.value.length - 1; i += 2) {
        //     const number1 = display.userInput.value[i + 1];
        //     const operad = display.userInput.value[i + 1];
        //     const number2 = display.userInput.value[i + 2];
            
        //     answer = this.solveTwoVariables(number1 + operad + number2) + display.removeFirstThreeOperads(answer);
        // }

        // this.displayString(answer);
    }

    private static getEquasions(stringEquasion: string): Array<Number> {
        let result = [];

        while (true){
            let number = display.getFirstumberAndEndIdex(stringEquasion);
            break;
        }

        return null;
    }

    private static getFirstumberAndEndIdex(value: string){
        let foundFloatingPoint = false;

        for (let i = 0; i < value.length; i++) {
            if (Number(value[i]) == NaN && !foundFloatingPoint) {
                foundFloatingPoint = true;
            }
            else {
                return [(Number(value.substring(0, i))), i];
            }
        }

        return NaN;
    }

    

    private static removeFirstThreeOperads(value: string): string{
        return value.substring(3, value.length);
    }

    private static solveTwoVariables(value : string): string{
        switch (value[1]) {
            case this.operators[0]: return (String)(parseInt(value[0]) * parseInt(value[2]));
            default: console.error("devastating error, congratulationsn..."); break;
        }
    }

}



const mainController = new controller(document.getElementById("userinput") as HTMLInputElement, document.getElementById("output") as HTMLSpanElement);
