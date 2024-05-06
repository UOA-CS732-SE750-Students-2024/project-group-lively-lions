import { Button } from '../ui/button';

/* 
This is the component for the reference book. This will need to be updated.
*/

interface ReferenceBookProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function ReferenceBook({ handleLevelButtonClick }: ReferenceBookProps) {
  return (
    <div>
      <p>REFERENCE BOOK</p>
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
