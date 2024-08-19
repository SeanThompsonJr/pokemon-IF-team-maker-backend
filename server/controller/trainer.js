const trainerModel = require("../models/trainerModel");
const getAllTrainers = async (req, res) => {
  //try to query all items in the DB
  try {
    const trainers = await trainerModel.find({});
    //give a good status & show the users data that was queried
    res.status(200).json({ trainers });
  } catch (error) {
    //we are giving the response a property of msg with a value of the error we got
    res.status(500).json({ msg: error });
  }
};

const getOneTrainer = async (req, res) => {
  try {
    const { trainer: trainerName } = req.params;

    const oneTrainer = await trainerModel.find({ trainername: trainerName });

    if (!oneTrainer) {
      return res
        .status(404)
        .json({ msg: `no user with the id of ${trainerName}` });
    }
    res.status(200).json({ oneTrainer });
  } catch (error) {
    //we are giving the response a property of msg with a value of the error we got
    res.status(500).json({ msg: error });
  }
};

const createTrainers = async (req, res) => {
  //create the user from the given model
  //? .create is acutally saving to the db
  const trainers = await trainerModel.create(req.body);
  //send an ok status
  //send the response as json
  res.status(201).json({ trainers });
};

const updateTrainer = async (req, res) => {
  try {
    //destruct id from req.params and assign it the alias of userID
    const { trainer: trainerName } = req.params;
    //find an item in the db with the trainername(key) with the value of trainerName(value)
    //the second parameter id the update that is to be applied (whatever we pass in through thunderclient)
    const trainers = await trainerModel.findOneAndUpdate(
      { trainername: trainerName },
      req.body,
      {
        //shows new data instead of old
        new: true,
      }
    );

    if (!trainers) {
      return res
        .status(404)
        .json({ msg: `no user with the id of ${trainerName}` });
    }
    res.status(201).json({ trainers });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateCurrentPokemon = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    console.log("Received request to update trainer:", trainerName);
    console.log("Pokémon details:", pokemonDetail);

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    // Append the new Pokémon detail to the partyMembers array
    oneTrainer.partyMembers.push(pokemonDetail);

    oneTrainer.aliveCounter++;
    oneTrainer.membersCaughtCounter++;

    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};

const updateBoxPokemon = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    console.log("Received request to update trainer:", trainerName);
    console.log("Pokémon details:", pokemonDetail);

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    // Append the new Pokémon detail to the partyMembers array
    oneTrainer.boxMembers.push(pokemonDetail);

    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};
const updateDeadPokemon = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    console.log("Received request to update trainer:", trainerName);
    console.log("Pokémon details:", pokemonDetail);

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    // Append the new Pokémon detail to the partyMembers array
    oneTrainer.deadMembers.push(pokemonDetail);

    oneTrainer.aliveCounter--;
    oneTrainer.deathCounter++;

    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};
const deleteCurrentPokemon = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    console.log("Received request to update trainer:", trainerName);
    console.log("Pokémon details:", pokemonDetail);

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    // Find the index of the specific Pokémon
    const pokemonIndex = oneTrainer.partyMembers.findIndex(
      (member) => member._id.toString() === pokemonDetail._id
    );
    //if not found
    if (pokemonIndex === -1) {
      console.log("Pokémon not found in party");
      return res.status(404).json({ message: "Pokémon not found in party" });
    }
    //todo the error is here make a different function for each box

    // Remove the Pokémon from the partyMembers array
    oneTrainer.partyMembers.splice(pokemonIndex, 1);

    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};
const deleteCurrentPokemonBox = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    console.log("Received request to update trainer:", trainerName);
    console.log("Pokémon details:", pokemonDetail);

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    // Find the index of the specific Pokémon
    const pokemonIndex = oneTrainer.boxMembers.findIndex(
      (member) => member._id.toString() === pokemonDetail._id
    );
    //if not found
    if (pokemonIndex === -1) {
      console.log("Pokémon not found in party");
      return res.status(404).json({ message: "Pokémon not found in party" });
    }
    //todo the error is here make a different function for each box

    // Remove the Pokémon from the partyMembers array
    oneTrainer.boxMembers.splice(pokemonIndex, 1);

    oneTrainer.aliveCounter--;
    oneTrainer.membersCaughtCounter--;

    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};
const deleteCurrentPokemonDead = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    console.log("Received request to update trainer:", trainerName);
    console.log("Pokémon details:", pokemonDetail);

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    // Find the index of the specific Pokémon
    const pokemonIndex = oneTrainer.deadMembers.findIndex(
      (member) => member._id.toString() === pokemonDetail._id
    );
    //if not found
    if (pokemonIndex === -1) {
      console.log("Pokémon not found in party");
      return res.status(404).json({ message: "Pokémon not found in party" });
    }
    //todo the error is here make a different function for each box

    // Remove the Pokémon from the partyMembers array
    oneTrainer.deadMembers.splice(pokemonIndex, 1);

    oneTrainer.aliveCounter++;
    oneTrainer.deathCounter--;
    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};
//todo fix later
const updateCounter = async (req, res) => {
  try {
    // Destructure trainer name from req.params
    const { trainer: trainerName } = req.params;

    // Extract Pokémon details from the request body
    const pokemonDetail = req.body;

    // Find the trainer by name
    const oneTrainer = await trainerModel.findOne({ trainername: trainerName });

    if (!oneTrainer) {
      console.log("Trainer not found");
      return res.status(404).json({ message: "Trainer not found" });
    }

    console.log("Trainer found:", oneTrainer);

    oneTrainer.deathCounter++;
    oneTrainer.aliveCounter--;
    oneTrainer.membersCaughtCounter++;

    // Save the updated trainer document
    await oneTrainer.save();

    console.log("Trainer updated successfully:", oneTrainer);

    // Respond with the updated trainer document
    res.status(200).json(oneTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Error updating trainer", error });
  }
};
module.exports = {
  getAllTrainers,
  createTrainers,
  updateTrainer,
  getOneTrainer,
  updateCurrentPokemon,
  updateBoxPokemon,
  updateDeadPokemon,
  updateCounter,
  deleteCurrentPokemon,
  deleteCurrentPokemonBox,
  deleteCurrentPokemonDead,
};
