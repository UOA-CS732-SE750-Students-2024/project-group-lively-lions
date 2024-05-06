import { Button } from '../ui/button';

interface MainMenuScreenProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function MainMenuScreen({
  handleLevelButtonClick
}: MainMenuScreenProps) {
  return (
    <div>
      {/*Cabinet Difficulty Selection*/}
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(5, e)}
        size={'sm'}
      >
        TUTORIAL
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(5, e)}
        size={'sm'}
      >
        EASY
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(5, e)}
        size={'sm'}
      >
        MEDIUM
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(5, e)}
        size={'sm'}
      >
        HARD
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(8, e)}
        size={'sm'}
      >
        CONSPIRICY BOARD
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(7, e)}
        size={'sm'}
      >
        COMPUTER/PROFILE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(9, e)}
        size={'sm'}
      >
        PHONE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(11, e)}
        size={'sm'}
      >
        REFERENCE BOOK
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(10, e)}
        size={'sm'}
      >
        PUZZLE PAGE
      </Button>
    </div>
  );
}
