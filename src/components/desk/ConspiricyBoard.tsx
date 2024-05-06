import { Button } from '../ui/button';

/* 
This the the component related to the conspiricy board. Here a user can see the current state of progress
through the currently selected difficulty. It includes an introduction to the story of the difficulty,
and the story for each puzzle solved. It updates as the user completes more puzzles.
*/

interface BoardProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function ConspiricyBoard({ handleLevelButtonClick }: BoardProps) {
  return (
    <div>
      <p>CONSPIRICY BOARD</p>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(0, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </div>
  );
}
