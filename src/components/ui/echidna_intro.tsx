import Echidna from './echidna';
import * as ciphers from '../../ciphers/ciphers';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import echidnaLid from '/echidna_lid.png?url';
import { Screen } from '@/util';
import lidSound from '../../assets/sounds/lift_box.mp3';
import gameSound from '../../assets/sounds/gameMusic.mp4';

interface EchidnaIntroProps {
  handleContinue: (level: Screen) => void;
  startDelay?: number;
  liftDelay?: number;
  titleCardDelay?: number;
  startGameDelay?: number;
  isMuted: boolean;
  playMusic: () => void;
}

function EchidnaIntro({
  handleContinue,
  startDelay = 2000,
  liftDelay = 1000,
  titleCardDelay = 1000,
  startGameDelay = 4000,
  isMuted,
  playMusic
}: EchidnaIntroProps) {
  const [liftLid, setLiftLid] = useState<boolean>(false);
  const [liftEchidna, setLiftEchidna] = useState<boolean>(false);
  const [startEchidna, setStartEchidna] = useState<boolean>(false);
  const [showTitleCard, setShowTitleCard] = useState<boolean>(false);

  const handleLidClick = () => {
    if (!isMuted) {
      new Audio(lidSound).play();
    }
    setLiftLid(true);
    setTimeout(() => {
      setStartEchidna(true);
    }, 1000);
  };

  const handleSolvedPuzzle = () => {
    if (!isMuted) {
      playMusic();
    }
    setTimeout(() => {
      setStartEchidna(false);
    }, startDelay);
    setTimeout(() => {
      setLiftEchidna(true);
    }, startDelay + liftDelay);
    setTimeout(
      () => {
        setShowTitleCard(true);
      },
      startDelay + liftDelay + titleCardDelay
    );
    setTimeout(
      () => {
        handleContinue(Screen.MainGamePage);
      },
      startDelay + liftDelay + titleCardDelay + startGameDelay
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'easeOut', duration: 2 }}
    >
      <AnimatePresence mode="wait">
        {!liftEchidna ? (
          <motion.div
            key="echidna"
            className="absolute w-[40%]"
            initial={{ y: -800 }}
            animate={{ y: 0 }}
            exit={{ y: -800 }}
            transition={{ type: 'easeInOut', duration: 0.6 }}
          >
            <Echidna
              availableCiphers={[ciphers.Binary]}
              handleSolvedPuzzle={() => {
                handleSolvedPuzzle();
              }}
              phrase="01001101 01100101 01101111 01110111 01110010 01101001 01100001 01110010 01110100 01111001 00100000 01000111 01100001 01101101 01100101 01110011 00100000 01010000 01110010 01100101 01110011 01100101 01101110 01110100 01110011 00101110 00101110 00101110"
              solution="Meowriarty Games Presents..."
              solve_delay_ms={1000}
              showAuxControls={false}
              active={startEchidna}
              isMuted={isMuted}
            />
            <AnimatePresence mode="wait">
              {!liftLid ? (
                <motion.img
                  key="lid"
                  className="absolute w-[100%] pt-[5%] cursor-pointer"
                  src={echidnaLid}
                  onClick={handleLidClick}
                  whileHover={{ y: liftLid ? -800 : -10 }}
                  exit={{ y: -800 }}
                  transition={{ duration: 1 }}
                  drag={false}
                />
              ) : (
                <></>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTitleCard ? (
          <motion.div
            key="titleCard"
            className="absolute w-[100%] h-[100%] bg-[black]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'easeOut', duration: 2 }}
            onClick={() => handleContinue(Screen.MainGamePage)}
          >
            <p className="absolute font-[alagard] text-[3rem] text-[#f90d00] text-center text-pretty py-[20%] px-[20%] top-[0.5%]">
              Purrlock Holmes' Crypawtography Agency
            </p>
            <p className="absolute font-[alagard] text-[3rem] text-[#fc9605] text-center text-pretty py-[20%] px-[20%]">
              Purrlock Holmes' Crypawtography Agency
            </p>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default EchidnaIntro;
