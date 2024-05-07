import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/desk/LevelSelect';
import ConspiracyBoard from './components/desk/conspiracy_board';
import { Phone } from './components/desk/Phone';
import { PuzzlePage } from './components/desk/PuzzlePage';
import { ReferenceBook } from './components/desk/ReferenceBook';
import { ComputerProfile } from './components/desk/ComputerProfile';
import { NewPlayer } from './components/desk/computer_profile/NewPlayer';
import { SignIn } from './components/desk/computer_profile/SignIn';
import { PlayerInfo } from './components/desk/computer_profile/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Screen, Levels } from './util';
import * as story from './lib/story.json';
import EchidnaMachine from './components/desk/EchidnaMachine';

function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.LandingScreen);
  const [currentLevel, setCurrentLevel] = useState(Levels.Tutorial);
  const [currentStory, setCurrentStory] = useState(story.tutorial);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [currentPuzzle, setCurrentPuzzle] = useState(story.tutorial.puzzles[0]);
  const screens = [
    <MainMenuScreen
      key="mainMenu"
      handleScreenButtonClick={handleScreenButtonClick}
      handleLevel={handleLevel}
      level={currentLevel}
      story={currentStory}
      puzzle={currentPuzzle}
      setCurrentPhrase={setCurrentPhrase}
    />,
    <LandingScreen
      key="landing"
      handleScreenButtonClick={handleScreenButtonClick}
    />,

    <NewPlayer
      key="newPlayer"
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <SignIn
      key="signIn"
      handleScreenButtonClick={handleScreenButtonClick}
      handleConfirm={handleConfirm}
    />,
    <PlayerInfo
      key="playerInfo"
      handleScreenButtonClick={handleScreenButtonClick}
      handleConfirm={handleConfirm}
    />,
    <LevelSelect
      key="levelSelect"
      handleScreenButtonClick={handleScreenButtonClick}
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
    />,
    <EchidnaMachine
      key="echidnaMachine"
      phrase={currentPhrase}
      handleScreenButtonClick={handleScreenButtonClick}
      puzzle={currentPuzzle}
    />
  ];

  function handleLevel(level: Levels, e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentLevel(level);
    setCurrentStory(handleLoadStory() ?? story.tutorial);
    setCurrentScreen(Screen.MainMenuScreen);
  }

  function handleScreenButtonClick(
    screen: Screen,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setCurrentScreen(screen);
  }

  function handleCheckAnswer(
    userPhrase: string,
    phrase: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    if (userPhrase == phrase) {
      alert('Correct!');
    } else {
      alert('Incorrect, try again!');
    }
  }

  function handleConfirm(
    username: string,
    password: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
  }

  function handleLoadStory() {
    switch (currentLevel) {
      case Levels.Tutorial:
        return story.tutorial;
      case Levels.Easy:
        return story.easy;
      case Levels.Medium:
        return story.medium;
        break;
      case Levels.Hard:
        return story.hard;
      default:
        break;
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
