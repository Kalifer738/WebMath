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
    //Operators ·, /, +, -, √
    //Numbers 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    //Equasions (1), (1 + 1), (165 - 52), (...)
    //Operand ·, 1, (2), -, (143 · 33), ...

    static operators = ["·", "/", "+", "-", "√"];
    static numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static equasions = ["(", ")", "√"];
    
    static multiply = "·";
    static sqrt = "√";

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

    private static isCharNumber(value: string): boolean{
        switch (value) {
            case "0": return true;
            case "1": return true;
            case "2": return true;
            case "3": return true;
            case "4": return true;
            case "5": return true;
            case "6": return true;
            case "7": return true;
            case "8": return true;
            case "9": return true;
            default: return false;
        }
    }

    private static isCharEquasion(value: string): boolean{
        switch (value) {
            case "(": return true;
            case ")": return true;
            case "√": return true;
            default: return false;
        }
    }
    
    private static isCharStartOfEquasion(value: string): boolean{
        switch (value) {
            case "(": return true;
            case "√": return true;
            default: return false;
        }
    }

    private static isCharEndOfEquasion(value: string): boolean {
        switch (value) {
            case "(": return true;
            case "√": return true;
            default: return false;
        }
    }

    static readInput(): string {
        return display.userInput.value;
    }

    static displayString(value: string): void {
        display.output.textContent = value;
    }



    static solve(): void{
        let equasions = display.getEquasions(display.readInput());

        console.log(equasions);
        // let answer = display.userInput.value;

        // for (let i = 0; i < display.userInput.value.length - 1; i += 2) {
        //     const number1 = display.userInput.value[i + 1];
        //     const operad = display.userInput.value[i + 1];
        //     const number2 = display.userInput.value[i + 2];
            
        //     answer = this.solveTwoVariables(number1 + operad + number2) + display.removeFirstThreeOperads(answer);
        // }

        // this.displayString(answer);
    }

    private static getEquasions(stringEquasion: string): any[][] {
        let result = [[]];
        let equasionDepth = 0;
        let equasionWidth = 0;

        let outOfNumbers = false;
        let outOfOperators = false;
        while(stringEquasion.length > 0){
            let operandData = this.getFirstOperadAndEndIndex(stringEquasion);
            
            if (operandData[2] == 1) {
                //Operator
                if (stringEquasion.length == 1) {
                    result[equasionDepth][equasionWidth] = stringEquasion.substring(0, operandData[1] as number + 1);
                    break;
                }
                else{
                    result[equasionDepth][equasionWidth] = stringEquasion.substring(0, operandData[1] as number);
                }
                stringEquasion = stringEquasion.substring(operandData[1] as number, stringEquasion.length);
                equasionWidth++;
            }
            else if (operandData[2] == 2) {
                //Number
                if (stringEquasion.length == 1) {
                    result[equasionDepth][equasionWidth] = stringEquasion.substring(0, operandData[1] as number + 1);
                    break;
                }
                else{
                    result[equasionDepth][equasionWidth] = stringEquasion.substring(0, operandData[1] as number);
                }
                stringEquasion = stringEquasion.substring(operandData[1] as number, stringEquasion.length);
                equasionWidth++;
            }
            else if (operandData[2] == 3) {
                //Equasion
                if (stringEquasion.length == 1) {
                    result[equasionDepth][equasionWidth] = stringEquasion.substring(0, operandData[1] as number + 1);
                    break;
                }
                else{
                    result[equasionDepth][equasionWidth] = stringEquasion.substring(0, operandData[1] as number);
                    stringEquasion = stringEquasion.substring(operandData[1] as number, stringEquasion.length);
                }
                equasionDepth++;
                equasionWidth = 0;
            }
            else if(operandData == null){
                console.error("OperandData is null!");
            }
        }

        return result;
    }

    private static getFirstOperadAndEndIndex(value: string): (string | number | number)[]{
        const element = value[0];
        if (this.isCharOperator(element)) {
            let operatorData = this.getFirstOperatorAndEndIndex(value);
            return [operatorData[0], operatorData[1] as number + 1, 1];
        }
        else if(this.isCharNumber(element)){
            let numberData = this.getFirstNumberAndEndIdex(value);
            return [numberData[0], numberData[1], 2];
        }
        else if(this.isCharEquasion(element)){
            let equasionData = this.getFirstEquasionAndEndIndex(value);
            return [equasionData[0], equasionData[1], 3];
        }

        console.error("Noting is working?")
        return null;
        
    }

    private static getFirstEquasionAndEndIndex(value: string): (string | number)[]{
        for (let i1 = 0; i1 < value.length; i1++) {
            const startEquasion = value[i1];
            if (this.isCharStartOfEquasion(startEquasion)) {
                
                for (let i2 = i1; i2 < value.length; i2++) {
                    const endEquasion = value[i2];
                    if (this.isCharEndOfEquasion(endEquasion) || i1 - 1 == value.length) {
                        return [value.substring(i1, i2), i2];
                    }
                }
            }
        }

        return null;
    }

    private static getFirstOperatorAndEndIndex(value: string): (string | number)[]{
        for (let i = 0; i < value.length; i++) {
            const element = value[i];
            if (this.isCharOperator(element)) {
                return [element, i];
            }
        }
        return null;
    }

    private static getFirstNumberAndEndIdex(value: string){
        let foundFloatingPoint = false;
        let foundNegativeSign = false;

        for (let i = 0; i < value.length; i++) {
            let x = Number(value[i]);
            if (i == value.length - 1 && !isNaN(x)) {
                return [(Number(value.substring(0, i + 1))), i];
            }
            if (!isNaN(x)) {
                continue;
            }
            else if (!foundNegativeSign && value[i] == "-"){
                foundNegativeSign = true;
            }
            else if (!foundFloatingPoint && value[i] == ".") {
                foundFloatingPoint = true;
            }
            else {
                return [(Number(value.substring(0, i))), i];
            }
        }

        return null;
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
