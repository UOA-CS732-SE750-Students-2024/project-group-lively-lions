import { AnimatePresence, motion } from 'framer-motion';
import boardBackground from '../../assets/room/main_menu/conspiracy_board/conspiracy_board.png';
import board from '../../assets/room/main_menu/conspiracy_board/conspiracy_board_notes_and_text.png';
import strings from '../../assets/room/main_menu/conspiracy_board/conspiracy-strings.png';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import ConspiracyNote from './conspiracy_note';

interface ConspiracyBoardProps {}

// This component takes a transcript
const ConspiracyBoard: React.FC<ConspiracyBoardProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className="min-h-[540px] h-[calc(60vw*9/16)] cursor-pointer"
          src={board}
        />
      </DialogTrigger>
      <DialogContent className="pt-[14rem] flex place-items-center justify-center min-w-[960px] min-h-[540px] w-[calc(60vw)] h-[calc(60vw*9/16)] bg-transparent border-none">
        {/* The board */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{
              type: 'spring',
              stiffness: 120
            }}
          >
            <img
              className="min-h-[540px] h-[calc(60vw*9/16)]"
              src={boardBackground}
            />
            {/* The notes */}
            <div className="absolute top-[10%] left-[10%]">
              <ConspiracyNote />
            </div>

            <div className="absolute top-[45%] left-[20%]">
              <ConspiracyNote />
            </div>
            <img
              className="absolute top-0 left-0 min-h-[540px] h-[calc(60vw*9/16)] pointer-events-none"
              src={strings}
            />
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ConspiracyBoard;
