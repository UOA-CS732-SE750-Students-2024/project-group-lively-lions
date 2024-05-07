import { Screen } from '@/util';
import { Button } from '../ui/button';

/* 
This is the component for the reference book. This will need to be updated.
*/

interface ReferenceBookProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function ReferenceBook({ handleScreenButtonClick }: ReferenceBookProps) {
  return (
    <div>
      <p>REFERENCE BOOK</p>
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
