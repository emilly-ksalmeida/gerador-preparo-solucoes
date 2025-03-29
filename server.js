import express from "express";
import {conectarAoBanco} from "./src/config/dbconfig.js";
import 'dotenv/config';
import cors from "cors";
import { ObjectId } from "mongodb";
import routes from "./src/routes/routes.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
const app = express();

async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); //nome do banco de dados: imersao-instabytes
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}


async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    //A função insertOne() é definida na documentação do MongoDB, cada banco de dados irá informar como se usa
    return colecao.insertOne(novoPost);
};



async function atualizarPost(idPesquisa, conteudoParaAtualizar) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    //PAra passar o id do post, o mongoDB define que seja da seguinte forma:
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:conteudoParaAtualizar});
};

async function deletar(idPesquisa) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.deleteOne({_id: new ObjectId(objID)});
};




async function pesquisar(idPesquisa){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.findOne({_id: new ObjectId(objID)});
  
}



app.use(cors());//utilizando desta forma, o servidor irá aceitar requisições de API de qualquer origem.
app.use(express.json()); //é necessário adicionar essa parte para que req possam ser passadas com body no formato de arquivo json

routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});