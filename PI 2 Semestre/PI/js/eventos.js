const eventos = [
    {
        imagem: "logos/iconePng.png",
        texto: "Lorem ipsum dolor sit amet."
    },
    {
        imagem: "logos/iconeGrade.png",
        texto: "Descrição da segunda imagem/evento."
    },
    {
        imagem: "logos/iconeMonocromatico.png",
        texto: "Descrição da terceira imagem/evento."
    }
];

let index = 0;

const imagem = document.getElementById("imagemEvento");
const texto = document.getElementById("textoCarrossel");
const btnProximo = document.querySelector(".btnProximo");
const btnAnterior = document.querySelector(".btnAnterior");

function atualizarEvento() {
    imagem.src = eventos[index].imagem;
    texto.textContent = eventos[index].texto;
}

function proximoEvento() {
    index++;

    if (index >= eventos.length) {
        index = 0;
    }

    atualizarEvento();
}

function eventoAnterior() {
    index--;

    if (index < 0) {
        index = eventos.length - 1;
    }

    atualizarEvento();
}

btnProximo.addEventListener("click", proximoEvento);
btnAnterior.addEventListener("click", eventoAnterior);

// Troca automaticamente a cada 5 segundos
setInterval(proximoEvento, 3000);

atualizarEvento();