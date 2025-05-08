let identificadorParaAtualizacao = document.querySelector("#nome-identificador");
let identificadorParaApagar = document.querySelector("#nome-apagar");

async function enviarAtualizacao(dados) {
    const identificador = identificadorParaAtualizacao.value;
    const headers = {
        "Content-Type": "application/json",
    };

    const linkParaAtualizacao = `http://localhost:3000/atualizar/${identificador}`;
    const initPut = {       
        method: "PUT",
        headers: headers,
        body: JSON.stringify(dados)
    };

    try {
        const requisicao = await fetch(linkParaAtualizacao,
        initPut
        );
        return requisicao.status;
           
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};
async function apagarDadoInformado(){
    const identificador = identificadorParaApagar.value;
    const headers = {
        "Content-Type": "application/json",
    };

    const linkParaApagar = `http://localhost:3000/apagar/${identificador}`;
    const initDelete = {       
        method: "DELETE",
        headers: headers
    };

    try {
        const requisicao = await fetch(linkParaApagar,
        initDelete
        );
        return requisicao.status;
           
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

document.getElementById("formulario-atualizar").addEventListener("submit", async function(evento) {
   
    evento.preventDefault(); // Impede o envio do formulário
  
    const formData = new FormData(this); // "this" é o formulário
    const dados = Object.fromEntries(formData.entries()); // Converte em objeto
    const dadosEnviados = await enviarAtualizacao(dados);
    console.log(dadosEnviados);
  });

  document.getElementById("formulario-apagar").addEventListener("submit", async function(evento) {
   
    evento.preventDefault(); // Impede o envio do formulário
    const dadosEnviados = await apagarDadoInformado();
    console.log(dadosEnviados);
  });