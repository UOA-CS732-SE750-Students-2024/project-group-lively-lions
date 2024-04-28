import folder_sprite from '../../assets/level-select/folder_sprite.png';
import case_paper_sprite from '../../assets/level-select/case_paper_sprite.png';
import stamp_area from '../../assets/level-select/stamp_area.png'
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface HoverFolderProps {
  marginTop: string;
  index: number;
  isHoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  isClickedIndex: number;
  levelIndex: number;
  setClickedIndex: (index: number) => void;
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function HoverFolder({
  marginTop,
  index,
  isHoveredIndex,
  setHoveredIndex,
  isClickedIndex,
  setClickedIndex,
  levelIndex,
  handleLevelButtonClick
}: HoverFolderProps) {
  const isAboveHovered = index <= isHoveredIndex;
  const isAboveClicked = index <= isClickedIndex;

  const hoverOffset = -3; // Distance moved by folder when hovered over
  const clickedOffset = -40; // Distance moved by folder when clicked (selected)

  return (
    <div>
      <motion.div
      className="relative inline-block"
      style={{ marginTop: marginTop }} // Adjust this value to control the initial vertical overlap
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(-1)} // Clear hover status
      onClick={() =>
        isClickedIndex === index ? setClickedIndex(-1) : setClickedIndex(index)
      }
      animate={{
        y:
          `${(isAboveClicked ? clickedOffset : 0) +
          (isAboveHovered ? hoverOffset : 0)}%`
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30 }}
      >
        <p
        className= "absolute opacity-[70%] top-[2%] left-[8%] font-[alagard] text-[1.5rem]"
        style={{pointerEvents: 'none'}}
        >
        Puzzle {index + 1}
        </p>
        <img src={folder_sprite} />
        <div
        className="absolute inset-0"
        style={{ overflow: 'hidden' }}>
          <AnimatePresence>
          {isClickedIndex === index ? (
              // Container for puzzle information
              <motion.div
              key={index}
              initial={{ y: '100vh' }}
              exit={{ y: '100vh' }}
              animate={{ y: index === isClickedIndex ? '7%' : '100%' }}
              transition={{ type: 'spring', damping: 16.5 }}
              className="absolute inset-x-[3%] inset-y-[1%] flex items-start justify-start text-2xl"
              >
                <div>
                  <Button
                  className="absolute font-[alagard] text-[1.5rem] top-[29%] right-[8%] w-[35%] h-[10%]"
                  onClick={(e) => handleLevelButtonClick(levelIndex, e)}
                  >
                    Open
                  </Button>
                </div>
                <div
                className="absolute top-[8%] right-[8%] w-[35%] h-[18%]"
                >
                  <p
                  className="absolute opacity-[25%] text-md font-[alagard] wrap w-[80%] top-[20%] left-[10%]">
                    0/5 Deciphered
                  </p>
                  <img 
                  style={{imageRendering: 'pixelated'}}
                  className="opacity-[50%] w-[100%] h-[100%]"
                  src={stamp_area} 
                  />
                </div>
              <img src={case_paper_sprite} />
            </motion.div>
          ) : (
            // Empty when this folder is not selected
            <></>
          )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
