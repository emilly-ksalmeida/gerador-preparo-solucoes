import express from "express";
import routes from "./src/routes/routes.js";
import path from "path";

const app = express();
app.set("views", path.resolve(__dirname, "src", "views"));// Define a pasta onde estão os arquivos de visualização (templates)
app.set("view engine", "ejs");// Define o motor de template a ser usado (neste caso, EJS)
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});