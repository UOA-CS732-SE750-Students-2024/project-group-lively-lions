import Echidna from './echidna';
import * as ciphers from '../../ciphers/ciphers';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import echidnaLid from '/echidna_lid.png?url';
import { Screen } from '@/util';

interface EchidnaIntroProps{
  handleContinue: (level: Screen) => void;
  startDelay?: number;
  liftDelay?: number;
  titleCardDelay?: number;
  startGameDelay?: number;
}

function EchidnaIntro({
  handleContinue,
  startDelay = 1000,
  liftDelay = 1500,
  titleCardDelay = 1000,
  startGameDelay = 4000,
}: EchidnaIntroProps) {
  const [liftLid, setLiftLid] = useState<boolean>(false);
  const [liftEchidna, setLiftEchidna] = useState<boolean>(false);
  const [startEchidna, setStartEchidna] = useState<boolean>(false);
  const [showTitleCard, setShowTitleCard] = useState<boolean>(false);

  const handleLidClick = () => {
    setLiftLid(true);
    setTimeout(() => {
      setStartEchidna(true);
    }, 1000);
  };

  const handleSolvedPuzzle = () => {
    setTimeout(() => {
      setStartEchidna(false);
    }, startDelay);
    setTimeout(() => {
      setLiftEchidna(true);
    }, startDelay + liftDelay);
    setTimeout(() => {
      setShowTitleCard(true);
    }, startDelay + liftDelay + titleCardDelay);
    setTimeout(() => {
      handleContinue(Screen.MainGamePage);
    }, startDelay + liftDelay + titleCardDelay + startGameDelay);
  };

  return (
    <motion.div className="flex flex-col items-center"
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
              phrase="01001101 01100101 01101111 01110111"
              solution="Meow"
              solve_delay_ms={1000}
              showAuxControls={false}
              active={startEchidna}
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
                />
              ) : 
              <></>
              }
            </AnimatePresence>
          </motion.div>
        ) :
          <></>
        }
      </AnimatePresence>
      <AnimatePresence>
        { showTitleCard ? 
          <motion.div
          key='titleCard'
          className='absolute w-[100%] h-[100%] bg-[black]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'easeOut', duration: 2 }}
          onClick={() => handleContinue(Screen.MainGamePage)}
          >
            <p className='absolute font-[alagard] text-[3rem] text-[#f90d00] text-center text-pretty py-[20%] px-[20%] top-[0.5%]'>
              Purrlock Holmes' Crypawtography Agency
            </p>
            <p className='absolute font-[alagard] text-[3rem] text-[#fc9605] text-center text-pretty py-[20%] px-[20%]'>
              Purrlock Holmes' Crypawtography Agency
            </p>
          </motion.div>
          :
          <></>
        }
      </AnimatePresence>
    </motion.div>
  );
}

export default EchidnaIntro;
