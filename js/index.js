const textoOperacaoPassada = document.querySelector("#operacao-passada");
const textoOperacaoAtual = document.querySelector("#operacao-atual");
const botoes = document.querySelectorAll("button");

let visor = document.getElementById("visor");

class Calculadora {
  constructor(textoOperacaoPassada, textoOperacaoAtual) {
    this.textoOperacaoPassada = textoOperacaoPassada;
    this.textoOperacaoAtual = textoOperacaoAtual;
    this.operacaoAtual = "";
    this.ligada = false;
  }

  // adiciona numeros no visor
  adicionarNumero(num) {
    if (this.textoOperacaoAtual.innerText.includes(".") && num === ".") return;

    this.operacaoAtual = num;
    this.atualizarVisor();
  }
  ligar() {
    if (this.ligada) {
      this.ligada = false;
      this.limparCalculadora();
      visor.style.backgroundColor = "#000";
      visor.style.boxShadow = "none";
    } else {
      this.ligada = true;
      visor.style.backgroundColor = "#9ef0f0";
      visor.style.boxShadow = "0 0 0.2em #fff inset";
    }
  }

  limparCalculadora() {
    this.textoOperacaoAtual.innerText = "";
    this.textoOperacaoPassada.innerText = "";
    this.operacaoAtual = "";
  }

  calcular(n1, n2, op) {
    let total = 0;
    switch (op) {
      case "+":
        total = n1 + n2;
        break;
      case "-":
        total = n1 - n2;
        break;
      case "x":
        total = n1 * n2;
        break;
      case "÷":
        total = n1 / n2;
        break;
    }
    return total;
  }

  // operacoes da calculadora
  processarOperacoes(op) {
    // checkando se o valor atual está vazio, logo trocaremos a operação
    if (op !== "C" && op !== "+/-" && op !== "<" && op !== "=") {
      if (this.textoOperacaoAtual.innerText === "") {
        if (this.textoOperacaoPassada.innerText !== "") {
          this.textoOperacaoPassada.innerText = `${
            this.textoOperacaoPassada.innerText.split(" ")[0]
          } ${op}`;
        }
        return;
      }
    }

    // pegando valores atuais e passados
    let valorOperacao;
    const passada = +this.textoOperacaoPassada.innerText.split(" ")[0];
    const atual = +this.textoOperacaoAtual.innerText;

    switch (op) {
      case "C":
        this.limparCalculadora();
        break;
      case "+/-":
        if (textoOperacaoAtual.innerText !== "") {
          this.atualizarVisor(0, op, atual, passada);
        }
        break;
      case "=":
        if (this.textoOperacaoPassada.innerText) {
          let opPassada = this.textoOperacaoPassada.innerText.split(" ")[1];
          valorOperacao = this.calcular(passada, atual, opPassada);
          this.atualizarVisor(valorOperacao, op, passada, atual);
        }
        break;
      case "<":
        this.atualizarVisor(atual, op, atual, passada);
        break;
      default:
        valorOperacao = this.calcular(passada, atual, op);
        this.atualizarVisor(valorOperacao, op, atual, passada);
        break;
    }
  }

  // mudar valor do visor
  atualizarVisor(
    valorOperacao = null,
    operacao = null,
    atual = null,
    passada = null
  ) {
    if (valorOperacao === null)
      this.textoOperacaoAtual.innerText += this.operacaoAtual;
    else {
      if (operacao === "=") {
        this.textoOperacaoPassada.innerText = "";
        this.textoOperacaoAtual.innerText = valorOperacao;
      } else if (operacao === "<") {
        if (this.operacaoAtual) {
          this.textoOperacaoAtual.innerText = this.textoOperacaoAtual.innerText.slice(0, -1);
        }
      } else if (operacao === "+/-") {
        this.textoOperacaoAtual.innerText = +this.textoOperacaoAtual.innerText * -1;
      } else {
        // checar se o valor é 0
        if (passada === 0) valorOperacao = atual;

        this.textoOperacaoPassada.innerText = `${valorOperacao} ${operacao}`;
        this.textoOperacaoAtual.innerText = "";
      }
    }
  }
}

let calc = new Calculadora(textoOperacaoPassada, textoOperacaoAtual);

botoes.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      if (calc.ligada) calc.adicionarNumero(value);
    } else {
      if (value === "ON") calc.ligar();
      else calc.processarOperacoes(value);
    }
  });
});
