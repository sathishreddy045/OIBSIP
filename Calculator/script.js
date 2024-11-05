let display = document.getElementById("display");
let buttons = Array.from(document.getElementsByClassName("buttons")[0].children);

let currentInput = "";
let previousInput = "";
let operator = null;

buttons.map(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerText;

        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = null;
            display.innerText = "0";
        } else if (value === "=") {
            if (operator && previousInput !== "" && currentInput !== "") {
                currentInput = evaluate(previousInput, currentInput, operator);
                display.innerText = currentInput;
                operator = null;
                previousInput = "";
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput !== "") {
                if (previousInput !== "") {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                }
                previousInput = currentInput;
                currentInput = "";
                operator = value;
            }
        } else if (value === ".") {
            if (!currentInput.includes(".")) {
                currentInput += value;
                display.innerText = currentInput;
            }
        } else {
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});

function evaluate(num1, num2, op) {
    let result;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (op === "+") result = num1 + num2;
    if (op === "-") result = num1 - num2;
    if (op === "*") result = num1 * num2;
    if (op === "/") result = num2 === 0 ? "Error" : num1 / num2;
    return result.toString();
}
