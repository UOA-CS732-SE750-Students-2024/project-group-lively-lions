import * as story from 'src/lib/story.json';

export enum Screen {
  MainMenuScreen,
  LandingScreen,
  NewPlayer,
  SignIn,
  PlayerInfo,
  LevelSelect,
  ComputerProfile,
  Phone,
  PuzzlePage,
  ReferenceBook,
  EchidnaMachine,
  MainGamePage
}

export enum Levels {
  Tutorial,
  Easy,
  Medium,
  Hard
}

export type Story = (typeof story)['tutorial'];

export type Puzzle = Story['puzzles'][0];
