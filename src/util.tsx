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
  ReferenceBook,
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
      return story.tutorial;
    case Levels.Easy:
      return story.easy;
    case Levels.Medium:
      return story.medium;
    case Levels.Hard:
      return story.hard;
    default:
      return story.tutorial;
  }
}

export type Story = (typeof story)['tutorial'];

export type Puzzle = Story['puzzles'][0];
