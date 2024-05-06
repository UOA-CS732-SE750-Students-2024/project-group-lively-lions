import { Button } from '../ui/button';

/* 
This is the component for the computer visible on the desk on the main menu. The computer is where the user 
can access profile related activities. This includes checking their info, signing in, signing out and creating a new player.
The user can also press the back button to go back to the main menu.
*/

interface ComputerProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function ComputerProfile({ handleLevelButtonClick }: ComputerProps) {
  return (
    <div>
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
        SIGN IN
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(2, e)}
        size={'sm'}
      >
        NEW PLAYER
      </Button>

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
