import { useState, useEffect } from 'react';
import {
    EchidnaBase,
    EchidnaCipherButtonBase,
    EchidnaCipherButtonCapDown,
    EchidnaCipherButtonCapUp,
    EchidnaGreenLampOff,
    EchidnaGreenLampOn,
    EchidnaPaperFeedArms,
    EchidnaPaper,
    EchidnaPaperShadow,
    EchidnaRedLampOff,
    EchidnaRedLampOn,
    EchidnaAuxButtonBase,
    EchidnaAuxButtonCapDown,
    EchidnaAuxButtonCapUp,
    EchidnaAuxDisplay,
    EchidnaAuxDisplayInput,
    EchidnaResetButtonBase,
    EchidnaResetButtonCap,
    EchidnaAuxPanel
  } from '../../assets/echidna-2';
  import { AnimatePresence, motion } from 'framer-motion';
  import EchidnaButton from './echidna_button';
  import EchidnaSolveLever from './echidna_solve_lever';
  import * as ciphersExports from '../../ciphers/ciphers';
  import { CipherType } from '../../ciphers/Cipher';

interface EchidnaProps {
  solve_delay_ms: number;
  phrase: string;
  solution: string;
  onSolved: () => void;
  availableCiphers: (typeof ciphersExports.Caesar | typeof ciphersExports.Vigenere | typeof ciphersExports.Polybius | typeof ciphersExports.Morse | typeof ciphersExports.Binary | typeof ciphersExports.Emoji)[]
}

