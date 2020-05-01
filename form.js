var botaoAdicionar = document.querySelector("#adicionar-paciente");
var erros = [];
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    limpaArray(erros);
    var form = document.querySelector("#form-adiciona");
    var paciente = getPacienteDoForm(form);
    var repostaAlturaValida = alturaEhValida(paciente) ? true : erros.push("\n Altura inválida!");
    var repostaPesoValido = pesoEhValido(paciente) ? true : erros.push("\n Peso inválido!");
    var campoNomeVazio = paciente.nome.length == 0 ? erros.push("\n Campo nome vazio!") : false;
    var campoGorduraVazio = paciente.gordura.length == 0 ? erros.push("\n Campo Gordura vazio!") : false;
    var mensagemErro = document.querySelector("#mensagem");

    if (alturaEhValida(paciente) && pesoEhValido(paciente) && !campoNomeVazio && !campoGorduraVazio) {
        adicionaPaciente(paciente, form, mensagemErro);
    } else if (!alturaEhValida(paciente) || !pesoEhValido(paciente) || campoNomeVazio || campoGorduraVazio) {
        exibirMensagensDeErro(erros, mensagemErro);
    }

    erros.forEach(function (erro) {
        console.log(erro);
    })

});

function getPacienteDoForm(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    montaTd("info-nome", paciente.nome, pacienteTr);
    montaTd("info-peso", paciente.peso, pacienteTr);
    montaTd("info-altura", paciente.altura, pacienteTr);
    montaTd("info-gordura", paciente.gordura, pacienteTr);
    montaTd("info-imc", paciente.imc, pacienteTr);
    return pacienteTr;
}

function montaTd(classe, dado, pacienteTr) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;
    pacienteTr.appendChild(td);
    return td;
}

function alturaEhValida(paciente) {
    if (paciente.altura > 0.3 && paciente.altura < 2.25) {
        return true;
    }
}

function pesoEhValido(paciente) {
    if (paciente.peso > 5 && paciente.peso < 300) {
        return true;
    }
}

function exibirMensagensDeErro(erros, mensagemErro) {
    mensagemErro.textContent = erros;
    mensagemErro.classList.add("mensagem-erro");
}

function limpaArray(lista) {
    for (i = 0; i <= lista.length; i++) {
        lista.pop();
    }
}

function adicionaPaciente(paciente, form, mensagemErro) {
    var pacienteTr = montaTr(paciente);
    var tabelaPacientes = document.querySelector("#tabela-pacientes");
    tabelaPacientes.appendChild(pacienteTr);
    form.reset();
    mensagemErro.textContent = "";
}

