var hotList = [];           
var questionsInHotList = 3; 
var displayedQuestion;     
var numberOfQuestions;      
var nextQuestion = 1;     
var timerHandler;

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }

   

    fetch("/questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("next").addEventListener("click", elore);
    document.getElementById("back").addEventListener("click", hatra);

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"))
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }

    if (hotList.length===0) {
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kérdésMegjelenítés();
    }

}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`hibas betoltes: ${result.status}`)
                return null;
            } 
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotlist ${destination} helyére`)
            if (displayedQuestion === undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }

        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("header").innerText = kérdés.questionText
    document.getElementById("a1").innerText = kérdés.answer1;
    document.getElementById("a2").innerText = kérdés.answer2;
    document.getElementById("a3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("picture").src = kérdés.image;
        document.getElementById("picture").style.display = "block";
    }
    else {
        document.getElementById("picture").style.display = "none";
    }


        for (var i = 1; i <= 3; i++) {
            document.getElementById("a" + i).classList.remove("jo", "rossz")
            
        }
        document.getElementById("questions").style.pointerEvents = "auto";
    
}

window.onload = init;

function elore() {
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
    clearTimeout(timerHandler);
}

function hatra() {
    displayedQuestion--;
    if (displayedQuestion<0) displayedQuestion = questionsInHotList-1;
    kérdésMegjelenítés();
}

function valasztas(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("a" + n).classList.add("jo")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("a"+n).classList.add("rossz")
        document.getElementById("a" + kérdés.correctAnswer).classList.add("jo")
        hotList[displayedQuestion].goodAnswers=0;
    }

    document.getElementById("questions").style.pointerEvents = "none";
    timerHandler = setTimeout(elore, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", JSON.stringify(displayedQuestion));
    localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion));
}