export function Echidna({
  solve_delay_ms,
  phrase,
  solution,
  onSolved,
  availableCiphers,
}: EchidnaProps){

  const [selectedCipher, setSelectedCipher] = useState<string>(availableCiphers[0].name.toString());
  const [cipherSelectUp, setCipherSelectUp] = useState<boolean>(true);
  const [cipherAnimatingOut, setCipherAnimatingOut] = useState<boolean>(false);
  const [isSolveLeverDown, setIsSolveLeverDown] = useState<boolean>(false);
  const [workingPhrase, setWorkingPhrase] = useState<string>(phrase);
  const [shift, setShift] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const [greenLampOn, setGreenLampOn] = useState<boolean>(false);
  const [redLampOn, setRedLampOn] = useState<boolean>(false);
  const [displayOn, setDisplayOn] = useState<boolean>(false);

  /** Cipher-select button function
   * @param {boolean} up Used for animating the cipher-select rotor "spin" direction.
   */
  const handleCipherChange = (up: boolean) => {
    setCipherAnimatingOut(true);
    setCipherSelectUp(up);
    setTimeout(() => {
      // Find position of current cipher type in ciphers list
      const currentIndex = availableCiphers.findIndex(
        (cipher) => cipher.name.toString() === selectedCipher
      );
      // Set the new cipher type
      let nextIndex;
      if (up) {
        nextIndex =
          (currentIndex - 1 + availableCiphers.length) % availableCiphers.length;
      } else {
        nextIndex = (currentIndex + 1) % availableCiphers.length;
      }
      setSelectedCipher(availableCiphers[nextIndex].name.toString());
      setCipherAnimatingOut(false);
    }, 250);
  };

  /** Called when solve lever is clicked */
  const handleSolve = () =>{
    setIsSolveLeverDown(true);
    setTimeout(() => {
      // (Timeout called in sync with the lever coming back up)
      // Decipher logic
      const cipherValues = availableCiphers;
      const index = cipherValues.findIndex(
        (cipher) => cipher.name.toString() === selectedCipher
      );
      const cipher = cipherValues[index]
      const newCipher = new cipher();
      if (newCipher.type === CipherType.Caesar) {
        const decodedPhrase = newCipher.decode({
          caesarkey: shift,
          phrase: workingPhrase
        });
        setWorkingPhrase(decodedPhrase);
        decodedPhrase === solution ? handleSolutionFound() : handleSolutionNotFound();
        console.log(decodedPhrase);
      } else if (newCipher.type === CipherType.Keyword) {
        const decodedPhrase = newCipher.decode({
          keyword: keyword,
          phrase: workingPhrase
        });
        setWorkingPhrase(decodedPhrase);
        decodedPhrase === solution ? handleSolutionFound() : handleSolutionNotFound();
        console.log(decodedPhrase);
      } else if (newCipher.type === CipherType.Substitution) {
        const decodedPhrase = newCipher.decode({ phrase: workingPhrase });
        setWorkingPhrase(decodedPhrase);
        decodedPhrase === solution ? handleSolutionFound() : handleSolutionNotFound();
        console.log(decodedPhrase);
      }
      // Animation logic
      setIsSolveLeverDown(false);
    }, solve_delay_ms);
  }

  function handleSolutionFound(){
    onSolved();
    setRedLampOn(false);
    setGreenLampOn(true);
    console.log('Solution found.');
  }

  function handleSolutionNotFound(){
    if(!greenLampOn){
      setRedLampOn(true);
      setTimeout(() => {
        setRedLampOn(false);
      }, 500)
    }
    console.log('Solution not found.');
  }

  function initialDisplayDelay(){
    setTimeout(() => {
      setDisplayOn(true);
    }, 800)
  }

  const handleResetWorkingCipher = () => {
    setWorkingPhrase(phrase);
  }

  const handleShift = (shiftBy: number) => {
    setShift(shift + shiftBy)
  }

  const handleKeywordChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  })

  // Anything that needs to happen on first load goes here
  useEffect(() => {
    initialDisplayDelay();
  })

  return (
    /* Centers component with some top padding */
      <div className={`absolute w-[100%] pt-[5%]`}>
        {/* The wood, bakelite and aluminum base of the mighty "Echidna I" cipher machine */}
        <img src={EchidnaBase} alt="Echidna Base" className='w-[100%]'/>
        {/* Masks the text outside the bounds of the cipher-select rotor display */}
        <div className='absolute top-[50%] left-[17.5%] h-[5.4%] w-[34.5%] px-[1.5%] py-[1%] overflow-hidden'>
          {/* Cipher-select display, populated with available cipher options for current puzzle */}
          <AnimatePresence initial={false} mode='wait'>
            <motion.p
            key={selectedCipher}
            className={"font-[alagard] text-[1.2rem] leading-[1.2rem]"}
            initial={{ y: cipherSelectUp ? '-1.4rem' : '1.4rem' }}
            animate={{ y: cipherAnimatingOut ? cipherSelectUp ? '1.4rem' : '-1.5rem' : 0 }}
            transition={{ type: 'spring', duration: 0.15 }}
            >
            {selectedCipher}
            </motion.p>
          </AnimatePresence>
        </div>
        {/* Cipher-select buttons */}
        {/* UP */}
        <div className='absolute w-[9.5%] top-[47%] left-[57%] '>
          <EchidnaButton 
          capImage={EchidnaCipherButtonCapUp} 
          baseImage={EchidnaCipherButtonBase}
          onClick={() => {handleCipherChange(true)}} />
        </div>
        {/* DOWN */}
        <div className='absolute w-[9.5%] top-[52%] left-[57%] '>
          <EchidnaButton 
          capImage={EchidnaCipherButtonCapDown} 
          baseImage={EchidnaCipherButtonBase}
          onClick={() => {handleCipherChange(false)}} />
        </div>
        {/* Solve lever */}
        <div className='absolute w-[22%] top-[33%] left-[70%]'>
          <EchidnaSolveLever delay={solve_delay_ms} onClick={handleSolve}/>
        </div>
        {/* Paper feed */}
        <div className='absolute w-[50%] h-[20.4%] top-[6.5%] left-[15.5%] pt-[1%] overflow-hidden'>
          {/* Paper Motion */}
          <motion.div
          className='absolute w-[100%]'
          initial={{y: -1000}}
          key='paper_div'
          animate={{ y: isSolveLeverDown ? 75 : 0 }}
          transition={{ type: 'spring', stiffness: 1000, damping: 80 }}
          >
            <img className='absolute w-[100%] top-[9%]' src={EchidnaPaper} />
            <p className='absolute font-[alagard] pt-[20%] left-[10%]'>{phrase}</p>
          </motion.div>
          <img className='absolute w-[100%] opacity-[30%] h-[8%] top-[92%]' src={EchidnaPaperShadow}/>
        </div>
        <img className='absolute w-[53%] h-[5%] top-[22.5%] left-[14%]' src={EchidnaPaperFeedArms}/>
        {/* Display */}
        <div className='absolute w-[50%] h-[9%] top-[33.5%] left-[15.5%] px-[1%] py-[0.5%]'>
          <AnimatePresence>
            {displayOn ?
            <motion.p 
            key={workingPhrase}
            className='absolute text-[1.5rem] text-[#C1E7EB] font-[alagard] leading-tight'
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
            exit={{ opacity: [1, 0, 1, 0, 1, 0] }}
            transition={{ duration: 0.2 }}
            >
              {workingPhrase}
            </motion.p> 
            : <></>}
          </AnimatePresence>
        </div>
        {/* Reset Button */}
        <div className='absolute w-[8.5%] top-[48%] left-[6%]'>
          <EchidnaButton 
          capImage={EchidnaResetButtonCap}
          baseImage={EchidnaResetButtonBase}
          onClick={handleResetWorkingCipher}
          />
        </div>
        {/* Auxilliary controls panel */}
        <div className='absolute w-[55%] h-[21.2%] top-[60.9%] left-[13%] overflow-hidden'>
          <img src={EchidnaAuxPanel} className='absolute w-[100%] h-[100%]' />
          <AnimatePresence mode='wait'>
            <motion.div
            className='absolute w-[100%] h-[100%]'
            initial={{y: 1000}}
            key='aux_control_panel'
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 1000, damping: 80 }}
            >
              {/* Keyword setting block */}
              <p className='absolute font-[alagard] opacity-[40%] text-[1.2rem] top-[5%] left-[13%]'>
                Keyword
              </p>
              <img src={EchidnaAuxDisplayInput} className='absolute w-[55%] h-[38%] top-[40%] left-[3%]' />
              <input 
              className='absolute w-[55%] h-[38%] top-[40%] left-[3%] bg-transparent font-[alagard] text-[0.9rem] text-[#C1E7EB] p-[5%] outline-none'
              onChange={handleKeywordChange}
              />
              {/* Shift setting block */}
              <p className='absolute font-[alagard] opacity-[40%] text-[1.2rem] top-[5%] right-[11%]'>
                Shift
              </p>
              {/* Shift setting block */}
              <div className='absolute w-[15%] left-[82%] top-[35%]'>
                <EchidnaButton 
                  capImage={EchidnaAuxButtonCapUp}
                  baseImage={EchidnaAuxButtonBase}
                  onClick={() => {handleShift(1)}}
                />
              </div>
              <div className='absolute w-[15%] left-[82%] top-[58%]'>
                <EchidnaButton 
                  capImage={EchidnaAuxButtonCapDown}
                  baseImage={EchidnaAuxButtonBase}
                  onClick={() => {handleShift(-1)}}
                />
              </div>
              {/* Shift setting display */}
              <div className='absolute w-[20%] h-[50%] top-[34%] left-[60%]'>
                <img src={EchidnaAuxDisplay} className='absolute w-[100%] h-[100%]'/>
                <motion.p className='absolute w-[100%] h-[100%] font-[alagard] text-[1.3rem] text-center text-[#C1E7EB] pt-[25%]'
                key={shift + 'shift'}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                exit={{ opacity: [1, 0, 1, 0, 1, 0] }}
                transition={{ duration: 0.1 }}
                >
                  {shift}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Solution lamps */}
        <div className='absolute w-[25%] top-[11%] left-[63%]'>
          <img src={EchidnaGreenLampOff} className='absolute w-[100%]'/>
          <AnimatePresence mode='wait'>
            {greenLampOn ? 
            <motion.img src={EchidnaGreenLampOn} className='absolute w-[100%]'
            key='greenlampon'
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0, 0.5] }}
            transition={{ duration: 0.2 }}/>
            : <></>
            }
          </AnimatePresence>
        </div>
        <div className='absolute w-[22%] top-[12.7%] left-[75%]'>
          <img src={EchidnaRedLampOff} className='absolute w-[100%]'/>
          <AnimatePresence mode='wait'>
            {redLampOn ? 
            <motion.img src={EchidnaRedLampOn} className='absolute w-[100%]'
            key='redlampon'
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0, 0.5] }}
            exit={{ opacity: [0.5, 0, 0.5, 0] }}
            transition={{ duration: 0.1 }}/>
            : <></>
            }
          </AnimatePresence>
        </div>
      </div>
  );
}

export default Echidna;