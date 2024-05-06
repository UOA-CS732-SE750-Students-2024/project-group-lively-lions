import { Button } from '../ui/button';
import { Screen } from '@/util';

interface MainMenuScreenProps {
  handleScreenButtonClick: (
    level: number,
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
        onClick={(e) => handleScreenButtonClick(Screen.LevelSelect, e)}
        size={'sm'}
      >
        TUTORIAL
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.PlayerInfo, e)}
        size={'sm'}
      >
        EASY
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.SignIn, e)}
        size={'sm'}
      >
        MEDIUM
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.NewPlayer, e)}
        size={'sm'}
      >
        PUZZLE PAGE
      </Button>
    </div>
  );
}
