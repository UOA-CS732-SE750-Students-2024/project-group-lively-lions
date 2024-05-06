import { HoverFolder } from '../ui/HoverFolder';
import { Button } from '../ui/button';
import { useState } from 'react';
import drawer_face_sprite from '../../assets/level-select/drawer_face_sprite.png';
import { motion } from 'framer-motion';
import { Screen } from '@/util';

interface LevelSelectProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleLevel: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function LevelSelect({
  handleScreenButtonClick,
  handleLevel
}: LevelSelectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const menuItemOffsets = ['0%', '-85%', '-85%'];

  return (
    <motion.div
      className="absolute w-[100%] h-[100%]"
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
              />
            ))}
          </div>
        </div>
        <div
          style={{ imageRendering: 'pixelated' }}
          className="flex flex-col w-[52%] align-bottom"
        >
          <img className="w-[100%] bottom-0" src={drawer_face_sprite} />
          <Button
            className="absolute font-[alagard] text-[1.1rem] mt-5 mb-5 bottom-[9%] w-[20%] left-[40%]"
            onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
