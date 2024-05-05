import EchidnaMachine from './EchidnaMachine';
import { Button } from '../ui/button';

const GamePageTemplate = () => {
  const phrase = 'Hello world';
  const handleEchidna = () => {
    // open echidna view
  };
  return (
    <div>
      <Button>Level Select Cabinet</Button>
      <Button> Conspiracy Board</Button>
      <div id="desk">
        <Button>phone hints</Button>
        <Button>computer</Button>
        <Button> reference book</Button>
        <Button onClick={handleEchidna}> Echidna Machine</Button>
        <EchidnaMachine phrase={phrase} />
      </div>
    </div>
  );
};
export default GamePageTemplate;
