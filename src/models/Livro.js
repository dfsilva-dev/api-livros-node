import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "Titulo do livro e obrigatorio"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "O autor e obrigatorio"],
      autopopulate: { select: "nome" }
    },
    editora: {
      type: String,
      required: [true, "A editora e obrigaotoria"],
      enum: {
        values: ["Casa do codigo", "Alura"],
        message: "A editora {VALUE} nao e um valor permitido"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O numero de paginas precisa estar entre 10 e 5000. Valor fornecido: VALUE}"
      }
    }
  }
);
livroSchema.plugin(autopopulate);
const livros= mongoose.model('livros', livroSchema);

export default livros;