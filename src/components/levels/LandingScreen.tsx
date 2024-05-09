import EchidnaIntro from '../ui/echidna_intro';
import { Screen } from '@/util';

interface LandingScreenProps {
  handleContinue: (screen: Screen) => void;
  isMuted: boolean;
  playMusic: () => void;
}

export function LandingScreen({ handleContinue, isMuted, playMusic }: LandingScreenProps) {
  return (
    <div className="flex flex-col place-items-center">
      <EchidnaIntro handleContinue={handleContinue} isMuted={isMuted} playMusic={playMusic} />
    </div>
  );
}

export default LandingScreen;
