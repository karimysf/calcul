const s = document.getElementById("resultat");

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
        s.innerText = "";
    }
}

const buttons = document.querySelectorAll(".m");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const str = s.innerText;
        const coleur =s.style.color;
        if (!s.innerText.includes("="))
        showresult(button.value.toString());
        if (!testsyntaxe(s.innerText)) {
            s.innerText="";
            s.style.color="red";
            s.style.fontSize="Larger"
            s.innerText = "ERROR SYNTAX!";
           
            setTimeout(() => {
               
                
                s.innerText = str;
                s.style.color=coleur;
            }, 1000);
        }
    });
});

const res = document.getElementById("res");
res.addEventListener("click", () => {
    if (!s.innerText.includes("=") && s.innerText !== "") {
        showresult("=" + calculateresult(s.innerText).toString());
    }
    else s.innerText="";
});

document.addEventListener("keydown", (event) => {
    const k = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "x"];
    if (!s.innerText.includes("=") && s.innerText !== "") {
        if (event.key === "Backspace") {
            delet();
        } else if (k.includes(event.key)) {
            showresult(event.key);
        } else if (event.key === "=" || event.key === "Enter") {
            showresult("=" + calculateresult(s.innerText).toString());
        }
    }
});

function calculateresult(s) {
    let result = 0;
    const L = ["+", "-", "/", "x", "."];
    let s2 = "";
    let i = 0;
    while (i < s.length) {
        let j = i;
        while (j < s.length && !L.includes(s[j])) {
            j++;
        }
        s2 = s.substring(i, j);
        if (i === 0) {
            result = parseFloat(s2);
        } else {
            if (s[i - 1] === "+") {
                result += parseFloat(s2);
            } else if (s[i - 1] === "-") {
                result -= parseFloat(s2);
            } else if (s[i - 1] === "x") {
                result *= parseFloat(s2);
            } else if (s[i - 1] === "/") {
                result /= parseFloat(s2);
            }
            else if (s[i-1]=="."){
                result+=parseFloat(s2,10)/Math.pow(10,s2.length)
            }
        }
        i = j + 1;
    }
    return result;
}

function testsyntaxe(a) {
    const L = ["+", "-", "/", "x", ".", "="];
    for (let i = 0; i < a.length - 1; i++) {
        if (L.includes(a[i]) && L.includes(a[i + 1])) {
            return false;
        }
    
    }
    return true;
}
