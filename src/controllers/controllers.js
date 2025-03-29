import {criarPost, atualizarPost, deletar, pesquisar} from "../models/models.js";

export async function postarNovoPost (req, res) {
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

export async function atualizarNovoPost (req, res) {
    //Como o id vai ser passado na rota, deve usar params. Esse id usado deve ser o insertedId que o mongoDB cria.
    
        const idPesquisa = req.params.idPesquisa;
        const conteudoParaAtualizar = req.body;

        try {
            const postAtualizar = await atualizarPost(idPesquisa, conteudoParaAtualizar);
            res.status(200).json(postAtualizar);
        } catch(erro) {
            console.error(erro.message);
            res.status(500).json({"Erro":"Falha na requisição"})
        }
};

export async function deletarPost(req, res) {
        const idPesquisa = req.params.idPesquisa;
    
        try{
            const deletando = await deletar(idPesquisa);
            res.status(200).json(deletando);
    
        } catch(erro){
            console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição"})
        }
};

export async function pesquisaPorId(req, res) {
    const idPesquisa = req.params.idPesquisa;
    try {
        const itemPesquisado = await pesquisar(idPesquisa);
        res.status(200).json(itemPesquisado);
        
    }catch(erro){
        console.error(erro.message);
            res.status(500).json({"Erro":"Falha na requisição"})
    }
};