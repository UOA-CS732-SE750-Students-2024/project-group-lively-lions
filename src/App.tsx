import { useState } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/desk/LevelSelect';
import { Phone } from './components/desk/Phone';
import { PuzzlePage } from './components/desk/PuzzlePage';
import { ReferenceBook } from './components/desk/ReferenceBook';
import { ComputerProfile } from './components/desk/ComputerProfile';
import { NewPlayer } from './components/desk/computer_profile/NewPlayer';
import { SignIn } from './components/desk/computer_profile/SignIn';
import { PlayerInfo } from './components/desk/computer_profile/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Screen, Levels } from './util';
import MainGamePage from './components/main_game_page/MainGamePage';

function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.LandingScreen);
  const [currentLevel, setCurrentLevel] = useState(Levels.Tutorial);

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
    />,
    <ComputerProfile
      key="computerProfile"
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <Phone key="phone" handleScreenButtonClick={handleScreenButtonClick} />,
    <PuzzlePage
      key="puzzlePage"
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <ReferenceBook
      key="referenceBook"
      handleScreenButtonClick={handleScreenButtonClick}
    />,
    <MainGamePage
      key="mainGamePage"
      handleScreenButtonClick={handleScreenButtonClick} />
  ];

  function handleLevel(level: Levels, e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentLevel(level);
    setCurrentScreen(Screen.MainMenuScreen);
  }

  function handleScreenButtonClick(
    screen: Screen,
    e: React.MouseEvent<HTMLElement, MouseEvent>
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