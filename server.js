import express from "express";
import conectarAoBanco from "./dbconfig";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
const app = express();

app.listen(3000, () => {
    console.log("Servidor escutando...");
});