import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/desk/LevelSelect';
import { ConspiricyBoard } from './components/desk/ConspiricyBoard';
import { Phone } from './components/desk/Phone';
import { PuzzlePage } from './components/desk/PuzzlePage';
import { ReferenceBook } from './components/desk/ReferenceBook';
import { ComputerProfile } from './components/desk/ComputerProfile';
import { NewPlayer } from './components/desk/computer_profile/NewPlayer';
import { SignIn } from './components/desk/computer_profile/SignIn';
import { PlayerInfo } from './components/desk/computer_profile/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Tutorial } from './components/levels/Tutorial';
import GamePageTemplate from './components/levels/GamePageTemplate';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);

  const levels = [
    <MainMenuScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <LandingScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <NewPlayer handleLevelButtonClick={handleLevelButtonClick} />,
    <SignIn
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <PlayerInfo
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <LevelSelect handleLevelButtonClick={handleLevelButtonClick} />,

    <GamePageTemplate />,
    <ComputerProfile handleLevelButtonClick={handleLevelButtonClick} />,
    <ConspiricyBoard handleLevelButtonClick={handleLevelButtonClick} />,
    <Phone handleLevelButtonClick={handleLevelButtonClick} />,
    <PuzzlePage handleLevelButtonClick={handleLevelButtonClick} />,

    <ReferenceBook handleLevelButtonClick={handleLevelButtonClick} />
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
        <AnimatePresence mode="wait">{levels[currentLevel]}</AnimatePresence>
      </div>
    </div>
  );
}

export default App;
