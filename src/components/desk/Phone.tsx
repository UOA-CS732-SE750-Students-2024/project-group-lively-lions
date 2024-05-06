import { Button } from '../ui/button';

/* 
This is the component for the phone component, visible on the desk of the main menu. Here a user can get hints
to their current puzzle. They can talk with Caperton the Capybara, who will try to help Purrlock with his case.
*/

interface PhoneProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function Phone({ handleLevelButtonClick }: PhoneProps) {
  return (
    <div>
      <p>PHONE</p>
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
