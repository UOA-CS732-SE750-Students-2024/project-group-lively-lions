import folder_sprite from '../../assets/level-select/folder_sprite.png';
import case_paper_sprite from '../../assets/level-select/case_paper_sprite.png';
import stamp_area_sprite from '../../assets/level-select/stamp_area_sprite.png';
import solved_stamp_sprite from '../../assets/level-select/solved_stamp_sprite.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Screen, Levels, getStory } from '@/util';
import pageSlideSound from '../../assets/sounds/paper_slide.mp4';
import pageHoverSound from '../../assets/sounds/folder_hover.mp4';

interface HoverFolderProps {
  marginTop: string;
  index: number;
  isHoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  isClickedIndex: number;
  levelIndex: number;
  setClickedIndex: (index: number) => void;
  handleLevel: (
    level: Levels,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  isMuted: boolean;
}

export function HoverFolder({
  marginTop,
  index,
  isHoveredIndex,
  setHoveredIndex,
  isClickedIndex,
  setClickedIndex,
  levelIndex,
  handleLevel,
  handleScreenButtonClick,
  isMuted
}: HoverFolderProps) {

  const isAboveHovered = index <= isHoveredIndex;
  const isAboveClicked = index <= isClickedIndex;
  // const blah = fetch('api/players/1');
  // await get_player_data();
  const user = { solved: false }; // Placeholder for user data
  const hoverOffset = -3; // Distance moved by folder when hovered over
  const clickedOffset = -40; // Distance moved by folder when clicked (selected)

  function playPageSlideSound() {
    if (!isMuted) {
      new Audio(pageSlideSound).play();
    }
  }

  function playPageHoverSound() {
    if (!isMuted) {
      new Audio(pageHoverSound).play();
    }
  }

  return (
    <div className="w-[94%]">
      <motion.div
        className="relative inline-block w-[100%]"
        style={{ marginTop: marginTop, imageRendering: 'pixelated' }} // marginTop controls the initial vertical overlap
        onMouseEnter={() => { setHoveredIndex(index); playPageHoverSound() }}
        onMouseLeave={() => setHoveredIndex(-1)} // Clear hover status
        onClick={() => {
          isClickedIndex === index
            ? setClickedIndex(-1)
            : setClickedIndex(index);
          playPageSlideSound()
        }
        }
        animate={{
          y: `${(isAboveClicked ? clickedOffset : 0) +
            (isAboveHovered ? hoverOffset : 0)
            }%`
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        <p
          className="absolute opacity-[70%] top-[2%] left-[8%] font-[alagard] text-[1.5rem]"
          style={{ pointerEvents: 'none' }}
        >
          {getStory(levelIndex).difficulty}
        </p>
        <img className="w-[100%]" src={folder_sprite} draggable={false} />
        <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
          <AnimatePresence>
            {isClickedIndex === index ? (
              // Container for puzzle information
              <motion.div
                key={index}
                initial={{ y: '100%' }}
                exit={{ y: '100%' }}
                animate={{ y: index === isClickedIndex ? '7%' : '100%' }}
                transition={{ type: 'spring', damping: 16 }}
                className="absolute inset-x-[3%] inset-y-[3%] flex"
              >
                <div>
                  <Button
                    className="absolute font-[alagard] text-[1rem] top-[28%] right-[8%] w-[35%]"
                    onClick={(e) => {
                      handleLevel(levelIndex, e);
                      handleScreenButtonClick(Screen.GameScreen, e);
                    }}
                  >
                    Open
                  </Button>
                </div>
                <div className="absolute left-[10%] top-[10%] w-[42%] h-[100%]">
                  <p className="opacity-[70%] text-[1rem] font-[alagard] h-[35%] overflow-y-scroll scrollbar">
                    {getStory(levelIndex).introduction}
                  </p>
                </div>
                <div className="absolute top-[6%] right-[6%] w-[40%] h-[20%]">
                  <p className="absolute opacity-[25%] text-[1.3rem] text-center leading-tight font-[alagard] wrap w-[80%] top-[18%] left-[10%]">
                    {/*Get the user number of puzzles deciphered for the level */}
                    {/** Usser */}/ {getStory(levelIndex).puzzles.length}{' '}
                    Deciphered
                  </p>
                  <img
                    className="opacity-[50%] w-[100%] h-[100%] p-[4%]"
                    src={stamp_area_sprite}
                    draggable={false}
                  />
                  {/* If the user has solved all puzzles in the level, show the solved stamp */}
                  {user.solved ?? (
                    <img
                      className="absolute inset-0 opacity-[75%] w-[100%] h-[100%]"
                      src={solved_stamp_sprite}
                      draggable={false}
                    />
                  )}
                </div>
                <img src={case_paper_sprite} draggable={false} />
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
