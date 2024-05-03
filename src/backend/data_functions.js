// Defines the functions used for MongoDB data editing 

async function create_new_player(username, password) {
  const new_player = new Player(username, password);

  const db = client.db(databaseName);

  db.collection(collectionName).insertOne( //adds player instance to database
      new_player
  );
};

async function delete_player(client, databaseName, collectionName, player_id){
  const db = client.db(databaseName);

  await db.collection(collectionName).deleteOne(
      { _id: player_id }
  );
};

async function update_player(player_id, puzzles_unlocked, puzzles_completed, notes_unlocked) {
  try {
    const player = await Player.findByIdAndUpdate(
    { _id: player_id },
      $addToSet: { puzzles_unlocked: { $each: puzzles_unlocked } },
      $addToSet: { puzzles_completed: { $each: puzzles_completed } },
      $addToSet: { notes_unlocked: { $each: notes_unlocked } }
    { new: true };
  );
  } catch (error) {
    console.error('Error updating player:', error);
    throw error; // Rethrow the error to handle it in the calling function
  };
};

export default { 
  create_new_player, 
  delete_player,
  update_player
}