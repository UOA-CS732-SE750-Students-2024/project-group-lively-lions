import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/levels/LevelSelect';
import { NewPlayer } from './components/levels/NewPlayer';
import { SignIn } from './components/levels/SignIn';
import { PlayerInfo } from './components/levels/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Tutorial } from './components/levels/Tutorial';
import MainGamePage from './components/main_game_page/MainGamePage';

function App() {
  const [currentLevel, setCurrentLevel] = useState(5);

  const levels = [
    <MainMenuScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <LandingScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <NewPlayer
      handleLevelButtonClick={handleLevelButtonClick}
    />,
    <SignIn
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <PlayerInfo
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <MainGamePage
      handleLevelButtonClick={handleLevelButtonClick}/>,
    <LevelSelect handleLevelButtonClick={handleLevelButtonClick} />,
    <Tutorial
      handleCheckAnswer={handleCheckAnswer}
      handleLevelButtonClick={handleLevelButtonClick}
    />
  ];

  function handleLevelButtonClick(
    level: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setCurrentLevel(level);
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
        <AnimatePresence mode='wait'>
          {levels[currentLevel]}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
