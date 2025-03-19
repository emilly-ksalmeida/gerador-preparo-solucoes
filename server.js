import express from "express";
import {conectarAoBanco} from "./dbconfig.js";
import 'dotenv/config';
import cors from "cors";

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

async function postarNovoPost (req, res) {
    //o conteudo da requisição fica dentro da parte body
    const novoPost = req.body;
    
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
};

app.use(cors());
app.use(express.json()); //é necessário adicionar essa parte para que req possam ser passadas com body no formato de arquivo json

app.post("/posts", postarNovoPost);

//Esta rota retorna todos os posts
app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
});

app.listen(3000, () => {
    console.log("Servidor escutando...");
});