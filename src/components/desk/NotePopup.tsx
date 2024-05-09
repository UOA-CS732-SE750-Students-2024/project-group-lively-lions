import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '../ui/dialog';
import paper from '../../assets/level-select/case_paper_sprite.png';
import { AnimatePresence, motion } from 'framer-motion';
import { ConspiracyNoteData } from './ConspiracyBoard';
import { WoodenCard } from '../ui/WoodenCard';

interface NotePopupProps {
  index: number;
  noteData: ConspiracyNoteData;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* This component represents a single interactive conspiracy note
*/
const NotePopup: React.FC<NotePopupProps> = ({
  index,
  noteData,
  open,
  setOpen
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="pointer-events-none" />
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
            <p className="absolute text-[2.5rem] text-red-700 font-[alagard] rotate-30 right-[5%] top-[7%]">
              NEW!
            </p>
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

export default NotePopup;
