const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// Permitir receber JSON no corpo das requisições

app.use(cors());
app.use(express.json());

// Servir os arquivos estáticos (index.html e assets do Vue)
app.use(express.static(path.join(__dirname, "dist")));

// Rotas
app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const { badRequest, created } = require("./responseHelpers");

app.post("/registration", (req, res) => {
  const data = req.body;

  const { email, tipo, telefone, senha } = data;

  if (!email || !tipo || !telefone || !senha) {
    return badRequest(
      res,
      "Campos obrigatórios ausentes: email, tipo, telefone ou senha."
    );
  }

  if (tipo === "pf") {
    const { nome, cpf, dataNascimento } = data;
    if (!nome || !cpf || !dataNascimento) {
      return badRequest(
        res,
        "Campos obrigatórios para pessoa física: nome, cpf, dataNascimento."
      );
    }
  } else if (tipo === "pj") {
    const { razaoSocial, cnpj, dataAbertura } = data;
    if (!razaoSocial || !cnpj || !dataAbertura) {
      return badRequest(
        res,
        "Campos obrigatórios para pessoa jurídica: razaoSocial, cnpj, dataAbertura."
      );
    }
  } else {
    return badRequest(res, 'Tipo inválido: deve ser "pf" ou "pj".');
  }

  return created(res, "Cadastro realizado com sucesso!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
