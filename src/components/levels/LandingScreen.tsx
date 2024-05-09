import EchidnaIntro from '../ui/echidna_intro';
import { Screen } from '@/util';

interface LandingScreenProps {
  handleContinue: (screen: Screen) => void;
  isMuted: boolean;
}

export function LandingScreen({ handleContinue, isMuted }: LandingScreenProps) {
  return (
    <div className="flex flex-col place-items-center">
      <EchidnaIntro handleContinue={handleContinue} isMuted={isMuted} />
    </div>
  );
}

export default LandingScreen;
