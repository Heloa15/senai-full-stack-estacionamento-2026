const form = document.getElementById("form-estacionamento");
const listaCarros = document.getElementById("lista-carros");

const formEstadia = document.getElementById("form-estadia");
const listaEstadias = document.getElementById("lista-estadias");

const placaInput = document.getElementById("placa");
const proprietarioInput = document.getElementById("proprietario");
const tipoInput = document.getElementById("tipo");
const modeloInput = document.getElementById("modelo");
const marcaInput = document.getElementById("marca");
const corInput = document.getElementById("cor");
const anoInput = document.getElementById("ano");
const telefoneInput = document.getElementById("telefone");
const valorHoraInput = document.getElementById("valorHora");

const placaEstadiaInput =
    document.getElementById("placaEstadia");

const entradaInput =
    document.getElementById("entrada");

const saidaInput =
    document.getElementById("saida");

const valorTotalInput =
    document.getElementById("valorTotal");

let carros =
    JSON.parse(localStorage.getItem("carros")) || [];

let estadias =
    JSON.parse(localStorage.getItem("estadias")) || [];

let editando = false;
let indiceEdicao = null;

function salvarDados() {

    localStorage.setItem(
        "carros",
        JSON.stringify(carros)
    );

    localStorage.setItem(
        "estadias",
        JSON.stringify(estadias)
    );
}

function listarCarros() {

    listaCarros.innerHTML = "";

    if (carros.length === 0) {

        listaCarros.innerHTML = `
            <li>
                Nenhum veículo cadastrado.
            </li>
        `;

        return;
    }

    carros.forEach((carro, index) => {

        const li = document.createElement("li");

        li.innerHTML = `

            <div
                class="topo-card"
                onclick="toggleDetalhes(this)"
            >
                🚗 ${carro.modelo} - ${carro.placa}
            </div>

            <div class="detalhes-auto">

                <p>
                    <strong>Proprietário:</strong>
                    ${carro.proprietario}
                </p>

                <p>
                    <strong>Tipo:</strong>
                    ${carro.tipo}
                </p>

                <p>
                    <strong>Modelo:</strong>
                    ${carro.modelo}
                </p>

                <p>
                    <strong>Marca:</strong>
                    ${carro.marca}
                </p>

                <p>
                    <strong>Cor:</strong>
                    ${carro.cor}
                </p>

                <p>
                    <strong>Ano:</strong>
                    ${carro.ano}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${carro.telefone}
                </p>

                <p>
                    <strong>Valor/Hora:</strong>
                    R$ ${Number(carro.valorHora).toFixed(2)}
                </p>

                <div class="acoes">

                    <button onclick="editarCarro(${index})">
                        Atualizar
                    </button>

                    <button
                        class="remover"
                        onclick="removerCarro(${index})"
                    >
                        Excluir
                    </button>

                </div>

            </div>
        `;

        listaCarros.appendChild(li);
    });
}

function listarEstadias() {

    listaEstadias.innerHTML = "";

    if (estadias.length === 0) {

        listaEstadias.innerHTML = `
            <li>
                Nenhuma estadia registrada.
            </li>
        `;

        return;
    }

    estadias.forEach((estadia) => {

        const li = document.createElement("li");

        li.innerHTML = `

            <div class="card-estadia">

                <h3>
                    🅿️ ${estadia.placa}
                </h3>

                <p>
                    <strong>Entrada:</strong>
                    ${estadia.entrada}
                </p>

                <p>
                    <strong>Saída:</strong>
                    ${estadia.saida}
                </p>

                <p>
                    <strong>Valor/Hora:</strong>
                    R$ ${Number(estadia.valorHora).toFixed(2)}
                </p>

                <p>
                    <strong>Total:</strong>
                    R$ ${Number(estadia.valorTotal).toFixed(2)}
                </p>

            </div>
        `;

        listaEstadias.appendChild(li);
    });
}

