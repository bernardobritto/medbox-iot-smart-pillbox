const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const ip = "192.168.106.168"; // Ajuste para o IP correto da sua rede quando for testar
// const ip = "192.168.15.5";
// const ip = "172.20.10.5";

app.use(express.json());

// Definição do Model
const Medicamento = mongoose.model("Medicamento", {
  nome: String,
  primeiraData: {
    type: Date,
    default: Date.now,
  },
  qtdMedicamentoDiario: Number,
  qtdMedicamentoAdd: Number,
  compartimento: Number,
});

// Buscar todos os medicamentos
app.get("/Medicamento", async (req, res) => {
  const medicamentos = await Medicamento.find();
  res.send(medicamentos);
});

// Criar um novo medicamento
app.post("/Medicamento", async (req, res) => {
  const medicamento = new Medicamento({
    nome: req.body.nome,
    primeiraData: req.body.primeiraData,
    qtdMedicamentoDiario: req.body.qtdMedicamentoDiario,
    qtdMedicamentoAdd: req.body.qtdMedicamentoAdd,
    compartimento: req.body.compartimento,
  });
  
  await medicamento.save();
  return res.send(medicamento);
});

// Deletar um medicamento
app.delete("/Medicamento/:id", async (req, res) => {
  const medicamento = await Medicamento.findByIdAndDelete(req.params.id);
  return res.send(medicamento);
});

// Buscar um medicamento específico por ID
app.get("/Medicamento/:id", async (req, res) => {
  const medicamento = await Medicamento.findById(req.params.id); 
  return res.send(medicamento);
});

// Atualizar um medicamento
app.put("/Medicamento/:id", async (req, res) => {
  const medicamento = await Medicamento.findByIdAndUpdate(
    req.params.id, 
    {
      nome: req.body.nome,
      primeiraData: req.body.primeiraData,
      qtdMedicamentoDiario: req.body.qtdMedicamentoDiario,
      qtdMedicamentoAdd: req.body.qtdMedicamentoAdd,
      compartimento: req.body.compartimento,
    },
    { new: true } 
  );
  
  return res.send(medicamento);
});

// Conectar ao banco e iniciar o servidor
mongoose.connect("mongodb+srv://MONGO_URI=YOUR_MONGO_URI")
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    app.listen(port, ip, () => {
      console.log(`App running on http://${ip}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
  });