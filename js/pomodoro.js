const botaoStart = document.getElementById("botao-start");
const botaoReset = document.getElementById("botao-reset");
const timer = document.getElementById("timer");

botaoStart.addEventListener("click", function () {
  if (timer.innerText === "00:00") {
    tocarSom("audio/botao.mp3");
    let segundos = 0;
    let interval = setInterval(function () {
      segundos += 1;
      let minutos = Math.floor(segundos / 60);
      minutosDisplay = minutos;
      segundosDisplay = segundos % 60;

      if (segundosDisplay < 10) segundosDisplay = `0${segundosDisplay}`;

      if (minutosDisplay < 10) minutosDisplay = `0${minutos}`;

      timer.innerText = `${minutosDisplay}:${segundosDisplay}`;

      if (minutos >= 25) {
        clearInterval(interval);
        tocarSom("audio/alarme.mp3");
        timer.innerText = "00:00";
      }
    }, 1000);
  }
});
botaoReset.addEventListener("click", function () {
  location.reload();
});

function tocarSom(som) {
  let audio = new Audio(som);
  audio.play();
}
