import { useState, useEffect } from 'react';
import MainMenuScreen from './components/levels/MainMenuScreen';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/desk/LevelSelect';
import { Phone } from './components/desk/Phone';
import { ReferenceBook } from './components/desk/ReferenceBook';
import { ComputerProfile } from './components/desk/computer_profile/ComputerProfile';
import { NewPlayer } from './components/desk/computer_profile/NewPlayer';
import { SignIn } from './components/desk/computer_profile/SignIn';
import { PlayerInfo } from './components/desk/computer_profile/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Screen, Levels, Puzzle, getStory } from './util';
import GameScreen from './components/levels/GameScreen';
import EchidnaMachine from './components/desk/EchidnaMachine';
import MainGamePage from './components/mainpage/MainGamePage';
import * as ciphersExports from './ciphers/ciphers';

function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.LandingScreen);
  const [returnScreen, setReturnScreen] = useState(Screen.MainGamePage);
  const [currentLevel, setCurrentLevel] = useState(Levels.Tutorial);
  const [currentStory, setCurrentStory] = useState(getStory(Levels.Tutorial));
  const [currentEncodedPhrase, setCurrentEncodedPhrase] = useState('');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);

  useEffect(() => {
    createGuestProfile();
  }, []);

  function createGuestProfile() {
    // Check if 'profile' object exists in local storage
    const existingProfile = localStorage.getItem('profile');
    console.log(existingProfile);
    if (!existingProfile) {
      // If 'profile' object doesn't exist, create a default guest profile and save it to local storage
      const defaultProfile = {
        profile: {
          username: 'guest',
          password: 'guest_password',
          completed_puzzles: []
        }
      };
      localStorage.setItem('profile', JSON.stringify(defaultProfile));
    }
  }

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
    const userProfile = JSON.parse(localStorage.getItem('profile') || '');
    userProfile.profile.completed_puzzles.push(puzzles[currentPuzzleIndex].id);
    console.log(userProfile);

    localStorage.setItem('profile', JSON.stringify(userProfile));
    if (index < puzzles.length) {
      setCurrentPuzzleIndex(index);
      setCurrentEncodedPhrase(encodePhrase(puzzles[index]));
      //Set current screen to new note with conspiracy board
    } else {
      // TODO: Handle 'congrats you've completed all of the puzzles'
      //
      // wait 2.5 seconds
      setTimeout(() => {
        setCurrentScreen(Screen.MainGamePage);
      }, 2500);
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
