const s = document.getElementById("resultat");
const newbtn = document.querySelectorAll(".new");

function showresult(a) {
    if (s.innerText === "0") {
        s.innerText = a;
    } else {
        s.innerText += a;
    }
}

function delet() {
    if (s.innerText.length > 1) {
        s.innerText = s.innerText.slice(0, -1);
    } else {
        s.innerText = "0";
    }
}

const buttons = document.querySelectorAll(".m");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const str = s.innerText;
        const coleur = s.style.color;
        if (!s.innerText.includes("=")) {
            showresult(button.value.toString());
        }
        if (!testsyntaxe(s.innerText)) {
            s.innerText = "";
            s.style.color = "red";
            s.style.fontSize = "Larger";
            s.innerText = "ERROR SYNTAX!";
            setTimeout(() => {
                s.innerText = str;
                s.style.color = coleur;
            }, 1000);
        }
    });
});

newbtn.forEach(button => {
    button.addEventListener("click", () => {
        if (button.value === "0") {
            showresult("0");
        }
        if (button.value === "AC") {
            s.innerText = "0";
        }
    });
});

const res = document.getElementById("res");
res.addEventListener("click", () => {
    if (!s.innerText.includes("=") && s.innerText !== "") {
        showresult("=" + calculateresult(s.innerText).toString());
    } else {
        s.innerText = "0";
    }
});

document.addEventListener("keydown", (event) => {
    const k = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "x", "(", ")"];
    if (!s.innerText.includes("=")) {
        if (event.key === "Backspace") {
            delet();
        } else if (k.includes(event.key)) {
            showresult(event.key);
        } else if (event.key === "=" || event.key === "Enter") {
            showresult("=" + calculateresult(s.innerText).toString());
        }
    }
});

function calculateresult(expression) {
    expression = expression.replace(/x/g, '*'); // Replace 'x' with '*' for multiplication
    try {
        return eval(expression);
    } catch (e) {
        return "ERROR";
    }
}

function testpar(expression) {
    let stack = [];
    for (let char of expression) {
        if (char === "(") {
            stack.push(char);
        } else if (char === ")") {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;
}

function testsyntaxe(expression) {
    const operators = ["+", "-", "/", "x", ".", "="];
    if (expression.includes("(") || expression.includes(")")) {
        if (!testpar(expression)) {
            return false;
        }
    }
    for (let i = 0; i < expression.length - 1; i++) {
        if (operators.includes(expression[i]) && operators.includes(expression[i + 1])) {
            return false;
        }
    }
    return true;
}
