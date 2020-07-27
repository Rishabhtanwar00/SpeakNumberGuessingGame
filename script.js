const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log(randomNum)

window.SpeechRecognition =window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition
recognition.start();

//capture user voice
function onSpeak(e){
    const msg = e.results[0][0].transcript;
    
    writeMessage(msg);
    checkNumber(msg);
}

// write message
function writeMessage(msg){
    msgEl.innerHTML=`
        <div class="">You said: </div>
        <span class="box">${msg}</span>
    `;
}

//check message
function checkNumber(msg){
    const num = +msg;

    // check if a valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<p class="suggestion">This is not a valid number</p>'
    }

    //check in range
    if(num>100 || num<1){
        msgEl.innerHTML += '<p class="suggestion">Number must be between 1 - 100 </p>'
    }

    //check number
    if(num === randomNum){
        document.body.innerHTML=`
        <h2>Congrats! you have guessed the number!</h2><br><br>
        <div class="answer">It was ${num}</div>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    }
    else if(num>randomNum){
        msgEl.innerHTML += '<p class="suggestion">Go Lower</p>';
    }
    else{
        msgEl.innerHTML += '<p class="suggestion">Go Higher</p>';
    }
} 

function getRandomNumber(){
    return Math.floor(Math.random() * 100) +1;
}

//speak result
recognition.addEventListener('result',onSpeak);

//to play continuesly
recognition.addEventListener('end',() => recognition.start());

//to play again
document.body.addEventListener('click', e =>{
    if(e.target.id === 'play-again'){
        window.location.reload();
    }
})