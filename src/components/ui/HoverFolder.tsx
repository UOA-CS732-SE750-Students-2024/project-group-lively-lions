import folder_sprite from '../../assets/folder_sprite.png';
import case_paper_sprite from '../../assets/case_paper_sprite.png';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverFolderProps {
  marginTop: string;
  index: number;
  isHoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  isClickedIndex: number;
  setClickedIndex: (index: number) => void;
}

export function HoverFolder({
  marginTop,
  index,
  isHoveredIndex,
  setHoveredIndex,
  isClickedIndex,
  setClickedIndex
}: HoverFolderProps) {
  const isAboveHovered = index <= isHoveredIndex;
  const isAboveClicked = index <= isClickedIndex;

  const hoverOffset = -10; // Distance moved by folder when hovered over
  const clickedOffset = -200; // Distance moved by folder when clicked (selected)

  return (
    <motion.div
      className="relative inline-block"
      style={{ marginTop: marginTop }} // Adjust this value to control the initial vertical overlap
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(-1)} // Remove hover status
      onClick={() =>
        isClickedIndex === index ? setClickedIndex(-1) : setClickedIndex(index)
      }
      animate={{
        y:
          (isAboveClicked ? clickedOffset : 0) +
          (isAboveHovered ? hoverOffset : 0)
      }}
      transition={{ type: 'spring', stiffness: 1000, damping: 30 }}
    >
      <img src={folder_sprite} />
      <AnimatePresence>
        {isClickedIndex === index ? (
          <motion.div
            key={index}
            initial={{ y: '100vh', x: 20 }}
            exit={{ y: '100vh' }}
            animate={{ y: index === isClickedIndex ? 50 : 1000 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="absolute inset-0 flex items-start justify-start text-2xl"
          >
            <img src={case_paper_sprite} />
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
