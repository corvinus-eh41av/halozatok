
var n = 0;
var question = null;
const defaultColor = "rgb(255, 255, 255, 0.0)";

function download()
{
    fetch('/questions.json')
        .then(Response => Response.json())
        .then(data => {
            finished(data);
            appear(data);

            
        });
}

function finished(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    question = d;
}

window.onload = (event) => {
    download()

};

function appear(data)
{
    console.log( data)
    a.innerText = data[n].answer1;


    b.innerText = data[n].answer2;


    c.innerText = data[n].answer3;


    header.innerText = data[n].questionText;

    pictures.innerHTML = '<img src="' + data[n].image + '">'
}

function eval(answer_idx, elem) {
    let correct = question[n].correctAnswer;
    color = "red";
    if (correct == answer_idx) {
        color = "green";
    }

    elem.style.backgroundColor = color;
}

function change()
{
    n = (n + 1) % question.length;
    appear(question)
    let btns = document.getElementsByClassName("q")
    Array.prototype.forEach.call(btns, (el) => el.style.backgroundColor = defaultColor)
    
}
