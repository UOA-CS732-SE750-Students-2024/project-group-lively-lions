import { Levels, Screen } from '@/util';
import { Button } from '../ui/button';
import { LevelSelect } from '../desk/LevelSelect';
import filing_cabinet_open from "../../assets/sounds/filing_cabinet_open.mp3";

interface MainMenuScreenProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleLevel: (
    level: Levels,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void; // Added handleLevel property
  level: Levels; // Added level property
}

export default function MainMenuScreen({
  handleScreenButtonClick,
  handleLevel,
  level
}: MainMenuScreenProps) {
  console.log(level);

  function play_sound() {
    new Audio(filing_cabinet_open).play();
  }
  return (
    <div>
      {/*Cabinet Difficulty Selection*/}
      {/* <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevel(Levels.Tutorial, e)}
        size={'sm'}
      >
        TUTORIAL
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevel(Levels.Easy, e)}
        size={'sm'}
      >
        EASY
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevel(Levels.Medium, e)}
        size={'sm'}
      >
        MEDIUM
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevel(Levels.Hard, e)}
        size={'sm'}
      >
        HARD
      </Button> */}
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => { handleScreenButtonClick(Screen.LevelSelect, e); play_sound() }}
        size={'sm'}
      >
        Level Select
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(0, e)}
        size={'sm'}
      >
        CONSPIRACY BOARD needs link to working board
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.ComputerProfile, e)}
        size={'sm'}
      >
        COMPUTER/PROFILE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.Phone, e)}
        size={'sm'}
      >
        PHONE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.ReferenceBook, e)}
        size={'sm'}
      >
        REFERENCE BOOK
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.PuzzlePage, e)}
        size={'sm'}
      >
        PUZZLE PAGE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.MainGamePage, e)}
        size={'sm'}
      >
        MAIN GAME PAGE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.GameScreen, e)}
        size={'sm'}
      >
        GAME SCREEN
      </Button>
    </div>
  );
}
