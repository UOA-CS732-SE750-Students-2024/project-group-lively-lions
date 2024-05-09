import * as story from '../src/lib/story.json';

export enum Screen {
  MainMenuScreen,
  LandingScreen,
  NewPlayer,
  SignIn,
  PlayerInfo,
  LevelSelect,
  ComputerProfile,
  Phone,
  EchidnaMachine,
  MainGamePage,
  GameScreen
}

export enum Levels {
  Tutorial,
  Easy,
  Medium,
  Hard
}

export function getStory(level: Levels) {
  switch (level) {
    case Levels.Tutorial:
      return story.difficulties[0];
    case Levels.Easy:
      return story.difficulties[1];
    case Levels.Medium:
      return story.difficulties[2];
    case Levels.Hard:
      return story.difficulties[3];
    default:
      return story.difficulties[0];
  }
}

export type Story = (typeof story)['difficulties'][0];

export type Puzzle = Story['puzzles'][0];
