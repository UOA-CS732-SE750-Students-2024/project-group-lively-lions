import { useState } from 'react';
import { Screen } from '@/util';
import { motion } from 'framer-motion';
//image asset imports
import background from '../../assets/room/main_menu/background.png';
import table from '../../assets/room/main_menu/table.png';
import shadow from '../../assets/room/shared/pop_up_shadow.png';
import lamp from '../../assets/room/main_menu/lamp.png';
import lighting from '../../assets/room/main_menu/lighting.png';
import lightingOff from '../../assets/room/main_menu/lighting_off.png';
import paper from '../../assets/room/shared/crumpled_paper.png';
import pencilHolder from '../../assets/room/shared/pencil_holder.png';
import milk from '../../assets/room/shared/milk.png';
import coffee from '../../assets/room/shared/coffee.png';
import blueYarn from '../../assets/room/shared/blue_yarn.png';
import greenYarn from '../../assets/room/shared/green_yarn.png';
import purpleYarn from '../../assets/room/shared/purple_yarn.png';
import redYarn from '../../assets/room/shared/red_yarn.png';
import pinkYarn from '../../assets/room/shared/pink_yarn.png';
import conspiracyBoard from '../../assets/room/main_menu/conspiracy_board/conspiracy_board_notes_and_text.png';
//UI component imports
import Cabinet from './Cabinet';
import Phone from './Phone';
import Computer from './Computer';
import SpeechBubble from '../ui/SpeechBubble';
import sepia from '../../assets/room/active_game/sepia.png';
import vignettePixel from '../../assets/room/active_game/vignettePixelMainMenu.png';
import vignetteSmooth from '../../assets/room/active_game/vignetteSmoothMainMenu.png';
import coolDark from '../../assets/room/active_game/coolDark.png';
//sound imports
import lampSound from '../../assets/sounds/lamp.mp4';
import woodSound from '../../assets/sounds/wooden_tap.mp4';
import fabricSound from '../../assets/sounds/fabric.mp4';
import glassSound from '../../assets/sounds/glass_chink.mp4';
import { ReferenceBook } from '../desk/ReferenceBook';

interface MainGamePageProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleReturnScreen: (screen: Screen) => void;
  isMuted: boolean;
  isFirstJoin: boolean;
}

