const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const UserData = require("./models/attributeSchema");

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.amyx5o1.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexão com o MongoDB bem-sucedida!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

app.get("/", (request, response) => {
  return response.json({ Ping: "Pong" });
});

app.listen(PORT, () =>
  console.log("Servidor foi iniciado com sucesso em http://localhost:" + PORT)
);

// ---------------- CRUD
// Criando uma ficha
app.post("/userData", async (req, res) => {
    try {
      const data = await UserData.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar registro." });
    }
  });
// Retornando todas as fichas
  app.get("/userData", async (req, res) => {
    try {
      const data = await UserData.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar registros." });
    }
  });

//Retornando uma só ficha
app.get("/userData/:id", async (req, res) => {
    try {
      const data = await UserData.findById(req.params.id);
      if (!data) {
        return res.status(404).json({ error: "Item não encontrado." });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar registro." });
    }
  });
// Atualizando os dados de uma ficha
app.put("/userData/:id", async (req, res) => {
    try {
      const data = await UserData.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({ error: "Item não encontrado." });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar registro." });
    }
  });

// Deletando uma ficha
  app.delete("/userData/:id", async (req, res) => {
    try {
      const data = await UserData.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(404).json({ error: "Item não encontrado." });
      }
      res.json({ message: "Item deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar registro." });
    }
  });