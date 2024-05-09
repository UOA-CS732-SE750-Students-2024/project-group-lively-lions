# COMPSCI 732 / SOFTENG 750 project - Team Lively Lions

# Purrlock Holmes' Cryptography Agency

> This is a MERN stack web game where you are Purrlock Holmes attempting to solve multiple ciphers and mysteries. The game is designed to be educational and fun, with a focus on teaching the player about cryptography and ciphers. The game is designed to be played in a web browser, and is designed to be played on a desktop or laptop computer with a large fixed aspect ratio.

The live deployment can be found at: https://project-group-lively-lions.onrender.com/

## Features

## Getting Started

1. Make sure you have the latest version of git, pnpm (>=8.15.1), node (>=20.11.0) installed.
2. Clone the repository (`git clone https://github.com/UOA-CS732-SE750-Students-2024/project-group-lively-lions.git`) into your preferred folder
3. `cd project-group-lively-lions` then run `pnpm install` to install the dependencies.
4. Run `pnpm run dev` to start a local development server on your machine.
5. Open your browser and navigate to local host to see the game in action.

### Other commands

- Alt + Shift + F should format the code in the current file according to Prettier + ESLint rules, otherwise you can also run `pnpm run format` to format all files.
- Running `pnpm run build` produces an application bundle that is suitable to be served over a static hosting service in `./dist`. Subsequently, running `pnpm run preview` will boot up a local server with the application bundle in `./dist`.

### Backend

This game features an Express backend designed to connect to an online database. This database is a free MongoDB community server with read and write connection for all users of the game. 

#### Player Profile

Users have the opportunity to create their own account when playing, which will allow their data to persist outside of when the browser closes. The account schema (defined at [playerSchema](./src/backend/playerSchema.mjs)) is designed with major components: 

1) username: String
2) password: String
3) completed_puzzles: Array
4) _id: ObjectId 

The username and password are created by the player. The _id field is an ID used by MongoDB to track that their are no objects with duplicate IDs--used in this case to check that there are no duplicate usernames. The completed_puzzles array stores the IDs of the puzzles the user has completed. The player can actively change their own username and password in the [PlayerInfo](./src/components/desk/computer_profile/PlayerInfo.tsx) page, and the completed_puzzles is updated every single time the player completes a puzzle. The _id remains static. 

By default, when the player opens the game a guest profile is created and stored in the browser's local storage. When the player signs into their profile using the [SignIn](./src/components/desk/computer_profile/SignIn.tsx) page, this guest profile is deleted and replaced with the users profile as it is stored in the database. It is this local browser profile that is updated every tmie the player changes their username/password/completes a puzzle, and then that browser profile is sent to the database to update the profile there. 

#### Backend Enspoints

There are 3 endpoints to the backend that dictate how the player can interact with it: 

1) POST: Allows the player to create a new account and post it to the server. 
2) GET: Allows the player to retrieve their profile from the server when they sign in.
3) PUT: Updates the database profile whenever the username/password/completed_puzzles changes happen. 

All of these endpoints are included in the [server.mjs](./src/backend/server.mjs) file.

#### Backend in dev 
This database is set to be automatically run upon apps startup, however if you need to run it for development reasons then: 

1) navigate into the root directory using a terminal 
2) run the [server.mjs](./src/backend/server.mjs) file using `node src/backend/server.mjs`

This will start the server connection manually. This connection is hosted on `localhost:3000` and connects to the server using the general MongoDB URI stored in the .env. 

### Want to contribute?

We prefer VS Code. If you are using VS Code, you can use the following extensions to make your life easier:

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- Github Copilot.
  (Optional) Change the corresponding VSCode settings:
  ![](./readme-images/formatter.png)
  ![](./readme-images/association.png)

### Meet the team!

- Jessica Lowe
- Samhar Aeron
- Rebecca Hunt
- Caleb Wei
- Peter Strobel
- Matthew Stevens

![](./readme-images/Lively%20Lions.webp)
