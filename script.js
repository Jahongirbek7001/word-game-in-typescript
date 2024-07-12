"use strict";
const options = {
    aroma: "Xushbo'y hid",
    pepper: "Qalapmir",
    halt: "To'xtash",
    jump: "Sakramoq ",
    shuffle: "Aralashtirmoq",
    combine: "Biriktirmoq",
    chaos: "Tartibsizlik",
    labyrinth: "Labirint",
    disturb: "Bezovta qilmoq",
    shift: "Siljish",
    machine: "Mashina",
};
//Initial References
const message = document.getElementById("message");
const hintRef = document.getElementById("hint-ref");
const controls = document.getElementById("controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "", randomHint = "";
let winCount = 0, lossCount = 0;
let lettersBtn = document.getElementsByClassName("lettersBtn");
let lettersBtnArray = Array.from(lettersBtn);
//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
//Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};
//Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});
//Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};
//Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach(() => {
        displayItem += '<span class="inputSpace">_ </span>';
    });
    //Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};
//Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    //For creating letter buttons
    for (let i = 0; i < lettersBtnArray.length; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        if (i == 19) {
            button.style.marginLeft = "20px";
        }
        button.innerText = lettersBtnArray[i].innerText;
        // Character button onclick
        button.addEventListener("click", () => {
            message.innerText = `Correct Letter`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
            let inputSpaceArray = Array.from(inputSpace);
            //If character in array is same as clicked button
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //If character in array is same as clicked button
                    if (char === button.innerText) {
                        button.classList.add("correct");
                        console.log(char);
                        //Replace dash with letter
                        inputSpaceArray[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //If winCount equals word length
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "You Won";
                            word.innerHTML = `The word was: <span>${randomWord}</span>`;
                            startBtn.innerText = "Restart";
                            //block all buttons
                            blocker();
                        }
                    }
                });
            }
            else {
                //lose count
                button.classList.add("incorrect");
                lossCount -= 1;
                let chance = document.getElementById("chanceCount");
                chance.innerText = `Chance Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if (lossCount == 0) {
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over";
                    blocker();
                }
            }
            //Disable clicked buttons
            button.disabled = true;
        });
        //Append generated buttons to the letters container
        letterContainer.appendChild(button);
    }
};
window.onload = () => {
    init();
};
