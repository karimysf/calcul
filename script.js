let s = document.getElementById("resultat");

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
    button.addEventListener("click", () => showresult(button.value.toString()));
});

const res = document.getElementById("res");
res.addEventListener("click", () => {
    if (s.innerText.includes("="))
        s.innerText="";
    else
    showresult("=" + calculateresult(s.innerText).toString());
});

document.addEventListener("keydown", (event) => {
    const k = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "x"];
    if (s.innerText.includes("="))
        s.innerText="";
    else {
    if (event.key === "Backspace") {
        delet();
    } 
   if (k.includes(event.key)) {
        showresult(event.key);
    }  if (event.key === "=" ) {
        showresult("=" + calculateresult(s.innerText).toString());
    } }    
});

function calculateresult(s) {
    let result = 0;
    const L = ["+", "-", "/", "x"];
    let s2 = "";
    let i = 0;
    while (i < s.length) {
        let j = i;
        while (j < s.length && !L.includes(s[j])) {
            j++;
        }
        s2 = s.substring(i, j);
        if (i === 0) {
            result = parseInt(s2, 10);
        } else {
            if (s[i - 1] === "+") {
                result += parseInt(s2, 10);
            } else if (s[i - 1] === "-") {
                result -= parseInt(s2, 10);
            } else if (s[i - 1] === "x") {
                result =result*parseInt(s2, 10);
            } else if (s[i - 1] === "/") {
                result /= parseInt(s2, 10);
            }
        }
        i = j+1 ;
    }
    return result;
}

console.log(calculateresult(s.innerText))
