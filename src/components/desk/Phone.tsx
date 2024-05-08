import { Screen } from '@/util';
import { Button } from '../ui/button';
import { Story } from '@/util';
/* 
This is the component for the phone component, visible on the desk of the main menu. Here a user can get hints
to their current puzzle. They can talk with Caperton the Capybara, who will try to help Purrlock with his case.
*/

interface PhoneProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  story: Story;
}

export function Phone({ handleScreenButtonClick, story }: PhoneProps) {
  return (
    <>
      <p>PHONE</p>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </>
  );
}
