import { HoverFolder } from '../ui/HoverFolder';
import { Button } from '../ui/button';
import { useState } from 'react';

interface LevelSelectProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function LevelSelect({ handleLevelButtonClick }: LevelSelectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const menuItemOffsets = ['0%', '-85%', '-85%'];

  return (
    <div className="flex flex-col items-center h-[100%]">
      <div className="inset-0 pt-[25%] overflow-hidden h-[80%] w-[50%]">
        <div className="text-center flex flex-col items-center">
          {menuItemOffsets.map((marginTop, index) => (
            <HoverFolder
              marginTop={marginTop}
              index={index}
              isHoveredIndex={hoveredIndex}
              isClickedIndex={clickedIndex}
              setHoveredIndex={setHoveredIndex}
              setClickedIndex={setClickedIndex}
              levelIndex={0}
              handleLevelButtonClick={handleLevelButtonClick}
            />
          ))}
        </div>
      </div>
      <Button
        className="font-[alagard] text-[1rem] mt-5 mb-5 bottom-0"
        onClick={(e) => handleLevelButtonClick(0, e)}
      >
        Back
      </Button>
    </div>
  );
}
