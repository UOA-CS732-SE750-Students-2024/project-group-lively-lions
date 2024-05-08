import * as ciphersExports from '@/ciphers/ciphers';
import { Screen, Story } from '@/util';
import Echidna from '../ui/echidna';

interface EchidnaMachineProps {
  phrase: string;
  handleScreenButtonClick: (
    // eslint-disable-next-line no-unused-vars
    screen: Screen,
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  puzzleIndex: number;
  handleSolvedPuzzle: () => void;
  story: Story;
}

const EchidnaMachine = ({
  phrase,
  puzzleIndex,
  story,
  handleSolvedPuzzle
}: EchidnaMachineProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="absolute w-[40%]">
          <Echidna
            availableCiphers={Object.values(ciphersExports)}
            handleSolvedPuzzle={handleSolvedPuzzle}
            phrase={phrase}
            solution={story.puzzles[puzzleIndex].solution}
            solve_delay_ms={500}
            showAuxControls={true}
          />
        </div>
      </div>
    </>
  );
};

export default EchidnaMachine;
