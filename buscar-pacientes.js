var botao = document.querySelector("#buscar-pacientes");
var form = document.querySelector("#form-adiciona");
var mensagemErro = document.querySelector("#mensagem");
botao.addEventListener("click", function(){
    console.log("Botão BUSCAR PACIENTES clicado!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/paciientes");
    xhr.addEventListener("load", function(){
        if(xhr.status == 200){
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            pacientes.forEach(paciente => {
                adicionaPaciente(paciente, form, mensagemErro);
            });
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            var erro = document.querySelector("#erro-ajax");
            erro.classList.remove("invisivel");
        }

    });
    xhr.send();
});