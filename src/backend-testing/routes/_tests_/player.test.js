const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const routes = require("../players");
const express = require("express");
const request = require("supertest");

let mongod;

// Testing file for the player schema

// Create Express server. We don't need to start or stop it ourselves - we'll use the supertest package to manage this for us.
const app = express();
app.use("/", routes);

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
  username: "her majesty queen elizabeth II",
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
 * Before each test, initialize the database with some data
 */
beforeEach(async () => {
  // Drop existing db
  try {
    // Log existing collections before creating "players" collection
    const existingCollectionsBefore = await mongoose.connection.db.listCollections().toArray();
    console.log("Existing collections before:", existingCollectionsBefore.map(coll => coll.name));

    // Drop existing db
    await mongoose.connection.db.dropDatabase();

    // Create "players" collection and insert data
    const coll = await mongoose.connection.db.createCollection("players");
    await coll.insertMany(players);

    // Log existing collections after creating "players" collection
    const existingCollectionsAfter = await mongoose.connection.db.listCollections().toArray();
    console.log("Existing collections after:", existingCollectionsAfter.map(coll => coll.name));
  } catch (error) {
    console.error("Error during beforeEach:", error);
  }
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// Using describe() to group tests according to which endpoint being tested is good practice.
describe("GET /players", () => {
  /**
   * Tests that, when requesting all players, a 200 OK response is returned,
   * with the response body containing an array of all players in the database.
   */
  it("gets all players from server", (done) => {
    request(app) // "app" is the Express server we're testing
      .get("/players") // This is the URL we're invoking. And we're sending a GET request to it.
      .send() // Send the request. If we were sending a POST request, we would send the data as an argument to this function.
      .expect(200) // Expect the response to have a status code of 200 (OK).
      .end((err, res) => {
        // If all the above goes well, this function will be called. We can add any additional Jest tests in here, and call done() when finished.

        // If "err" is defined, it means there was a problem and we should fail the test.
        // We can do this by calling "done", supplying the error object.
        if (err) {
          return done(err);
        }

        // res.body contains the data sent from the server.
        const playersFromApi = res.body;

        // Normal Jest tests.
        expect(playersFromApi).toBeTruthy();
        expect(playersFromApi.length).toBe(3);

        expect(playersFromApi[0].username).toBe("CoolGuyMagillicutty");
        expect(playersFromApi[0].password).toBe("helpme");

        expect(playersFromApi[1].username).toBe("trombone jim");
        expect(playersFromApi[1].password).toBe("boopbopbeep");

        expect(playersFromApi[2].username).toBe("her majesty queen elizabeth II");
        expect(playersFromApi[2].password).toBe("superdedlol");

        // Call done() when finished
        return done();
      });
  });
});

describe("GET /players/:id", () => {
  /**
   * Tests that, when requesting a single player with a valid id, a 200 OK response is returned, with the matching
   * player in the response body.
   */
  it("gets a single player from the server", (done) => {
    request(app)
      .get("/players/000000000000000000000002")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const player = res.body;
        expect(player.username).toBe("trombone jim");
        expect(player.password).toBe("boopbopbeep");
        expect(player.drink).toBeUndefined();

        return done();
      });
  });

  /**
   * Tests that, when requesting a single player with a non-existent id, a 404 response is returned.
   */
  it("returns a 404 response when requesting with an invalid id", (done) => {
    request(app).get("/players/00000000000000000000000F").send().expect(404, done); // We can pass the done function right away as a callback to expect(), if we don't have any further checks to make.
  });
});
