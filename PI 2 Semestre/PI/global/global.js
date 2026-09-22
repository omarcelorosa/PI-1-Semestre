const raiz = new URL("../", document.querySelector('script[src*="global.js"]').src);
fetch(new URL("header.html", raiz + "global/"))
    .then(res => res.text())
    .then(data => {

        document.getElementById("header").innerHTML = data;

        const logo = document.querySelector("#header .logo");
        const iconeLogin = document.querySelector("#header .icons img");

        logo.src = new URL("logos/headerV2.png", raiz);
        iconeLogin.src = new URL("logos/loginIcon.png", raiz);


        document.getElementById("menuOp").addEventListener("click", () => {

            const menu = document.getElementById("menu");

            if (menu.style.display === "block") {
                menu.style.display = "none";
            } else {
                menu.style.display = "block";
            }

        });

    });


const menu = document.getElementById("menu");
const tipoMenu = menu.dataset.tipo;

if (tipoMenu === "simples") {
    fetch(new URL("menuSimples.html", raiz + "global/"))
        .then(res => res.text())
        .then(data => {
            menu.innerHTML = data;
        });
}

if (tipoMenu === "completo") {
    fetch(new URL("menuCompleto.html", raiz + "global/"))
        .then(res => res.text())
        .then(data => {
            menu.innerHTML = data;
        });
}


fetch(new URL("footer.html", raiz + "global/"))
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;

        const date = new Date();
        document.getElementById("ano").textContent = date.getFullYear();
    });


if (document.getElementById("estado")) {

    const estado = document.getElementById("estado");
    const cidade = document.getElementById("cidade");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(estados => {

            estados.forEach(estadoItem => {

                const option = document.createElement("option");

                option.value = estadoItem.sigla;
                option.textContent = estadoItem.nome;

                estado.appendChild(option);

            });

        });


    estado.addEventListener("change", (event) => {

        const uf = estado.value;
        const cidadeCep = event.detail;

        if (!cidadeCep) {
            cep.value = "";
            endereco.value = "";
        }

        cidade.innerHTML = '<option value="" hidden>Selecione uma Cidade *</option>';

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
            .then(res => res.json())
            .then(cidades => {

                cidades.forEach(cidadeItem => {

                    const option = document.createElement("option");

                    option.value = cidadeItem.id;
                    option.textContent = cidadeItem.nome;

                    cidade.appendChild(option);

                });

                if (cidadeCep) {
                    cidade.value = cidades.find(
                        cidadeItem => cidadeItem.nome === cidadeCep
                    )?.id || "";
                }

            });

    });


    cidade.addEventListener("change", () => {

        cep.value = "";
        endereco.value = "";

    });


    cep.addEventListener("blur", () => {

        const valorCep = cep.value.replace(/\D/g, "");

        if (valorCep.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
            .then(res => res.json())
            .then(dados => {

                if (dados.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                endereco.value = dados.logradouro;

                estado.value = dados.uf;

                estado.dispatchEvent(
                    new CustomEvent("change", {
                        detail: dados.localidade
                    })
                );

            });

    });

}