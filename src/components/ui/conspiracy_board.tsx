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
            {/* The board */}
            <img
              className="min-h-[540px] h-[calc(60vw*9/16)]"
              src={boardBackground}
            />
            {/* Note 1 */}
            <div className="absolute top-[14%] left-[10%] hover:rotate-12 hover:scale-110 duration-50">
              <ConspiracyNote type="A" />
            </div>
            {/* Note 2 */}
            <div className="absolute top-[52%] left-[15%] hover:rotate-12 hover:scale-110 duration-50">
              <ConspiracyNote type="B" />
            </div>
            {/* Note 3 */}
            <div className="absolute top-[73%] left-[28%] rotate-45 hover:rotate-0 hover:scale-110 duration-50">
              <ConspiracyNote type="A" />
            </div>
            {/* Note 4 */}
            <div className="absolute top-[54%] left-[47%] rotate-12 hover:rotate-45 hover:scale-110 duration-50">
              <ConspiracyNote type="A" />
            </div>
            {/* Note 5 */}
            <div className="absolute top-[27%] left-[43%] rotate-12 hover:rotate-0 hover:scale-110 duration-50">
              <ConspiracyNote type="B" />
            </div>
            {/* Note 6 */}
            <div className="absolute top-[55%] left-[80%] hover:rotate-12 hover:scale-110 duration-50">
              <ConspiracyNote type="A" />
            </div>
            {/* Red strings */}
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
