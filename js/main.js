"use strict"
import wordsList from "./worldList.js"
const scoreDOM = document.querySelector(".score")
const timeLeft = document.querySelector(".time-left")
const refreshBtn = document.querySelector(".btn")
const messageDOM = document.querySelector(".message")
const wordDOM = document.querySelector(".word")
const typeInput = document.querySelector(".form-control");
const secondsDOM = document.querySelector(".seconds");


const levels = {
    easy: 5,
    medium: 3,
    hard: 1
  };
  
  const currentLevel = levels[Object.keys(levels)[Math.floor(Math.random()*Object.keys(levels).length)]];

  let timer = currentLevel, isPlaying, score = 0;

  
document.addEventListener('copy', function (e) {
    e.preventDefault();
    messageDOM.textContent = "Do not copy the word!!!"
    messageDOM.classList.toggle("text-danger")
    e.clipboardData.setData("text/plain", "");
})

window.addEventListener("DOMContentLoaded", function () {
    __init__()
})
function __init__() {
    secondsDOM.textContent = timer;
    showWord(wordsList);
    countDown();
    setInterval(checkState, 50)
    typeInput.addEventListener("keyup", function (e) {
        startMatching(e.target.value)
    })

}
typeInput.addEventListener("keyup", function () {
    setInterval(checkEndGame, 10)
})
function checkEndGame() {
    if (!isPlaying && timer === 0) {
        typeInput.disabled = true;
        refreshBtn.classList.replace("d-none", "d-flex");
    }
}
refreshBtn.addEventListener("click", function () {
    showWord(wordsList);
    resetGame();
    scoreDOM.textContent = 0;

})
function resetGame() {
    isPlaying = true;
    timer = currentLevel + 1;
    console.log(timer)
    typeInput.disabled = false;
    messageDOM.textContent = "Start playing";
    messageDOM.classList.remove("text-danger", "text-success");
    typeInput.value = "";
    refreshBtn.classList.replace("d-flex", "d-none");
    secondsDOM.textContent = timer;

}
function get_random(list) {
    return list[Math.floor((Math.random() * list.length))];
}
function showWord(wordsList) {
    const randomWord = get_random(wordsList);
    wordDOM.textContent = randomWord
}
function countDown() {
    if (timer > 0) timer--;
    else if (timer === 0) isPlaying = false;
    timeLeft.textContent = timer;
    setTimeout(countDown, 1000)
}
function checkState() {
    if (!isPlaying && timer === 0) {
        score = 0;
        messageDOM.textContent = "Game is Over && You Need To Enter Refresh Button";
        messageDOM.classList.add("text-danger")
        refreshBtn.classList.replace("d-none", "d-flex");

    }
}
function startMatching(currentWord) {
    if (matchWord(currentWord)) {
        showWord(wordsList);
        resetGame();
        score++;
    }
    scoreDOM.textContent = score;

}
function matchWord(currentWord) {
    if (currentWord.toLowerCase() === wordDOM.textContent.toLowerCase()) {
        messageDOM.textContent = "Correct";
        messageDOM.classList.add("text-success")
        return true;
    }
    else {
        messageDOM.textContent = "";
        return false;

    }
}