const horasX = document.querySelector("#hours");
const minutosX = document.querySelector("#minutes");
const segundosX = document.querySelector("#seconds");
const btnInicio = document.querySelector(".btn-start-resume");
const btnPausa = document.querySelector(".btn-pause");
const btnDetener = document.querySelector(".btn-stop");
const btnReset = document.querySelector(".btn-reset");
let intervalintervalo;
let pause = false;
let totalSeconds = 0;
let totalSecondsBackup = 0;

init();

function init() {
    btnPausa.style.display = "none";
    btnDetener.style.display = "none";
    btnReset.style.display = "none";

    btnInicio.addEventListener("click", () => {
        const hours = parseInt(horasX.value);
        const minutes = parseInt(minutosX.value);
        const seconds = parseInt(segundosX.value);

        totalSecondsBackup = totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        if (totalSeconds < 0) {
            return;
        }

        startTimer();

        btnPausa.style.display = "inline-block";
        btnDetener.style.display = "inline-block";
        btnReset.style.display = "inline-block";
        btnInicio.style.display = "none";
    });

    btnPausa.addEventListener("click", () => {
        pause = !pause;
        if (pause) {
            btnPausa.innerText = "Resume";
        } else {
            btnPausa.innerText = "Pause";
        }
    });

    btnDetener.addEventListener("click", () => {
        stopTimer();
        totalSeconds = totalSecondsBackup;
        pause = false;
        updateInputs();

        btnPausa.style.display = "none";
        btnDetener.style.display = "none";
        btnReset.style.display = "none";
        btnInicio.style.display = "";
    });

    btnReset.addEventListener("click", () => {
        totalSeconds = totalSecondsBackup;
        updateInputs();
    });
}

function startTimer() {
    intervalo = setInterval(() => {
        if (pause) return;
        totalSeconds--;
        updateInputs();

        if (totalSeconds <= 0) {
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    intervalo = clearInterval(intervalo);
}

function updateInputs() {
    const hours = Math.floor(totalSeconds / 60 / 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    horasX.value = hours;
    minutosX.value = minutes;
    segundosX.value = seconds;
}
