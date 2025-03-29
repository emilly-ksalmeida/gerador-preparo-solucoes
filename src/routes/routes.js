import express from "express";

const routes = (app) => {
    app.get("/posts", async (req, res) => {
        const posts = await getTodosPosts();
        res.status(200).json(posts);
    });
    
    app.get("/1post/:idPesquisa", pesquisaPorId);
    
    app.post("/posts", postarNovoPost);
    
    app.put("/upload/:idPesquisa", atualizarNovoPost);
    
    app.delete("/delete-dado/:idPesquisa", deletarPost);
};

export default routes;//exportando routes