const express = require("express");
const {
  getAllTrainers,
  createTrainers,
  updateTrainer,
  getOneTrainer,
  updateCurrentPokemon,
  updateBoxPokemon,
  updateDeadPokemon,
  deleteCurrentPokemon,
  deleteCurrentPokemonBox,
  deleteCurrentPokemonDead,
  updateCounter,
} = require("../controller/trainer");

const router = express.Router();

router.route("/").get(getAllTrainers).post(createTrainers);
router.route("/:trainer").get(getOneTrainer).patch(updateTrainer);
router
  .route("/pokemon/:trainer")
  .patch(updateCurrentPokemon)
  .delete(deleteCurrentPokemon);
router
  .route("/pokemonbox/:trainer")
  .patch(updateBoxPokemon)
  .delete(deleteCurrentPokemonBox);
router
  .route("/pokemondead/:trainer")
  .patch(updateDeadPokemon)
  .delete(deleteCurrentPokemonDead);
router.route("/details/:trainer").patch(updateCounter);
module.exports = router;
