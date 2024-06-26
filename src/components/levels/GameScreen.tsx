import { Story, Screen } from '@/util';
import { motion } from 'framer-motion';
import background from '../../assets/room/active_game/background.png';
import { Transcript } from '../ui/HintDialog';
import HintDialog from '../ui/HintDialog';
import paper from '../../assets/room/shared/crumpled_paper.png';
import pencilHolder from '../../assets/room/shared/pencil_holder.png';
import milk from '../../assets/room/shared/milk.png';
import coffee from '../../assets/room/shared/coffee.png';
import blueYarn from '../../assets/room/shared/blue_yarn.png';
import purpleYarn from '../../assets/room/shared/purple_yarn.png';
import conspiracyBoard from '../../assets/room/active_game/conspiracy_board.png';
import exitSign from '../../assets/room/active_game/exit.png';
import ConspiracyBoard, { ConspiracyBoardData } from '../desk/ConspiracyBoard';
import Caperton from '../../assets/common/CapybaraFella.png';
import Purrlock from '../../assets/common/PurrlockHolmesNobkgd.png';
import * as ciphersExports from '@/ciphers/ciphers';
import Echidna from '../ui/echidna';
import sepia from '../../assets/room/active_game/sepia.png';
import vignettePixel from '../../assets/room/active_game/vignettePixel.png';
import vignetteSmooth from '../../assets/room/active_game/vignetteSmooth.png';
import NotePopup from '../desk/NotePopup';
import { useEffect, useState } from 'react';
import woodSound from '../../assets/sounds/wooden_tap.mp4';
import { ReferenceBook } from '../desk/ReferenceBook';
import { delay } from '../../lib/utils';

interface GameScreenProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  phrase: string;
  puzzleIndex: number;
  handleSolvedPuzzle: () => void;
  story: Story;
  showNote: boolean;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
  showBoard: boolean;
  setShowBoard: React.Dispatch<React.SetStateAction<boolean>>;
  allPuzzleSolved: boolean;
  setAllPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
}

