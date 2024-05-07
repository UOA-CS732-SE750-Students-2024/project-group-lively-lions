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
import lamp from '../../assets/room/main_menu/lamp.png';
import lighting from '../../assets/room/main_menu/lighting.png';
import paper from '../../assets/room/shared/crumpled_paper.png';
import pencilHolder from '../../assets/room/shared/pencil_holder.png';
import eraser from '../../assets/room/shared/eraser.png';
import milk from '../../assets/room/shared/milk.png';
import coffee from '../../assets/room/shared/coffee.png';

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
    <div
      className="w-[100%] h-[100%]"
      style={{
        // backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        imageRendering: 'pixelated'
      }}
    >
      {/* Non interactive visual items lower in scene order*/}
      <img className="absolute right-0" src={lamp} alt="lamp" />
      <img className="absolute bottom-0 w-screen" src={table} alt="table" />

      {/* Cabinet leads to level select screen */}
      <div className="absolute top-[25%] left-[0.5%]">
        <Cabinet handleScreenButtonClick={handleScreenButtonClick} />
      </div>

      {/* Phone shows thought about usage in game */}
      <div
        className="relative top-[45%] left-[20%]"
        onClick={() =>
          configureThought(
            'Im glad I can call the director incase I need some help.'
          )
        }
      >
        <Phone />
      </div>

      {/* Computer leads to profile screen */}
      <div className="relative top-[25%] left-[82%]">
        <Computer handleScreenButtonClick={handleScreenButtonClick} />
      </div>

      {/* Reference book entry point leads to reference book screen */}
      <div className="absolute scale-[150%] top-[70%] left-[21%] rotate-12">
        <ReferenceBookEntryPoint
          handleScreenButtonClick={handleScreenButtonClick}
        />
      </div>

      {/* Non interactive visual items higher in scene order*/}
      <img className="absolute top-[74%] left-[3%]" src={paper} />
      <img className="absolute top-[77%] scale-[110%]" src={paper} />
      <img className="absolute top-[80%] left-[8%]" src={paper} />
      <img className="absolute top-[68%] left-[9%] scale-[95%]" src={paper} />
      <img className="absolute top-[69%] left-[12%] scale-[80%]" src={paper} />
      <img
        className="absolute scale-[210%] top-[46%] left-[19%]"
        src={pencilHolder}
      />
      <img className="absolute top-[56%] left-[18%] scale-[85%]" src={paper} />
      <img className="absolute top-[59%] left-[21%]" src={paper} />
      <img
        className="absolute scale-[230%] top-[46%] left-[67%]"
        src={pencilHolder}
      />
      <img className="absolute top-[64%] left-[73%]" src={eraser} />

      {/* Interactive visual filler items high in scene order*/}
      <img
        className="absolute top-[47%] left-[40%] scale-[250%]"
        onClick={() =>
          configureThought('Mmmmmmmmmmmilkk, I simply must buy some more.')
        }
        src={milk}
      />

      {/* Lighting layer */}
      <div
        className="absolute w-[100%] h-[100%] top-0 pointer-events-none"
        style={{
          backgroundImage: `url(${lighting})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          imageRendering: 'auto'
        }}
      />

      {/* Pop Up Shown when clicking items that are not entry points */}
      {/* Pop Up is a thought bubble that darkens the rest of the screen */}
      <div
        className={
          thoughtShowing ? 'absolute top-0 w-[100%] h-[100%]' : 'invisible'
        }
        style={{ backgroundImage: `url(${shadow})` }}
        onClick={() => setThoughtShowing(false)}
      >
        <div
          className={
            thoughtShowing
              ? 'fixed visible top-[40%] left-[35.5%]'
              : 'invisible'
          }
          onClick={() => setThoughtShowing(false)}
        >
          <SpeechBubble text={thought} arrow="none" />
        </div>
      </div>
    </div>
  );
}
