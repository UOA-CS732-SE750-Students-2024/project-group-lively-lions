import { HoverFolder } from '../ui/HoverFolder';
import { Button } from '../ui/button';
import { useState } from 'react';
import drawer_face_sprite from '../../assets/level-select/drawer_face_sprite.png';
import { motion } from 'framer-motion';
import { Screen, Story } from '@/util';
import filing_cabinet_close from '../../assets/sounds/filing_cabinet_close.mp3';

interface LevelSelectProps {
  handleScreenButtonClick: (screen: Screen, event: React.MouseEvent) => void;
  handleLevel: (
    // eslint-disable-next-line no-unused-vars
    level: number,
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  story: Story;
}

export function LevelSelect({
  handleScreenButtonClick,
  handleLevel,
  story
}: LevelSelectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const menuItemOffsets = ['-5%', '-87%', '-87%', '-87%'];

  function play_sound() {
    new Audio(filing_cabinet_close).play();
  }

  return (
    <motion.div
      className="absolute w-[100%] h-[100%] select-none"
      key="modal"
      initial={{ y: '-100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', damping: 18 }}
    >
      <div className="flex flex-col items-center h-[100%] w-[100%] pb-[1%]">
        <div className="flex flex-col items-center overflow-hidden h-[80%] w-[100%]">
          <div
            style={{ imageRendering: 'pixelated' }}
            className="flex flex-col items-center w-[50%] h-[100%] pt-[22%] bg-drawer-bottom bg-[cover]"
          >
            {menuItemOffsets.map((marginTop, index) => (
              <HoverFolder
                marginTop={marginTop}
                index={index}
                isHoveredIndex={hoveredIndex}
                isClickedIndex={clickedIndex}
                setHoveredIndex={setHoveredIndex}
                setClickedIndex={setClickedIndex}
                levelIndex={index}
                handleLevel={handleLevel}
                story={story}
              />
            ))}
          </div>
        </div>
        <div
          style={{ imageRendering: 'pixelated' }}
          className="flex flex-col w-[52%] align-bottom"
        >
          <img
            className="w-[100%] bottom-0 hover:scale-105 duration-300"
            src={drawer_face_sprite}
            onClick={(e: React.MouseEvent<HTMLImageElement>) => {
              handleScreenButtonClick(Screen.MainGamePage, e);
              play_sound();
            }}
            draggable={false}
          />
          <p className="absolute font-[alagard] opacity-70 text-[2rem] bottom-[10%] left-[47%] pointer-events-none">
            Back
          </p>
        </div>
      </div>
    </motion.div>
  );
}
