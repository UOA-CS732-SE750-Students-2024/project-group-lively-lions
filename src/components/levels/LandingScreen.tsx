import purrlock from '../../assets/common/PurrlockHolmesNobkgd.png';
import { Button } from '../ui/button';
import EchidnaIntro from '../ui/echidna_intro';
import { WoodenCard } from '../ui/WoodenCard';
import { randomTagline } from '@/lib/taglines';
import { Screen } from '@/util';

interface LandingScreenProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

function continueToGame(){
  console.log('continue')
}

export default function LandingScreen({
  handleScreenButtonClick
}: LandingScreenProps) {
  return (
    <div className="flex flex-col place-items-center">
      <EchidnaIntro handleContinue={continueToGame}/>
    </div>
  );
}
