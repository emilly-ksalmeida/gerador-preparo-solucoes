import {conectarAoBanco} from "../config/dbconfig.js";
import { ObjectId } from "mongodb";
import 'dotenv/config';

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); //nome do banco de dados: imersao-instabytes
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    //A função insertOne() é definida na documentação do MongoDB, cada banco de dados irá informar como se usa
    return colecao.insertOne(novoPost);
};

export async function atualizarPost(idPesquisa, conteudoParaAtualizar) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    //PAra passar o id do post, o mongoDB define que seja da seguinte forma:
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:conteudoParaAtualizar});
};

export async function deletar(idPesquisa) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.deleteOne({_id: new ObjectId(objID)});
};

export async function pesquisar(idPesquisa){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.findOne({_id: new ObjectId(objID)});
  
};