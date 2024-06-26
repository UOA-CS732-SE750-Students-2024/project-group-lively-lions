import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '../ui/dialog';
import noteA from '../../assets/room/main_menu/conspiracy_board/notes/noteA.png';
import noteAHighlighted from '../../assets/room/main_menu/conspiracy_board/notes/noteA-highlighted.png';
import noteB from '../../assets/room/main_menu/conspiracy_board/notes/noteB.png';
import noteBHighlighted from '../../assets/room/main_menu/conspiracy_board/notes/noteB-highlighted.png';
import noteC from '../../assets/room/main_menu/conspiracy_board/notes/noteC.png';
import noteCHighlighted from '../../assets/room/main_menu/conspiracy_board/notes/noteC-highlighted.png';
import noteD from '../../assets/room/main_menu/conspiracy_board/notes/noteD.png';
import noteDHighlighted from '../../assets/room/main_menu/conspiracy_board/notes/noteD-highlighted.png';
import paper from '../../assets/level-select/case_paper_sprite.png';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ConspiracyNoteData } from './ConspiracyBoard';
import { WoodenCard } from '../ui/WoodenCard';

interface ConspiracyNoteProps {
  index: number;
  type: 'A' | 'B' | 'C' | 'D';
  noteData: ConspiracyNoteData;
  newLabel: boolean;
}

/* This component represents a single interactive conspiracy note
*/
const ConspiracyNote: React.FC<ConspiracyNoteProps> = ({
  index,
  type,
  noteData,
  newLabel
}) => {
  const [src, setSrc] = useState(noteA);
  const noteImage =
    type === 'A' ? noteA : type === 'B' ? noteB : type === 'C' ? noteC : noteD;
  const noteHighlighted =
    type === 'A'
      ? noteAHighlighted
      : type === 'B'
        ? noteBHighlighted
        : type === 'C'
          ? noteCHighlighted
          : noteDHighlighted;

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
        onClick={() => {
          setSrc(noteHighlighted);
        }}
      >
        <img
          src={src}
          className="min-h-[153px] h-[calc(17vw*9/16)] cursor-pointer"
          draggable={false}
        />
      </DialogTrigger>
      <DialogContent className="pt-[14rem] flex place-items-center justify-center min-w-[600px] min-h-[540px] w-fit h-[calc(60vw*9/16)] bg-transparent border-none">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{
              type: 'spring',
              stiffness: 200
            }}
          >
            {/* Note background */}
            <img
              className="min-h-[540px] h-[calc(60vw*9/16)]"
              src={paper}
              draggable={false}
            />
            {/* 'New' label */}
            {newLabel ? (
              <p className="absolute text-[2.5rem] text-red-700 font-[alagard] rotate-30 right-[5%] top-[7%]">
                NEW!
              </p>
            ) : (
              <></>
            )}
            {/* Note title */}
            <p className="absolute opacity-[70%] text-[2rem] font-[alagard] left-[42%] top-[5%]">
              {`Note ${index + 1}`}
            </p>
            {noteData.puzzleName ? (
              <p className="absolute opacity-[70%] text-[1.3rem] font-[alagard] left-[30%] top-[13%]">
                {noteData.puzzleName}
              </p>
            ) : (
              <></>
            )}
            {/* Note content */}
            <div className="absolute h-[calc(45vw*9/16)] w-[80%] left-[10%] top-[20%] text-[1rem] font-[alagard] overflow-y-scroll max-h-full scrollbar">
              {noteData.image ? (
                <WoodenCard className="min-h-[210px] h-[calc(12vw*9/16)] overflow-hidden float-left mr-4">
                  <motion.div
                    className="items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'linear', duration: 1 }}
                  >
                    <img
                      src={noteData.image}
                      className="w-[10rem] pulse-slow mb-[-5%] pt-[5%]"
                      draggable={false}
                    />
                  </motion.div>
                </WoodenCard>
              ) : (
                <></>
              )}
              <p className="text-[1.2rem] opacity-[60%] antialiased">
                {noteData.story}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
      <DialogFooter className="sm:justify-start"></DialogFooter>
    </Dialog>
  );
};

export default ConspiracyNote;
