import express from "express";
import conectarAoBanco from "./dbconfig";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
const app = express();

async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); //nome do banco de dados: imersao-instabytes
    const colecao = db.collection("posts");
    return colecao.find().toArray();

}

//Esta rota retorna todos os posts
app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
});

app.listen(3000, () => {
    console.log("Servidor escutando...");
});