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

interface EchidnaProps {
  base_width_percent: number;
  available_ciphers: string[];
}

export function Echidna({
  base_width_percent,
  available_ciphers
}: EchidnaProps){

  const [selectedCipher, setSelectedCipher] = useState<number>(0);
  const [cipherSelectUp, setCipherSelectUp] = useState<boolean>(true);
  const [animatingOut, setAnimatingOut] = useState<boolean>(false);

  const handleCipherChange = (up: boolean) => {
    setAnimatingOut(true);
    setCipherSelectUp(up);
    setTimeout(() => {
    setSelectedCipher(up ? 
      (selectedCipher + 1) % available_ciphers.length : 
      ((selectedCipher - 1) + available_ciphers.length) % available_ciphers.length);
      setAnimatingOut(false);
    }, 250);
  };

  function handleSolve(){

  }

  return (
    /* Centers component with some top padding */
    <div className='flex flex-col items-center w[100%] pt-[5%]'>
      {/* The wood, bakelite and aluminum base of the mighty "Echidna I" cipher machine */}
      <img src={EchidnaBase} alt="Echidna Base" className={`absolute w-[${base_width_percent}%]`}/>
      {/* Masks the text outside the bounds of the cipher-select rotor display */}
      <div className='absolute top-[49%] left-[37%] h-[5%] w-[14%] pl-[1%] pt-[0.5%] overflow-hidden'>
        {/* Cipher-select display, populated with available cipher options for current puzzle */}
        <AnimatePresence initial={false} mode='wait'>
          <motion.p
          key={available_ciphers[selectedCipher]}
          className={"font-[alagard] text-[1.2rem] leading-[1.2rem]"}
          initial={{ y: cipherSelectUp ? '-1.4rem' : '1.4rem' }}
          animate={{ y: animatingOut ? cipherSelectUp ? '1.4rem' : '-1.5rem' : 0 }}
          transition={{ type: 'spring', duration: 0.15 }}
          >
          {available_ciphers[selectedCipher]}
          </motion.p>
        </AnimatePresence>
      </div>
      {/* Cipher-select buttons */}
      {/* UP */}
      <div className='absolute w-[4%] top-[46.5%] left-[52.5%] '>
        <EchidnaButton capImage={EchidnaCipherButtonCapUp} 
        onClick={() => {handleCipherChange(true)}} />
      </div>
      {/* DOWN */}
      <div className='absolute w-[4%] top-[51.5%] left-[52.5%] '>
        <EchidnaButton capImage={EchidnaCipherButtonCapDown} 
        onClick={() => {handleCipherChange(false)}} />
      </div>
      {/* Solve lever */}
      <div className='absolute w-[8.8%] top-[34%] left-[58%]'>
        <EchidnaSolveLever delay={500} onClick={handleSolve}/>
      </div>

      
      {/* Paper feed */}
    </div>  
  );
}
  
export default Echidna;