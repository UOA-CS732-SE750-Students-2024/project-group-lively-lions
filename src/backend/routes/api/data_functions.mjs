// Defines the functions used for MongoDB data editing 
import Player from "./playerSchema.mjs"

async function create_new_player(username, password) {
  const new_player = new Player(username, password);

  const db = client.db(databaseName);

  db.collection(collectionName).insertOne( //adds player instance to database
      new_player
  );
};

async function get_profile(username, password) {

}

async function delete_player(client, databaseName, collectionName, player_id){
  const db = client.db(databaseName);

  await db.collection(collectionName).deleteOne(
      { _id: player_id }
  );
};

async function update_player(player_id, puzzles_unlocked, completed_puzzles, notes_unlocked) {
  try {
    const player = await Player.findByIdAndUpdate(
    { _id: player_id },
      {$addToSet: { puzzles_unlocked: { $each: puzzles_unlocked } },
      $addToSet: { completed_puzzles: { $each: completed_puzzles } },
      $addToSet: { notes_unlocked: { $each: notes_unlocked } }},
    { new: true });
  } catch (error) {
    console.error('Error updating player:', error);
    throw error; // Rethrow the error to handle it in the calling function
  };
};

module.exports(create_new_player, update_player, delete_player);