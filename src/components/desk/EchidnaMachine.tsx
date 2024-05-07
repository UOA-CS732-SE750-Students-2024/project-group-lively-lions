import * as ciphersExports from '@/ciphers/ciphers';
import { Puzzle, Screen, Story } from '@/util';
import Echidna from '../ui/echidna';

interface EchidnaMachineProps {
  phrase: string;
  handleScreenButtonClick: (
    // eslint-disable-next-line no-unused-vars
    screen: Screen,
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  puzzle: Puzzle;
}

const EchidnaMachine = ({
  handleScreenButtonClick,
  phrase,
  puzzle
}: EchidnaMachineProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="absolute w-[40%]">
          <Echidna
            availableCiphers={Object.values(ciphersExports)}
            onSolved={() => {
              console.log('solved');
            }}
            phrase={phrase}
            solution={puzzle.solution}
            solve_delay_ms={500}
          />
        </div>
      </div>
    </>
  );
};

export default EchidnaMachine;
