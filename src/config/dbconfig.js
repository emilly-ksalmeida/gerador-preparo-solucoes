//Módulo padrão para conexão com banco de dados mongoDB
import { MongoClient } from 'mongodb';

export async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
};