/*
* This component holds the creation of the main game screen, and holds navigation to the interactive components.
*/
export default function GameScreen({
  handleScreenButtonClick,
  phrase,
  puzzleIndex,
  handleSolvedPuzzle,
  story,
  showNote,
  setShowNote,
  showBoard,
  setShowBoard,
  allPuzzleSolved,
  setAllPuzzleSolved,
  isMuted
}: GameScreenProps) {

  const [echidnaOn, setEchidnaOn] = useState(true);
  const [resetEchidnaDisplay, setResetEchidnaDisplay] = useState(false);

  // Set up hint system
  const hintText = story.puzzles[puzzleIndex].hint;

  const hintTranscript: Transcript = {
    messages: [
      { sender: 'Purrlock', text: 'Hello, Director!' },
      { sender: 'Capo', text: 'Hi, Detective! What can I do for you?' },
      {
        sender: 'Purrlock',
        text: 'I was just wanting to see if the analysts in B.I.O.M.E where able to get any information from that clue I sent you?'
      },
      {
        sender: 'Purrlock',
        text: 'This case has turned out to be tricker than I first thought, so I would appreciate the help!'
      },
      { sender: 'Capo', text: 'Of course!' },
      {
        sender: 'Capo',
        text: 'I actually just got the reports back from the analysts this morning, but I have been running a bit behind on my paper work today so I forgot to send it to you.'
      },
      { sender: 'Capo', text: 'Let me have a look....' },
      {
        sender: 'Capo',
        text: 'Found it! ' + hintText
      },
      {
        sender: 'Capo',
        text: 'Im honestly not quite sure what that means but I hope it helps!'
      },
      {
        sender: 'Purrlock',
        text: 'Wonderful! Im sure that will help me solve the case.'
      },
      { sender: 'Purrlock', text: 'Thanks Capo! I knew I could count on you.' },
      { sender: 'Capo', text: 'Of course Purrlock, good luck with the case!' }
    ]
  };

  // Set up conspiracy board info
  const boardData: ConspiracyBoardData = {
    notes: [
      {
        story: story.introduction,
        description: story.introduction,
        image: Purrlock
      },
      ...story.puzzles.map((puzzle) => ({
        puzzleName: puzzle.name,
        story: puzzle.story,
        description: puzzle.description,
        image: puzzle.image
      })),
      {
        story: story.conclusion,
        description: story.conclusion,
        image: Caperton
      }
    ]
  };

  const maxNotes = story.puzzles.length + 2;
  const displayBoardData: ConspiracyBoardData = {
    notes: []
  };
  displayBoardData.notes = allPuzzleSolved
    ? boardData.notes.slice(0, puzzleIndex + 3)
    : boardData.notes.slice(0, puzzleIndex + 2);

  function playWoodSound() {
    if (!isMuted) {
      new Audio(woodSound).play();
    }
  }

  async function solvedCurrentPuzzle() {
    await delay(3000)
    setEchidnaOn(false);
    handleSolvedPuzzle();
    await delay(2000);
    setEchidnaOn(true);
  }

  // Show newest note on load
  useEffect(() => {
    setShowNote(true);
  }, [puzzleIndex]);

  return (
    <motion.div
      className="w-[100%] h-[100%]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        imageRendering: 'pixelated'
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0.7, 1]
      }}
      exit={{ opacity: 0 }}
    >
      {/* Interactive Components */}
      {/* Conspiracy board asset linked to conspiracy board system */}
      <div
        onClick={() => playWoodSound()}
        className="absolute left-[15%] scale-[120%] transition ease-in-out hover:translate-y-1 cursor-pointer"
      >
        <ConspiracyBoard
          boardData={displayBoardData}
          maxNotes={maxNotes as 1 | 3 | 5 | 7}
          open={showBoard}
          setOpen={setShowBoard}
        >
          <img
            className="hover:outline outline-white outline-7 cursor-pointer"
            src={conspiracyBoard}
            draggable={false}
          />
        </ConspiracyBoard>
      </div>

      {/* Phone asset linked to hint system */}
      <div className="absolute w-[20%] scale-[150%] top-[32%] left-[10%]">
        <HintDialog transcript={hintTranscript} isMuted={isMuted} />
      </div>

      {/* Exit sign to go back to main game page */}
      <div
        className="absolute left-[87%] scale-[200%] transition ease-in-out hover:translate-y-1 cursor-pointer"
        onClick={(e) => {
          handleScreenButtonClick(Screen.MainGamePage, e);
          playWoodSound();
          setAllPuzzleSolved(false);
        }}
      >
        <img src={exitSign} alt="Exit" draggable={false} />
      </div>

      {/* Non-Interactive filler assets */}
      <img
        className="absolute scale-[400%] top-[32%] left-[-1%]"
        src={pencilHolder}
        draggable={false}
      />
      <img
        className="absolute scale-[150%] top-[48%] left-[-2%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute scale-[160%] top-[51%] left-[6%]"
        src={paper}
        draggable={false}
      />
      <img
        className="absolute scale-[380%] top-[34%] left-[31%]"
        src={milk}
        draggable={false}
      />
      <img
        className="absolute scale-[200%] top-[40%] left-[65%]"
        src={blueYarn}
        draggable={false}
      />
      <img
        className="absolute scale-[200%] top-[44%] left-[72%]"
        src={purpleYarn}
        draggable={false}
      />
      <img
        className="absolute scale-[270%] top-[38%] left-[83%]"
        src={coffee}
        draggable={false}
      />
      <img
        className="absolute scale-[450%] top-[31%] left-[95%]"
        src={pencilHolder}
        draggable={false}
      />

      {/* ECHIDNA machine at the bottom so it is the highest element and is infront of the filler items. */}
      <div className="absolute w-[40%] left-[30%]">
        <Echidna
          availableCiphers={Object.values(ciphersExports)}
          handleSolvedPuzzle={solvedCurrentPuzzle}
          phrase={phrase}
          solution={story.puzzles[puzzleIndex].solution}
          solve_delay_ms={500}
          showAuxControls={true}
          isMuted={isMuted}
          active={echidnaOn}
          resetDisplay={resetEchidnaDisplay}
        />
      </div>

      {/* Hard Pixel Vignette */}
      <div
        className="absolute opacity-[20%] w-[100%] h-[100%] top-0 pointer-events-none"
        style={{
          backgroundImage: `url(${vignettePixel})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          imageRendering: 'pixelated'
        }}
      />

      {/* Reference book */}
      {/* This asset just looks better when on top of the hard pixel vignette, sorry for throwing off the nice grouping. */}
      <div className="absolute scale-[250%] top-[71%] left-[7%] rotate-12">
        <ReferenceBook isMuted={isMuted} />
      </div>

      {/* Sepia Filter */}
      <div
        className="absolute opacity-[9%] w-[100%] h-[100%] top-0 pointer-events-none"
        style={{
          backgroundImage: `url(${sepia})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          imageRendering: 'pixelated'
        }}
      />

      {/* Soft Pixel Vignette */}
      <div
        className="absolute opacity-[20%] w-[100%] h-[100%] top-0 pointer-events-none"
        style={{
          backgroundImage: `url(${vignetteSmooth})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          imageRendering: 'pixelated'
        }}
      />

      {/* Invisible component for displaying new notes */}
      <NotePopup
        index={allPuzzleSolved ? puzzleIndex + 1 : puzzleIndex}
        noteData={
          allPuzzleSolved
            ? boardData.notes[puzzleIndex + 2]
            : boardData.notes[puzzleIndex + 1]
        }
        open={showNote}
        setOpen={setShowNote}
      />
    </motion.div>
  );
}
