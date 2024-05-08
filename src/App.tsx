import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/desk/LevelSelect';
import { Phone } from './components/desk/Phone';
import { PuzzlePage } from './components/desk/PuzzlePage';
import { ReferenceBook } from './components/desk/ReferenceBook';
import { ComputerProfile } from './components/desk/computer_profile/ComputerProfile';
import { NewPlayer } from './components/desk/computer_profile/NewPlayer';
import { SignIn } from './components/desk/computer_profile/SignIn';
import { PlayerInfo } from './components/desk/computer_profile/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Screen, Levels, Puzzle } from './util';
import GameScreen from './components/levels/GameScreen';
import * as story from './lib/story.json';
import EchidnaMachine from './components/desk/EchidnaMachine';
import MainGamePage from './components/mainpage/MainGamePage';
import * as ciphersExports from './ciphers/ciphers';
import { set } from 'mongoose';

function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.LandingScreen);
  const [returnScreen, setReturnScreen] = useState(Screen.MainGamePage);
  const [currentLevel, setCurrentLevel] = useState(Levels.Tutorial);
  const [currentStory, setCurrentStory] = useState(story.difficulties[0]);
  const [currentEncodedPhrase, setCurrentEncodedPhrase] = useState('');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const screens = [
    <MainMenuScreen
      key="mainMenu"
      handleScreenButtonClick={handleScreenButtonClick}
      handleLevel={handleLevel}
      level={currentLevel}
    />,
    <LandingScreen
      key="landing"
      handleScreenButtonClick={handleScreenButtonClick}
    />,

    <NewPlayer
      key="newPlayer"
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <SignIn key="signIn" handleScreenButtonClick={handleScreenButtonClick} />,
    <PlayerInfo
      key="playerInfo"
      handleScreenButtonClick={handleScreenButtonClick}
      handleConfirm={handleConfirm}
    />,
    <LevelSelect
      key="levelSelect"
      handleScreenButtonClick={(screen, e) =>
        handleScreenButtonClick(
          screen,
          e as React.MouseEvent<HTMLButtonElement, MouseEvent>
        )
      }
      handleLevel={handleLevel}
      story={currentStory}
    />,
    <ComputerProfile
      key="computerProfile"
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <Phone
      key="phone"
      story={currentStory}
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <PuzzlePage
      key="puzzlePage"
      story={currentStory}
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <ReferenceBook
      key="referenceBook"
      handleScreenButtonClick={handleScreenButtonClick}
      returnToScreen={returnScreen}
    />,
    <EchidnaMachine
      key="echidnaMachine"
      phrase={currentEncodedPhrase}
      story={currentStory}
      handleScreenButtonClick={handleScreenButtonClick}
      puzzleIndex={currentPuzzleIndex}
      handleSolvedPuzzle={handleSolvedPuzzle}
    />,
    <MainGamePage
      key="mainGamePage"
      handleScreenButtonClick={handleScreenButtonClick}
      handleReturnScreen={handleReturnScreen}
    />,
    <GameScreen
      key="gameScreen"
      handleScreenButtonClick={handleScreenButtonClick}
      level={currentLevel}
      handleReturnScreen={handleReturnScreen}
      phrase={currentEncodedPhrase}
      puzzleIndex={currentPuzzleIndex}
      handleSolvedPuzzle={handleSolvedPuzzle}
      story={currentStory}
    />
  ];
  function encodePhrase(puzzle: Puzzle) {
    const puzzleCipher = puzzle.cipher;
    const puzzleSolution = puzzle.solution;

    switch (puzzleCipher[0]) {
      case 'caesar': {
        const keyshift = Math.floor(Math.random() * 26);
        return new ciphersExports.Caesar().encode({
          phrase: puzzleSolution,
          caesarkey: keyshift
        });
      }
      case 'vigenere': {
        const keyword = 'KEYWORD'; //tbd
        return new ciphersExports.Vigenere().encode({
          phrase: puzzleSolution,
          keyword: keyword
        });
      }
      case 'morse': {
        return new ciphersExports.Morse().encode({
          phrase: puzzleSolution
        });
      }
      case 'binary': {
        return new ciphersExports.Binary().encode({
          phrase: puzzleSolution
        });
      }
      case 'emoji': {
        return new ciphersExports.Emoji().encode({
          phrase: puzzleSolution
        });
      }
      case 'polybius': {
        return new ciphersExports.Polybius().encode({
          phrase: puzzleSolution
        });
      }

      default:
        return '';
    }
  }

  function handleLevel(level: Levels, e: React.MouseEvent<HTMLButtonElement>) {
    setCurrentLevel(level);
    const story = getStory(level);
    setCurrentStory(story);
    setCurrentPuzzleIndex(0);
    setCurrentEncodedPhrase(encodePhrase(story.puzzles[0]));
    e.preventDefault();
  }

  function handleReturnScreen(screen: Screen) {
    setReturnScreen(screen);
  }

  function handleScreenButtonClick(
    screen: Screen,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.preventDefault();

    setCurrentScreen(screen);
  }

  function handleSolvedPuzzle() {
    //Check current level number of puzzles
    const puzzles = currentStory.puzzles;
    const index = currentPuzzleIndex + 1;
    if (index < puzzles.length) {
      //Add puzzle id to player's completed puzzles in local storage

      //add index of next puzzle to unlocked puzzles.

      setCurrentPuzzleIndex(index);
      setCurrentEncodedPhrase(encodePhrase(puzzles[index]));
      // setCurrentScreen(Screen.EchidnaMachine);
    } else {
      // TODO: Handle 'congrats you've completed all of the puzzles'
      setCurrentScreen(Screen.MainGamePage);
    }
  }

  function handleConfirm(
    username: string,
    password: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
  }

  function getStory(level: Levels) {
    switch (level) {
      case Levels.Tutorial:
        return story.difficulties[0];
      case Levels.Easy:
        return story.difficulties[1];
      case Levels.Medium:
        return story.difficulties[2];
        break;
      case Levels.Hard:
        return story.difficulties[3];
      default:
        return story.difficulties[0];
    }
  }

  return (
    /* Fills viewport and centers game bounds */
    <div className="bg-[#101819] flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-[#d9b26f] font-[alagard] text-[3rem] leading-loose text-center text-pretty w-[100%]">
        Purrlock Holmes' Crypawtography Agency
      </h1>
      {/* Constrains game contents maximum and minimum dimensions */}
      <div
        className="
      relative bg-[#1e2d2f] rounded-md
      w-[calc(60vw)] h-[calc(60vw*9/16)]
      min-w-[960px] min-h-[540px]
      overflow-scroll no-scrollbar"
      >
        {/* Game contents */}
        <AnimatePresence mode="wait">{screens[currentScreen]}</AnimatePresence>
      </div>
    </div>
  );
}

export default App;
