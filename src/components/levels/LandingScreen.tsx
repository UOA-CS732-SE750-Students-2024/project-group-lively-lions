import purrlock from '../../assets/common/PurrlockHolmesNobkgd.png';
import { Button } from '../ui/button';
import HintDialog, { Transcript } from '../ui/hint_dialog';
import { WoodenCard } from '../ui/wooden_card';
import { randomTagline } from '@/lib/taglines';

const transcript: Transcript = {
  messages: [
    { sender: 'Purrlock', text: 'Hello, Capo!' },
    { sender: 'Capo', text: 'Hi, Purrlock! What can I do for you?' },
    {
      sender: 'Purrlock',
      text: 'Do you have any additional leads on the investigation?'
    },
    { sender: 'Capo', text: 'Blah labhalabbala...' },
    { sender: 'Purrlock', text: 'Heehe ooohooo...' },
    { sender: 'Capo', text: 'yipeeyipee...' },
    { sender: 'Capo', text: 'yipeeyipee...' },
    { sender: 'Capo', text: 'yipeeyipee...' },
    { sender: 'Capo', text: 'yipeeyipee...' },
    { sender: 'Capo', text: 'yipeeyipee...' }
  ]
};

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
    <div className="flex flex-col place-items-center">
      <h2 className="m-[3%] text-[#D9B26F] text-[1.1rem] font-[alagard] text-pretty">
        "{randomTagline()}"
      </h2>
      <WoodenCard className="absolute w-[30%] p-10 text-center left-[37%] top-[20%]">
        <img
          className="rounded-3xl w-[100%]"
          src={purrlock}
          alt="purrlocklock"
        />
        <Button
          className="font-[alagard] text-[1.2rem] tracking-wide mt-2 w-[100%]"
          onClick={(e) => handleLevelButtonClick(0, e)}
          size={'sm'}
        >
          MEOW
        </Button>
      </WoodenCard>
      <HintDialog transcript={transcript} />
    </div>
  );
}
