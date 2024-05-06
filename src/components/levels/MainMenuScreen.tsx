import { Screen } from '@/util';
import { Button } from '../ui/button';

interface MainMenuScreenProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function MainMenuScreen({
  handleScreenButtonClick
}: MainMenuScreenProps) {
  return (
    <div>
      {/*Cabinet Difficulty Selection*/}
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(5, e)}
        size={'sm'}
      >
        TUTORIAL
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(5, e)}
        size={'sm'}
      >
        EASY
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(5, e)}
        size={'sm'}
      >
        MEDIUM
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(5, e)}
        size={'sm'}
      >
        HARD
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
        onClick={(e) => handleScreenButtonClick(7, e)}
        size={'sm'}
      >
        COMPUTER/PROFILE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(8, e)}
        size={'sm'}
      >
        PHONE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(10, e)}
        size={'sm'}
      >
        REFERENCE BOOK
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(9, e)}
        size={'sm'}
      >
        PUZZLE PAGE
      </Button>
    </div>
  );
}
