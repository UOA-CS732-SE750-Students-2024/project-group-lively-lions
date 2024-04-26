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
  
  return (
    <div className="text-center flex flex-col items-center">
      {['0px', '-650px', '-650px'].map((marginTop, index) => (
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
      <Button
        className="w-[20rem] h-[4rem] font-[BJG] mt-10 mb-10"
        variant="outline"
        onClick={(e) => handleLevelButtonClick(0, e)}
      >
        Back
      </Button>
    </div>
  );
}
