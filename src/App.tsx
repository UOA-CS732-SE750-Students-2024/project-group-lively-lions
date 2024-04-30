import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/levels/LevelSelect';
import { NewPlayer } from './components/levels/NewPlayer';
import { SignIn } from './components/levels/SignIn';
import { PlayerInfo } from './components/levels/PlayerInfo';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);

  const levels = [
    <MainMenuScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <LandingScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <NewPlayer
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <SignIn
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <PlayerInfo
      handleLevelButtonClick={handleLevelButtonClick}
      handleConfirm={handleConfirm}
    />,
    <LevelSelect handleLevelButtonClick={handleLevelButtonClick} />
  ];

  function handleLevelButtonClick(
    level: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setCurrentLevel(level);
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
      min-w-[640px] min-h-[360px]
      overflow-scroll"
      >
        {/* Game contents */}
        {levels[currentLevel]}
      </div>
    </div>
  );
}

export default App;
