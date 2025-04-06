import express from "express";
import routes from "./src/routes/routes.js";

const app = express();

app.set("views", new URL("src/views", import.meta.url).pathname);// Define a pasta onde estão os arquivos de visualização (templates), forma compatível com ES6 modules.

app.set("view engine", "ejs");// Define o motor de template a ser usado (neste caso, EJS)
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});