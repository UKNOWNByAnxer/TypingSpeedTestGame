const typingText = document.querySelector('.typing-text p');
const inpField = document.querySelector(".wrapper .input-field")
const mistakeTag = document.querySelector(".mistake span")
const timeTag = document.querySelector(".time span b")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")
const tryAgainBtn = document.querySelector(".content button")


let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping =0;

function RandomParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randomIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`
    typingText.innerHTML += spanTag;
  })
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus())
  document.addEventListener("click", () => inpField.focus())
}

function initTyping() {
  const characters = typingText.querySelectorAll('span');
  let typedChar = inpField.value.split("")[charIndex];
  if(charIndex < characters.length - 1 && timeLeft > 0){
    if(!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if(typedChar == null){  
      charIndex--;
      if(characters[charIndex].classList.contains("incorrect")) mistakes--;
      characters[charIndex].classList.remove("correct", "incorrect");  
    } else {
      if(characters[charIndex].innerHTML === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
  
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60)
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer)
  }
}

function initTimer() {
  if(timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}

function resetGame() {
  RandomParagraph();
  inpField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
}

RandomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);