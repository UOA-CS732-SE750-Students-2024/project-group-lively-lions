import purrlock from '../../assets/common/PurrlockHolmesNobkgd.png';
import { Button } from '../ui/button';
import { WoodenCard } from '../ui/WoodenCard';
import { randomTagline } from '@/lib/taglines';
import { Screen } from '@/util';

interface LandingScreenProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function LandingScreen({
  handleScreenButtonClick
}: LandingScreenProps) {
  return (
    <div className="flex flex-col place-items-center">
      <h2 className="m-[3%] text-[#D9B26F] text-[1.1rem] font-[alagard] text-pretty">
        "{randomTagline()}"
      </h2>
      <WoodenCard className="absolute w-[30%] p-10 text-center left-[37%] top-[20%]">
        <img
          className="rounded-3xl w-[100%]"
          src={purrlock}
          alt="purrlocklock"
          draggable={false}
        />
        <Button
          className="font-[alagard] text-[1.2rem] tracking-wide mt-2 w-[100%]"
          onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
          size={'sm'}
        >
          START
        </Button>
      </WoodenCard>
    </div>
  );
}
