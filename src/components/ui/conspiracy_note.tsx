import { Dialog, DialogContent, DialogFooter, DialogTrigger } from './dialog';
import noteA from '../../assets/room/main_menu/conspiracy_board/noteA.png';
import noteAHighlighted from '../../assets/room/main_menu/conspiracy_board/noteA-highlighted.png';
import noteB from '../../assets/room/main_menu/conspiracy_board/noteB.png';
import noteBHighlighted from '../../assets/room/main_menu/conspiracy_board/noteB-highlighted.png';
import paper from '../../assets/level-select/case_paper_sprite.png';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ConspiracyNoteProps {
  type: 'A' | 'B';
}

// This component takes a transcript
const ConspiracyNote: React.FC<ConspiracyNoteProps> = ({ type }) => {
  const [src, setSrc] = useState(noteA);
  const noteImage = type === 'A' ? noteA : noteB;
  const noteHighlighted = type === 'A' ? noteAHighlighted : noteBHighlighted;

  useEffect(() => {
    setSrc(noteImage);
  }, [type]);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onMouseOver={() => {
          setSrc(noteHighlighted);
        }}
        onMouseOut={() => {
          setSrc(noteImage);
        }}
      >
        <img
          src={src}
          className="min-h-[153px] h-[calc(17vw*9/16)] cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="flex place-items-center justify-center min-w-[600px] min-h-[540px] w-fit h-[calc(60vw*9/16)] bg-transparent border-none">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200
            }}
          >
            <img className=" h-[calc(60vw*9/16)]" src={paper} />
          </motion.div>
        </AnimatePresence>
      </DialogContent>
      <DialogFooter className="sm:justify-start"></DialogFooter>
    </Dialog>
  );
};

export default ConspiracyNote;
