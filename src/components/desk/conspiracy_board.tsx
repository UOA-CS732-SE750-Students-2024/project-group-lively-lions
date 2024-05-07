import { AnimatePresence, motion } from 'framer-motion';
import boardBackground from '../../assets/room/main_menu/conspiracy_board/conspiracy_board.png';
import board from '../../assets/room/main_menu/conspiracy_board/conspiracy_board_notes_and_text.png';
import string1 from '../../assets/room/main_menu/conspiracy_board/strings/string1.png';
import string2 from '../../assets/room/main_menu/conspiracy_board/strings/string2.png';
import string3 from '../../assets/room/main_menu/conspiracy_board/strings/string3.png';
import string4 from '../../assets/room/main_menu/conspiracy_board/strings/string4.png';
import string5 from '../../assets/room/main_menu/conspiracy_board/strings/string5.png';
import string6 from '../../assets/room/main_menu/conspiracy_board/strings/string6.png';
import string7 from '../../assets/room/main_menu/conspiracy_board/strings/string7.png';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import ConspiracyNote from './conspiracy_note';
import { Button } from '../ui/button';

export interface ConspiracyNoteData {
  story: string;
  image?: string;
}

export interface ConspiracyBoardData {
  notes: ConspiracyNoteData[];
}

interface ConspiracyBoardProps {
  boardData: ConspiracyBoardData;
  maxNotes: 1 | 3 | 5 | 7;
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

// This component represents the conspiracy board, notes and strings on the board are rendered
// based on the provided props
const ConspiracyBoard: React.FC<ConspiracyBoardProps> = ({
  boardData,
  maxNotes,
  handleLevelButtonClick
}) => {
  const progress = boardData.notes.length;
  const strings = [
    string1,
    string2,
    string3,
    string4,
    string5,
    string6,
    string7
  ];
  let notes: {
    type: string;
    css: string;
  }[];
  switch (maxNotes) {
    case 1:
      notes = [
        {
          type: 'B',
          css: 'absolute top-[27%] left-[43%] rotate-12 hover:rotate-0 hover:scale-110 duration-100'
        }
      ];
      break;
    case 3:
      notes = [
        {
          type: 'A',
          css: 'absolute top-[14%] left-[10%] hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'D',
          css: 'absolute top-[54%] left-[47%] rotate-0 hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'C',
          css: 'absolute top-[10%] left-[65%] hover:rotate-12 hover:scale-110 duration-100'
        }
      ];
      break;
    case 5:
      notes = [
        {
          type: 'A',
          css: 'absolute top-[14%] left-[10%] hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'A',
          css: 'absolute top-[70%] left-[28%] rotate-12 hover:rotate-0 hover:scale-110 duration-100'
        },
        {
          type: 'C',
          css: 'absolute top-[10%] left-[65%] hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'B',
          css: 'absolute top-[27%] left-[43%] rotate-12 hover:rotate-0 hover:scale-110 duration-100'
        },
        {
          type: 'A',
          css: 'absolute top-[55%] left-[80%] hover:rotate-12 hover:scale-110 duration-100'
        }
      ];
      break;
    default:
      notes = [
        {
          type: 'A',
          css: 'absolute top-[14%] left-[10%] hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'B',
          css: 'absolute top-[52%] left-[15%] hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'A',
          css: 'absolute top-[70%] left-[28%] rotate-12 hover:rotate-0 hover:scale-110 duration-100'
        },
        {
          type: 'D',
          css: 'absolute top-[54%] left-[47%] rotate-0 hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'C',
          css: 'absolute top-[10%] left-[65%] hover:rotate-12 hover:scale-110 duration-100'
        },
        {
          type: 'B',
          css: 'absolute top-[27%] left-[43%] rotate-12 hover:rotate-0 hover:scale-110 duration-100'
        },
        {
          type: 'A',
          css: 'absolute top-[55%] left-[80%] hover:rotate-12 hover:scale-110 duration-100'
        }
      ];
      break;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className="min-h-[540px] h-[calc(60vw*9/16)] hover:outline outline-white outline-7 cursor-pointer"
          src={board}
        />
      </DialogTrigger>
      <DialogContent className="pt-[14rem] flex place-items-center justify-center min-w-[960px] min-h-[540px] w-[calc(60vw)] h-[calc(60vw*9/16)] bg-transparent border-none">
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
            {/* Notes */}
            {notes.slice(0, progress).map((note, i) => (
              <div key={i} className={note.css}>
                <ConspiracyNote
                  index={i}
                  type={note.type as 'A' | 'B' | 'D' | 'C'}
                  noteData={boardData.notes[i]}
                />
              </div>
            ))}
            {/* Red strings */}
            {[...Array(Math.ceil((progress * 7) / maxNotes))].map((_, i) => (
              <img
                key={i}
                className="absolute top-0 left-0 min-h-[540px] h-[calc(60vw*9/16)] pointer-events-none"
                src={strings[i]}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
      <p>PHONE</p>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(0, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </Dialog>
  );
};

export default ConspiracyBoard;
