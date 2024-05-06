import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/levels/LevelSelect';
import { NewPlayer } from './components/levels/NewPlayer';
import { SignIn } from './components/levels/SignIn';
import { PlayerInfo } from './components/levels/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Screen, Levels } from './util';
import GamePageTemplate from './components/levels/GamePageTemplate';

function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.MainMenuScreen);
  const [currentLevel, setCurrentLevel] = useState(Levels.Tutorial);

  const screens = [
    <MainMenuScreen handleScreenButtonClick={handleScreenButtonClick} />,
    <LandingScreen handleScreenButtonClick={handleScreenButtonClick} />,

    <NewPlayer handleScreenButtonClick={handleScreenButtonClick} />,
    <SignIn
      handleScreenButtonClick={handleScreenButtonClick}
      handleConfirm={handleConfirm}
    />,
    <PlayerInfo
      handleScreenButtonClick={handleScreenButtonClick}
      handleConfirm={handleConfirm}
    />,
    <LevelSelect
      handleScreenButtonClick={handleScreenButtonClick}
      handleLevel={handleLevel}
    />,
    <GamePageTemplate level={currentLevel} />
  ];

  function handleLevel(level: number, e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentLevel(level);
    setCurrentScreen(Screen.GamePageTemplate);
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
