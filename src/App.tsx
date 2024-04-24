import { useState } from 'react';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/levels/LevelSelect';

function App() {

  const [currentLevel, setCurrentLevel] = useState(0);

  const levels = [
    <LandingScreen handleLevelButtonClick={handleLevelButtonClick}/>,
    <LevelSelect handleLevelButtonClick={handleLevelButtonClick}/>
  ]

  function handleLevelButtonClick(level: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    setCurrentLevel(level);
  }

  return (
    <div className="bg-[#242424] min-w-screen min-h-screen p-3">
        <h1 className="text-white font-[BJG] text-4xl leading-loose tracking-wide text-center py-20">
          Purrlock Holmes' <br />
          Crypurrtography Agency
        </h1>
        {levels[currentLevel]}
    </div>
  );
}

export default App;
