import { useState, useEffect } from 'react';
import LandingScreen from './components/levels/LandingScreen';
import { LevelSelect } from './components/desk/LevelSelect';
import { ComputerProfile } from './components/desk/computer_profile/ComputerProfile';
import { NewPlayer } from './components/desk/computer_profile/NewPlayer';
import { SignIn } from './components/desk/computer_profile/SignIn';
import { PlayerInfo } from './components/desk/computer_profile/PlayerInfo';
import { AnimatePresence } from 'framer-motion';
import { Screen, Levels, Puzzle, getStory } from './util';
import GameScreen from './components/levels/GameScreen';
import MainGamePage from './components/mainpage/MainGamePage';
import * as ciphersExports from './ciphers/ciphers';
import muted from './assets/common/muted.png';
import notMuted from './assets/common/not_muted.png';
import gameSound from './assets/sounds/gameMusic.mp4';
import { delay } from './lib/utils';

const gameMusic = new Audio(gameSound);

function App() {
  const [currentScreen, setCurrentScreen] = useState(Screen.LandingScreen);
  const [currentLevel, setCurrentLevel] = useState(Levels.Tutorial);
  const [currentStory, setCurrentStory] = useState(getStory(Levels.Tutorial));
  const [currentEncodedPhrase, setCurrentEncodedPhrase] = useState('');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [allPuzzleSolved, setAllPuzzleSolved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFirstJoin, setIsFirstJoin] = useState(true);
  const SERVER_API_URL = import.meta.env.VITE_BASE_API_URL;

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
    } else {
      const profile = JSON.parse(existingProfile);
    }
  }

  const screens = [
    <LandingScreen
      key="landing"
      handleContinue={handleScreenButtonClick}
      isMuted={isMuted}
      playMusic={playMusic}
    />,

    <NewPlayer
      key="newPlayer"
      handleScreenButtonClick={handleScreenButtonClick}
      isMuted={isMuted}
    />,
    <SignIn
      key="signIn"
      handleScreenButtonClick={handleScreenButtonClick}
      isMuted={isMuted}
    />,
    <PlayerInfo
      key="playerInfo"
      handleScreenButtonClick={handleScreenButtonClick}
      isMuted={isMuted}
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
      isMuted={isMuted}
    />,
    <ComputerProfile
      key="computerProfile"
      handleScreenButtonClick={handleScreenButtonClick}
      isMuted={isMuted}
    />,
    <MainGamePage
      key="mainGamePage"
      handleScreenButtonClick={handleScreenButtonClick}
      isMuted={isMuted}
      isFirstJoin={isFirstJoin}
      handleFirstJoin={handleFirstJoin}
    />,
    <GameScreen
      key="gameScreen"
      handleScreenButtonClick={handleScreenButtonClick}
      phrase={currentEncodedPhrase}
      puzzleIndex={currentPuzzleIndex}
      handleSolvedPuzzle={handleSolvedPuzzle}
      story={currentStory}
      showNote={showNote}
      setShowNote={setShowNote}
      showBoard={showBoard}
      setShowBoard={setShowBoard}
      allPuzzleSolved={allPuzzleSolved}
      setAllPuzzleSolved={setAllPuzzleSolved}
      isMuted={isMuted}
    />
  ];

  function handleFirstJoin() {
    setIsFirstJoin(false);
  }

  function encodePhrase(puzzle: Puzzle) {
    const puzzleCipher = puzzle.cipher;
    const puzzleSolution = puzzle.solution;

    switch (puzzleCipher[0]) {
      case 'caesar': {
        let keyshift = Math.floor(Math.random() * 25);
        if (keyshift === 0) {
          keyshift = 1;
        }
        return new ciphersExports.Caesar().encode({
          phrase: puzzleSolution,
          caesarkey: keyshift
        });
      }
      case 'vigenere': {
        const keyword = 'PASSWORD'; //tbd
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

    // Check the completed puzzles in the profile
    const userProfile = JSON.parse(localStorage.getItem('profile') ?? '');
    const completedPuzzles = userProfile.profile.completed_puzzles;

    let count = 0;
    for (const puzzle of story.puzzles) {
      for (const completedPuzzle of completedPuzzles) {
        if (puzzle.id === completedPuzzle) {
          count++;
        }
      }
    }
    const index = count;

    setCurrentPuzzleIndex(index);
    setCurrentEncodedPhrase(encodePhrase(story.puzzles[index]));
    e.preventDefault();
  }

  function handleScreenButtonClick(
    screen: Screen,
    e?: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e?.preventDefault();

    setCurrentScreen(screen);
  }

  async function handleSolvedPuzzle() {
    //Check current level number of puzzles
    const puzzles = currentStory.puzzles;
    const index = currentPuzzleIndex + 1;
    const userProfile = JSON.parse(localStorage.getItem('profile') ?? '');

    const puzzleId = puzzles[currentPuzzleIndex].id;
    if (!userProfile.profile.completed_puzzles.includes(puzzleId)) {
      userProfile.profile.completed_puzzles.push(puzzleId);
    } else {
      console.log('puzzle already solved');
    }

    localStorage.setItem('profile', JSON.stringify(userProfile));
    if (index < puzzles.length) {
      setCurrentPuzzleIndex(index);
      setCurrentEncodedPhrase(encodePhrase(puzzles[index]));
      //Set current screen to new note with conspiracy board
      setShowBoard(true);
      setShowNote(true);
    } else {
      // TODO: Handle 'congrats you've completed all of the puzzles'
      setAllPuzzleSolved(true);
      setShowBoard(true);
      setShowNote(true);
    }
    const requestBody = {
      username: userProfile.profile.username,
      password: userProfile.profile.password,
      completed_puzzles: userProfile.profile.completed_puzzles
    };
    // Update database account info with puzzle completion
    fetch(`${SERVER_API_URL}/player`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody) // Send the complete request body
    });
  }

  function playMusic() {
    if (!isMuted) {
      gameMusic.loop = true;
      gameMusic.play();
    }
  }

  function restartMusic() {
    gameMusic.loop = true;
    gameMusic.play();
  }

  function pauseMusic() {
    gameMusic.loop = false;
    gameMusic.pause();
  }

  return (
    /* Fills viewport and centers game bounds */
    <div className="bg-[#101819] flex flex-col items-center justify-center h-screen w-screen">
      <button
        className="absolute self-end pr-2 top-[0%] scale-[80%]"
        onClick={() => {
          setIsMuted(!isMuted);
          isMuted ? restartMusic() : pauseMusic();
        }}
      >
        <img src={isMuted ? muted : notMuted} draggable={false} />
      </button>
      {/* Constrains game contents maximum and minimum dimensions */}
      <div
        className="
      relative bg-[#101819] rounded-md
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
