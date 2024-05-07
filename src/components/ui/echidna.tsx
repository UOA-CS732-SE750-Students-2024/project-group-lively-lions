import { useState } from 'react';
import {
    EchidnaBase,
    EchidnaCipherButtonBase,
    EchidnaCipherButtonCapDown,
    EchidnaCipherButtonCapUp,
    EchidnaGreenLampOff,
    EchidnaGreenLampOn,
    EchidnaHelpTab,
    EchidnaPaperFeedArms,
    EchidnaPaper,
    EchidnaPaperShadow,
    EchidnaRedLampOff,
    EchidnaRedLampOn,
    EchidnaSolveLeverHandle,
    EchidnaSolveLeverStem
  } from '../../assets/echidna-2';
  import { AnimatePresence, motion } from 'framer-motion';
  import EchidnaButton from './echidna_button';
  import EchidnaSolveLever from './echidna_solve_lever';
  import * as ciphersExports from '@/ciphers';
  import { CipherType } from '@/Cipher';

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
          phrase: phrase
        });
        setWorkingPhrase(decodedPhrase);
        console.log(decodedPhrase);
      } else if (newCipher.type === CipherType.Keyword) {
        const decodedPhrase = newCipher.decode({
          keyword: keyword,
          phrase: phrase
        });
        setWorkingPhrase(decodedPhrase);
        console.log(decodedPhrase);
      } else if (newCipher.type === CipherType.Substitution) {
        const decodedPhrase = newCipher.decode({ phrase: phrase });
        setWorkingPhrase(decodedPhrase);
        console.log(decodedPhrase);
      }
      // Check for solution found
      if(workingPhrase === solution){
        // Solved animation
        onSolved();
        console.log('solution found.')
      } else{
        // Unsolved animation
      }
      // Animation logic
      setIsSolveLeverDown(false);
    }, solve_delay_ms);
  }

  const handleResetWorkingCipher = () => {
    setWorkingPhrase(phrase);
  }

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
          <EchidnaButton capImage={EchidnaCipherButtonCapUp} 
          onClick={() => {handleCipherChange(true)}} />
        </div>
        {/* DOWN */}
        <div className='absolute w-[9.5%] top-[52%] left-[57%] '>
          <EchidnaButton capImage={EchidnaCipherButtonCapDown} 
          onClick={() => {handleCipherChange(false)}} />
        </div>
        {/* Solve lever */}
        <div className='absolute w-[22%] top-[33%] left-[70%]'>
          <EchidnaSolveLever delay={solve_delay_ms} onClick={handleSolve}/>
        </div>
        {/* Paper feed */}
        <div className='absolute w-[50%] h-[20.4%] top-[6.5%] left-[15.5%] pt-[1%] overflow-hidden'>
          <motion.div
          className='absolute w-[100%]'
          key='paper_div'
          animate={{ y: isSolveLeverDown ? 75 : 0 }}
          transition={{ type: 'spring', stiffness: 1000, damping: 80 }}
          >
            <img className='absolute w-[100%] top-[9%]' src={EchidnaPaper} />
            <p className='absolute pt-[20%] left-[10%]'>{phrase}</p>
          </motion.div>
          <img className='absolute w-[100%] opacity-[30%] h-[8%] top-[92%]' src={EchidnaPaperShadow}/>
        </div>
        {/* Display */}
        <div className='absolute w-[50%] h-[9%] top-[33.5%] left-[15.5%] px-[1%] py-[0.5%]'>
          <motion.p className='absolute text-[1rem] text-[#C1E7EB] font-[alagard] leading-tight'>
            {workingPhrase}
          </motion.p>
        </div>
        {/* Shift setting controls */}
        {/* Keyword setting controls */}
      </div>
  );
}
  
export default Echidna;