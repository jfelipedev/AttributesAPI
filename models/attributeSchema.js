const { Schema, model } = require("mongoose");
const attributeSchema = new Schema({
  nome: String,
  imgURL: String,
  classe: String,
  level: Number,
  life: Number,
  mana: Number,
  exp: Number,
  forca: Number,
  destreza: Number,
  vitalidade: Number,
  inteligencia: Number,
  defesa: Number,
  habilidade: Number,
  sabedoria: Number,
  backpack: String,
  gp: Number,
  platinum: Number,
  crystal: Number,
  vantagens: String,
  desvantagens: String,
  historia: String,
  anotacoes: String,
  set: Number,
  shield: Number,
  weapon: Number,
});

// Criando o modelo 'Armor' com base no schema definido
module.exports = model("Attributes", attributeSchema);
