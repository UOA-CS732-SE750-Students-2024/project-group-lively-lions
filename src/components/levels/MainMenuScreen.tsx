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
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(5, e)}
        size={'sm'}
      >
        PLAY
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(4, e)}
        size={'sm'}
      >
        PLAYER INFO
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(3, e)}
        size={'sm'}
      >
        Sign In
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(2, e)}
        size={'sm'}
      >
        New Player
      </Button>
    </div>
  );
}
