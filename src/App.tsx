import { useState } from 'react';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/levels/LevelSelect';
import { NewPlayer } from './components/levels/NewPlayer';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);

  const levels = [
    <LandingScreen handleLevelButtonClick={handleLevelButtonClick} />,
    <NewPlayer handleLevelButtonClick={handleLevelButtonClick} />,
    <LevelSelect handleLevelButtonClick={handleLevelButtonClick} />
  ];

  function handleLevelButtonClick(
    level: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setCurrentLevel(level);
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
      overflow-scroll"
      >
        {/* Game contents */}
        {levels[currentLevel]}
      </div>
    </div>
  );
}

export default App;