function toggleDetalhes(elemento) {

    const detalhes =
        elemento.nextElementSibling;

    detalhes.classList.toggle("mostrar");
}

function calcularValorEstadia() {

    const placa =
        placaEstadiaInput.value.trim().toUpperCase();

    const entrada =
        entradaInput.value;

    const saida =
        saidaInput.value;

    const carro = carros.find(
        carro => carro.placa === placa
    );

    if (!carro) {

        valorTotalInput.value =
            "Automóvel não encontrado";

        return;
    }

    if (entrada && saida) {

        const horas =
            (
                new Date(saida)
                -
                new Date(entrada)
            ) / (1000 * 60 * 60);

        const valorTotal =
            horas * carro.valorHora;

        valorTotalInput.value =
            `R$ ${valorTotal.toFixed(2)}`;
    }
}

placaEstadiaInput.addEventListener(
    "keyup",
    calcularValorEstadia
);

entradaInput.addEventListener(
    "change",
    calcularValorEstadia
);

saidaInput.addEventListener(
    "change",
    calcularValorEstadia
);

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const dados = {

        placa:
            placaInput.value.trim().toUpperCase(),

        proprietario:
            proprietarioInput.value.trim(),

        tipo:
            tipoInput.value.trim(),

        modelo:
            modeloInput.value.trim(),

        marca:
            marcaInput.value.trim(),

        cor:
            corInput.value.trim(),

        ano:
            anoInput.value,

        telefone:
            telefoneInput.value.trim(),

        valorHora:
            Number(valorHoraInput.value)
    };

    if (
        !dados.placa ||
        !dados.proprietario ||
        !dados.tipo ||
        !dados.modelo ||
        !dados.marca ||
        !dados.cor ||
        !dados.ano ||
        !dados.telefone ||
        !dados.valorHora
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editando) {

        carros[indiceEdicao] = dados;

        editando = false;

        indiceEdicao = null;

        form.querySelector("button").textContent =
            "Cadastrar";

        alert("Veículo atualizado!");
    }

    else {

        carros.push(dados);

        alert("Veículo cadastrado!");
    }

    salvarDados();

    listarCarros();

    form.reset();
});

formEstadia.addEventListener("submit", (e) => {

    e.preventDefault();

    const placa =
        placaEstadiaInput.value.trim().toUpperCase();

    const entrada =
        entradaInput.value;

    const saida =
        saidaInput.value;

    const carro = carros.find(
        carro => carro.placa === placa
    );

    if (!carro) {

        alert("Automóvel não encontrado!");

        return;
    }

    const horas =
        (
            new Date(saida)
            -
            new Date(entrada)
        ) / (1000 * 60 * 60);

    const valorTotal =
        horas * carro.valorHora;

    const estadia = {

        placa,

        entrada,

        saida,

        valorHora:
            carro.valorHora,

        valorTotal
    };

    estadias.push(estadia);

    salvarDados();

    listarEstadias();

    formEstadia.reset();

    valorTotalInput.value = "";

    alert("Estadia registrada!");
});

function removerCarro(index) {

    const confirmar = confirm(
        "Deseja excluir este veículo?"
    );

    if (confirmar) {

        carros.splice(index, 1);

        salvarDados();

        listarCarros();

        alert("Veículo removido!");
    }
}

function editarCarro(index) {

    const carro = carros[index];

    placaInput.value = carro.placa;
    proprietarioInput.value = carro.proprietario;
    tipoInput.value = carro.tipo;
    modeloInput.value = carro.modelo;
    marcaInput.value = carro.marca;
    corInput.value = carro.cor;
    anoInput.value = carro.ano;
    telefoneInput.value = carro.telefone;
    valorHoraInput.value = carro.valorHora;

    editando = true;

    indiceEdicao = index;

    form.querySelector("button").textContent =
        "Salvar";
}

listarCarros();
listarEstadias();