export default function MainGamePage({
  handleScreenButtonClick,
  handleReturnScreen,
  isMuted,
  isFirstJoin
}: MainGamePageProps) {
  //Set return screen value to this screen
  handleReturnScreen(Screen.MainGamePage);

  //Handle thought bubbles
  const [thoughtShowing, setThoughtShowing] = useState(false);
  const [thought, setThought] = useState<string>('');
  console.log(isFirstJoin);
  // if (isFirstJoin) {
  //   configureThought('Welcome to the game!');
  // }
  function configureThought(text: string) {
    setThought(text);
    setThoughtShowing(true);
  }

  //handle lighting
  const [lightOn, setLightOn] = useState(true);

  //delay lighting response slightly for realism and audio matching
  function handleLight() {
    setTimeout(function () {
      setLightOn(!lightOn);
    }, 100);
  }

  //Sound effects
  function playLampSound() {
    if (!isMuted) {
      new Audio(lampSound).play();
    }
  }

  function playWoodSound() {
    if (!isMuted) {
      new Audio(woodSound).play();
    }
  }

  function playFabricSound() {
    if (!isMuted) {
      new Audio(fabricSound).play();
    }
  }

  function playGlassSound() {
    if (!isMuted) {
      new Audio(glassSound).play();
    }
  }

  return (
    <motion.div
      className="w-[100%] h-[100%]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        imageRendering: 'pixelated'
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0.7, 1]
      }}
      exit={{ opacity: 0 }}
    >
      {/* visual items lower in scene order*/}
      <img
        className="absolute right-0 cursor-pointer"
        onClick={() => {
          playLampSound();
          handleLight();
        }}
        src={lamp}
        alt="lamp"
        draggable={false}
      />
      <img
        className="absolute bottom-0 w-screen"
        onClick={() => playWoodSound()}
        src={table}
        alt="table"
        draggable={false}
      />

      {/* Main interactive elements */}
      {/* Conspiracy board shows thought about usage in game */}
      <div>
        <img
          className="absolute scale-[300%] top-[17%] left-[44%] transition ease-in-out hover:translate-y-1 cursor-pointer"
          onClick={() => {
            configureThought(
              'This conspiracy board lets me keep track of information during cases!'
            );
            playWoodSound();
          }}
          src={conspiracyBoard}
          alt="conspiracy board"
          draggable={false}
        />
      </div>
      {isFirstJoin ?? (
        <div>
          <p onLoad={() => configureThought('Welcome to the game!')}></p>
        </div>
      )}
      {/* Cabinet leads to level select screen */}
      <div className="absolute top-[25%] left-[0.5%]">
        <Cabinet
          handleScreenButtonClick={handleScreenButtonClick}
          isMuted={isMuted}
        />
      </div>

      {/* Phone shows thought about usage in game */}
      <div
        className="relative top-[45%] left-[23.5%]"
        style={{ maxWidth: '20vw' }}
        onClick={() =>
          configureThought(
            'Im glad I can call the director incase I need some help.'
          )
        }
      >
        <Phone isMuted={isMuted} />
      </div>

      {/* Computer leads to profile screen */}
      <div
        className="relative top-[25%] left-[82%]"
        style={{ maxWidth: 'fit-content' }}
      >
        <Computer
          handleScreenButtonClick={handleScreenButtonClick}
          isMuted={isMuted}
        />
      </div>

      {/* Non interactive visual items higher in scene order*/}
      <img
        className="absolute top-[74%] left-[3%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute top-[77%] scale-[110%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute top-[68%] left-[9%] scale-[95%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute top-[69%] left-[12%] scale-[80%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute scale-[210%] top-[46%] left-[19%]"
        src={pencilHolder}
        draggable={false}
      />
      <img
        className="absolute top-[56%] left-[18%] scale-[85%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute top-[59%] left-[21%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute scale-[230%] top-[49%] left-[68%]"
        src={pencilHolder}
        draggable={false}
      />
      <img
        className="absolute top-[79%] left-[93%] scale-[125%]"
        src={paper}
        draggable={false}
      />

      {/* Interactive visual filler items high in scene order*/}
      <img
        className="absolute top-[47%] left-[40%] scale-[250%] cursor-pointer"
        onClick={() => {
          configureThought('Mmmmmmmmmmmilkk, I simply must buy some more.');
          playGlassSound();
        }}
        src={milk}
        draggable={false}
      />
      {/* Reference book entry point leads to reference book screen */}
      <div className="absolute scale-[150%] top-[71%] left-[20%] rotate-12">
        <ReferenceBook isMuted={isMuted} />
      </div>

      <img
        className="absolute top-[50%] left-[61%] scale-[160%] cursor-pointer"
        onClick={() => {
          configureThought(
            'Coffee has gotten me through many rough nights of casework.'
          );
          playGlassSound();
        }}
        src={coffee}
        draggable={false}
      />
      {/* Cat Heaven */}
      <img
        className="absolute top-[65%] left-[90%] scale-[160%] cursor-pointer"
        onClick={() => {
          configureThought('Now wait just a meowment…');
          playFabricSound();
        }}
        src={greenYarn}
        draggable={false}
      />
      <img
        className="absolute top-[72%] left-[87%] scale-[160%] cursor-pointer"
        onClick={() => {
          configureThought('That case was a total cat-astrophe!!!');
          playFabricSound();
        }}
        src={redYarn}
        draggable={false}
      />
      <img
        className="absolute top-[51%] left-[47%] scale-[160%] cursor-pointer"
        onClick={() => {
          configureThought("Meow you're talking!");
          playFabricSound();
        }}
        src={blueYarn}
        draggable={false}
      />
      <img
        className="absolute top-[53%] left-[53%] scale-[160%] cursor-pointer"
        onClick={() => {
          configureThought('I need a meowtini. Shaken, not purred, of course.');
          playFabricSound();
        }}
        src={purpleYarn}
        draggable={false}
      />
      <img
        className="absolute top-[78%] left-[9%] scale-[150%] cursor-pointer"
        onClick={() => {
          configureThought('This case will go down in hiss-tory!');
          playFabricSound();
        }}
        src={pinkYarn}
        draggable={false}
      />

      {/* Lighting elements */}

      {/* Cool Dark Overlay */}
      <motion.div
        className="absolute w-[100%] h-[100%] top-0 pointer-events-none"
        initial={{ opacity: lightOn ? 0 : 1 }}
        animate={{ opacity: lightOn ? 0 : 1 }}
        transition={{ type: 'spring' }}
      >
        <div
          className="absolute opacity-[50%] w-[100%] h-[100%] top-0 pointer-events-none"
          style={{
            backgroundImage: `url(${coolDark})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            imageRendering: 'pixelated'
          }}
        />
      </motion.div>

      <motion.div
        className="absolute w-[100%] h-[100%] top-0 pointer-events-none"
        initial={{ opacity: lightOn ? 1 : 0 }}
        animate={{ opacity: lightOn ? 1 : 0 }}
        transition={{ type: 'spring' }}
      >
        {/* Hard Pixel Vignette */}
        <div
          className="absolute opacity-[20%] w-[100%] h-[100%] top-0 pointer-events-none"
          style={{
            backgroundImage: `url(${vignettePixel})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            imageRendering: 'pixelated'
          }}
        />

        {/* Sepia Filter */}
        <div
          className="absolute opacity-[8%] w-[100%] h-[100%] top-0 pointer-events-none"
          style={{
            backgroundImage: `url(${sepia})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            imageRendering: 'pixelated'
          }}
        />
      </motion.div>

      {/* Soft Pixel Vignette */}
      <div
        className="absolute opacity-[30%] w-[100%] h-[100%] top-0 pointer-events-none"
        style={{
          backgroundImage: `url(${vignetteSmooth})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          imageRendering: 'pixelated'
        }}
      />

      {/* Pop Up Shown when clicking items that are not entry points */}
      {/* Pop Up is a thought bubble that darkens the rest of the screen */}
      <div
        className={
          thoughtShowing
            ? 'absolute top-0 w-[100%] h-[100%] cursor-pointer'
            : 'invisible'
        }
        style={{ backgroundImage: `url(${shadow})` }}
        onClick={() => setThoughtShowing(false)}
      >
        <div
          className={
            thoughtShowing
              ? 'fixed visible top-[40%] left-[35.5%] cursor-pointer'
              : 'invisible'
          }
          onClick={() => setThoughtShowing(false)}
        >
          <SpeechBubble text={thought} arrow="none" />
        </div>
      </div>
    </motion.div>
  );
}
