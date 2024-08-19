const mongoose = require("mongoose");

const pokemonDetailSchema = new mongoose.Schema({
  img: { type: String, default: "" },
  pokemonName: { type: String, default: "" },
  pokemonType: { type: String, default: "Unknown" },
  fault: String,
});

const trainerSchema = new mongoose.Schema({
  trainername: String,
  deathCounter: { type: Number, default: 0 },
  aliveCounter: { type: Number, default: 0 },
  membersCaughtCounter: { type: Number, default: 0 },
  partyMembers: {
    type: [pokemonDetailSchema],
    validate: {
      validator: function (v) {
        return v.length <= 6;
      },
      message: (props) => `A trainer can have a maximum of ${6} party members.`,
    },
    unique: true,
  },
  deadMembers: [pokemonDetailSchema],
  boxMembers: [pokemonDetailSchema],
});

const TrainerModel = mongoose.model("trainer", trainerSchema);
module.exports = TrainerModel;
