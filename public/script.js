let compostoSelecinadoFormulario = document.querySelector("#composto");

let concMolarFormulario = document.querySelector("#concentracao");

let volumeTotalFormulario = document.querySelector("#volumeTotal");

let espacoParaResultado = document.querySelector("#espacoResultado");
espacoParaResultado.innerHTML = "";

let compostoSelecionado;
let teorRotulado;
let densidadeComposto;
let massaMolarComposto;
let volumeParaPipetarFinal;
let conteudo = [];

//Solicitação ao banco de dados
async function listarCompostos(){
  
  try {
   //const listaDeDados = "bancoDados.json";

   const response = await fetch("http://localhost:3000/posts"); //GET para a rota do servidor indicada, o fetch faz por padrão o GET quando não é especificado um método
 
   if(response.status !==200) throw new Error("ocorreu um erro");
 
   conteudoTotal = await response.json();
  } 
     catch(erro){
         alert(erro);
         return;
     }
     return conteudoTotal;
   };

   function buscar(conteudo) {
    
    compostoSelecionado = compostoSelecinadoFormulario.value;
  
    conteudo.forEach((item, index) => {
      if (item.nome === compostoSelecionado) {
        let objSelecionadoNaLista = conteudo[index];
        teorRotulado = objSelecionadoNaLista["rotulado"];
        densidadeComposto = objSelecionadoNaLista["densidade"];
        massaMolarComposto = objSelecionadoNaLista["peso"];
      }
    });
  }

async function calcular(){

  conteudo = await listarCompostos();

  buscar(conteudo);

  let concMolarInput = Number(concMolarFormulario.value);

  let volumeTotalInput = Number(volumeTotalFormulario.value);

  volumeParaPipetarFinal =(concMolarInput *
    massaMolarComposto *
    (volumeTotalInput / 1000) *
    (100 / teorRotulado) *
    (1 / densidadeComposto)).toFixed(2);

    espacoParaResultado.innerHTML += `<p>Para preparar ${compostoSelecionado} a ${concMolarInput} M é preciso pipetar ${volumeParaPipetarFinal} mL de ${compostoSelecionado} ${teorRotulado}% e completar o volume até ${volumeTotalInput} mL.</p>`;
}
