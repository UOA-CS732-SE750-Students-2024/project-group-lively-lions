import { Screen } from '@/util';
import { Button } from '../ui/button';

/* 
This is the component for the puzzle page. This comment will need to be updated.
*/

interface PuzzlePageProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function PuzzlePage({ handleScreenButtonClick }: PuzzlePageProps) {
  return (
    <div>
      <p>PUZZLE PAGE</p>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </div>
  );
}
