const botaoStart = document.getElementById("botao-start");
const botaoReset = document.getElementById("botao-reset");
const timer = document.getElementById("timer");
const modo = document.getElementById("modo");
const numeroSessoes = document.getElementById("sessoes");

function pomodoro(){
    let segundos = 0;
    let tempo = 25;
    let sessoes = 0;
    setInterval(function () {
    segundos += 1;
    let minutos = Math.floor(segundos / 60);
    minutosDisplay = minutos;
    segundosDisplay = segundos % 60;

    if (segundosDisplay < 10) segundosDisplay = `0${segundosDisplay}`;
    if (minutosDisplay < 10) minutosDisplay = `0${minutos}`;
    
    console.log(`${minutosDisplay}:${segundosDisplay}`)
    timer.innerText = `${minutosDisplay}:${segundosDisplay}`;

    if (minutos >= tempo) {  
      tocarSom("audio/alarme.mp3");
      if(tempo === 25)
      {
        tempo = 5;
        modo.style.marginLeft = '5%';
        modo.innerText = "Descanso";
      }
      else
       {
        tempo = 25;
        modo.innerText = "Trabalho";
        modo.style.marginLeft = '10%';
        numeroSessoes.textContent = ++sessoes;
       }
      segundos = 0;
      timer.innerText = "00:00";
    }
  }, 1000);
}

function tocarSom(som) {
  let audio = new Audio(som);
  audio.play();
}

botaoStart.addEventListener("click",function () {
  if (timer.innerText === "00:00") {
    tocarSom("audio/botao.mp3");
    pomodoro();
}
});
botaoReset.addEventListener("click", function () {
  location.reload();
});