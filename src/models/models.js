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

export async function atualizarPost(identificador, atualizacao) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.updateOne({nome: identificador}, {$set: atualizacao});
};

export async function deletar(identificador) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.deleteOne({nome: identificador});
};

export async function pesquisar(idPesquisa){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(idPesquisa);
    return colecao.findOne({_id: new ObjectId(objID)});
  
};