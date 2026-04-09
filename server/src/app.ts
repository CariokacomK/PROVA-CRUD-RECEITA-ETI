import express from "express"
import cors from "cors"
import ingrediente from "./ingrediente/ingrediente.routes.js";
import receita from "./receita/receita.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(ingrediente);
app.use(receita);