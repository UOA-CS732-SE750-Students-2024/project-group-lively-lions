import EchidnaIntro from '../ui/echidna_intro';
import { Screen } from '@/util';

interface LandingScreenProps {
  handleContinue: (screen: Screen) => void;
}

export function LandingScreen({
  handleContinue
}: LandingScreenProps) {
  return (
    <div className="flex flex-col place-items-center">
      <EchidnaIntro handleContinue={handleContinue}/>
    </div>
  );
}

export default LandingScreen
