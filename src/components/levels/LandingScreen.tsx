import purrlock from '../../assets/PurrlockHolmesNobkgd.png';
import { Button } from '../ui/button';
import { WoodenCard } from '../ui/wooden_card';

interface LandingScreenProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function LandingScreen({
  handleLevelButtonClick
}: LandingScreenProps) {
  return (
    <WoodenCard className="absolute w-[37%] p-10 text-center left-[31.5%] top-[5%]">
      <img className="rounded-3xl" src={purrlock} alt="purrlocklock" />
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(2, e)}
        size={'sm'}
      >
        PLAY
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(1, e)}
        size={'sm'}
      >
        New Player
      </Button>
    </WoodenCard>
  );
}
