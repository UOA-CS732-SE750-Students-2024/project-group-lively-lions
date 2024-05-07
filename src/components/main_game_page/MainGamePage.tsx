import background from '../../assets/room/main_menu/background.png';
import table from '../../assets/room/main_menu/table.png';
import Cabinet from './Cabinet';
import Phone from './Phone';
import { Screen } from '@/util';
import Computer from './Computer';
import ReferenceBookEntryPoint from './ReferenceBookEntryPoint';
import SpeechBubble from '../ui/speech_bubble';
import { useState } from 'react';
import shadow from '../../assets/room/shared/pop_up_shadow.png';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

interface MainGamePageProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function MainGamePage({
  handleScreenButtonClick
}: MainGamePageProps) {

  const [thoughtShowing, setThoughtShowing] = useState(false);
  const [thought, setThought] = useState<string>('');

  function configureThought(text: string) {
    setThought(text);
    setThoughtShowing(true);
  }

  return (
    <div className='w-[100%] h-[100%]' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', imageRendering: 'pixelated' }}>
      <img className='absolute bottom-0 w-screen' src={table} alt="table" />
      <div className='absolute top-[25%] left-[0.5%]' >
        <Cabinet handleScreenButtonClick={handleScreenButtonClick} />
      </div>
      <div
        className='relative top-[45%] left-[20%]'
        onClick={() => configureThought("Im glad I can call the director incase I need some help.")}>
        <Phone />
      </div>
      <div className='relative top-[25%] left-[82%]'>
        <Computer handleScreenButtonClick={handleScreenButtonClick} />
      </div>
      <div className='absolute scale-[150%] top-[70%] left-[21%] rotate-12'>
        <ReferenceBookEntryPoint handleScreenButtonClick={handleScreenButtonClick} />
      </div>
      <div className={thoughtShowing ? 'absolute top-0 w-[100%] h-[100%]' : 'invisible'} style={{ backgroundImage: `url(${shadow})` }} onClick={() => setThoughtShowing(false)}>
        <div
          className={thoughtShowing ? 'fixed visible top-[40%] left-[35.5%]' : 'invisible'}
          onClick={() => setThoughtShowing(false)}>
          <SpeechBubble text={thought} arrow='none' />
        </div>
      </div>
    </div>
  );
}
