require('text-encoding').TextEncoder;
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Player } = require("../schema");

let mongod;

const player1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
    username: "CoolGuyMagillicutty",
    password: "helpme"
  };
  
const player2 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  username: "trombone jim",
  password: "boopbopbeep"
};

const player3 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000003"),
  username: "queen elizabeth II",
  password: "superdedlol"
};
  
  const players = [player1, player2, player3];

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString);
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
  // Drop existing collections
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.collection("players");
  await coll.insertMany(players);
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it("gets players", async () => {
    const playersFromDb = await Player.find();

    expect(playersFromDb).toBeTruthy();
    expect(playersFromDb.length).toBe(3);

    expect(playersFromDb[0].username).toBe("CoolGuyMagillicutty");
    expect(playersFromDb[0].password).toBe("helpme");

    expect(playersFromDb[1].username).toBe("trombone jim");
    expect(playersFromDb[1].password).toBe("boopbopbeep");

    expect(playersFromDb[2].username).toBe("queen elizabeth II");
    expect(playersFromDb[2].password).toBe("superdedlol");
});

it("gets a single player", async () => {
  const player = await Player.findById("000000000000000000000003");
  expect(player.username).toBe("queen elizabeth II");
  expect(player.password).toBe("superdedlol");
  expect(player.puzzle).toBeUndefined();
});

it("adds a player without crashing", async () => {
  const player = new Player({
    username: "kevin",
    password: "stillkevin"
  });

  await player.save();

  const fromDb = await Player.findOne({ _id: player._id });
  expect(fromDb).toBeTruthy();
  expect(fromDb.username).toBe("kevin");
  expect(fromDb.password).toBe("stillkevin");
});

it("fails when username is taken already", async () => {
  const player1 = new Player({
    username: "kevin",
    password: "stillkevin"
  });

  await player1.save();

  // Attempt to save a new player with the same username
  const player2 = new Player({
    username: player1.username,
    password: "newpassword" // You can set any password here
  });

  // Since saving the player should result in a rejection due to the uniqueness constraint,
  // expect the save operation to throw an error
  await expect(player2.save()).rejects.toThrow();

});


it("fails when password isnt entered", () => {
  const player = new Player({
    username: "davinky"
  });

  return expect(player.save()).rejects.toThrow();
});

it("fails when usernmane isn't entered", () => {
  const player = new Player({
    password: "hambagalaboo"
  });

  return expect(player.save()).rejects.toThrow();
});

