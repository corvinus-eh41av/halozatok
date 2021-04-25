var n = 1;
var helyesMegoldas = null;
const defaultColor = "rgb(255, 255, 255, 0.0)";


function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}   

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("header").innerText = kérdés.questionText
    document.getElementById("a").innerText = kérdés.answer1
    document.getElementById("b").innerText = kérdés.answer2
    document.getElementById("c").innerText = kérdés.answer3

    if (kérdés.image=="") {
        picture.src = "";
    }
    else {
        document.getElementById(picture).src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }


    console.log(kérdés);
    helyesMegoldas = kérdés.correctAnswer;

    let btns = document.getElementsByClassName("q")
    Array.prototype.forEach.call(btns, (el) => el.style.backgroundColor = defaultColor)

}




window.onload = (event) => {
    kérdésBetöltés(n)
    
};

function eval(answer_idx, elem) {
    let correct = helyesMegoldas;
    color = "red";
    if (correct == answer_idx) {
        color = "green";
    }

    elem.style.backgroundColor = color;
}


function change() {
    n = n + 1;
    kérdésBetöltés(n)

}

function changeback() {
    n = n - 1;
    kérdésBetöltés(n)

}