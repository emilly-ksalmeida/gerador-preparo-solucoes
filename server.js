import express from "express";
import routes from "./src/routes/routes.js";

const app = express();

app.set("views", new URL("src/views", import.meta.url).pathname);// Define a pasta onde estão os arquivos de visualização (templates), forma compatível com ES6 modules.

app.set("view engine", "ejs");// Define o motor de template a ser usado (neste caso, EJS)

app.use(express.static(new URL("public", import.meta.url).pathname));// Configura o Express para servir arquivos estáticos (como CSS, imagens, JS) da pasta "public". O caminho absoluto é gerado com ES6 usando import.meta.url.

routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});