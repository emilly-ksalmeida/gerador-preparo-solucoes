import express from "express";
import {pesquisaPorId, postarNovoPost, atualizarNovoPost, deletarPost} from "../controllers/controllers.js";
import { getTodosPosts } from "../models/models.js";
import cors from "cors";

const routes = (app) => {
    app.use(express.urlencoded({ extended: true }));// Middleware do Express que faz o parsing de dados enviados via formulário (application/x-www-form-urlencoded), isso permite acessar os campos do formulário usando req.body
    app.use(cors());//utilizando desta forma, o servidor irá aceitar requisições de API de qualquer origem.
    app.use(express.json()); //é necessário adicionar essa parte para que req possam ser passadas com body no formato de arquivo json

    app.get("/home", (req, res) =>{
        res.render("index");
    });
    app.get("/paginaCalc", (req, res) =>{
        res.render("paginacalc");
    });

    app.get("/posts", async (req, res) => {
        const posts = await getTodosPosts();
        res.status(200).json(posts);
    });
    
    app.get("/1post/:idPesquisa", pesquisaPorId);
    
    app.post("/posts", postarNovoPost);

    app.post("/rota-teste-form", (req, res)=> {
        let respostaFormulario = req.body;
        console.log(respostaFormulario);
        res.send(respostaFormulario);
    })
    
    app.put("/upload/:idPesquisa", atualizarNovoPost);
    
    app.delete("/delete-dado/:idPesquisa", deletarPost);
};

export default routes;//exportando routes