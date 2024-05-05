import {
    EchidnaBase,
    EchidnaCipherButtonBaseDown,
    EchidnaCipherButtonBaseUp,
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
  import { motion } from 'framer-motion';

interface EchidnaProps {
  marginTop: string;
  index: number;
  isHoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  isClickedIndex: number;
  levelIndex: number;
  setClickedIndex: (index: number) => void;
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

  const width = '40%'
  
export function Echidna({

}){
    return (
      <div className='flex flex-col items-center w[100%] pt-[5%]'>
        <img src={EchidnaBase} alt="Echidna Base" className={`absolute w-${width}`}/>
        <img src={EchidnaCipherButtonBaseDown} alt="Echidna Cipher Button Base Down" className={`absolute w-${width}`} />
        <img src={EchidnaCipherButtonBaseUp} alt="Echidna Cipher Button Base Up" className={`absolute w-${width}`} />
        <motion.img src={EchidnaCipherButtonCapDown} alt="Echidna Cipher Button Cap Down" className={`absolute w-${width}`}
        initial={{y: '0%'}}
        animate={{y: ['0%', '0.85%', '0%']}}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        />
        <motion.img src={EchidnaCipherButtonCapUp} alt="Echidna Cipher Button Cap Up" className={`absolute w-${width}`}
        initial={{y: '0%'}}
        animate={{y: ['0%', '0.85%', '0%']}}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        />
        <motion.div className='absolute w-[100%] h-[20.3%] overflow-hidden'>
          <motion.img src={EchidnaPaper} alt="Echidna Paper" className="absolute w-[40%] left-[30%]"
          initial={{y: '0%'}}
          animate={{y: ['0%', '18%', '0%']}}
          transition={{ ease: "easeInOut", duration: 1 }}
          />
        </motion.div>
        <motion.img src={EchidnaPaperShadow} alt="Echidna Green Lamp Off" className={`absolute w-${width}`} />
        <motion.img src={EchidnaGreenLampOff} alt="Echidna Green Lamp Off" className={`absolute w-${width}`} />
        <motion.img src={EchidnaGreenLampOn} alt="Echidna Green Lamp On" className="absolute w-[40%] hidden" />
        <motion.img src={EchidnaHelpTab} alt="Echidna Help Tab" className={`absolute w-${width}`} />
        <motion.img src={EchidnaPaperFeedArms} alt="Echidna Paper Feed Arms" className={`absolute w-${width}`} />
        <motion.img src={EchidnaRedLampOff} alt="Echidna Red Lamp Off" className={`absolute w-${width}`} />
        <motion.img src={EchidnaRedLampOn} alt="Echidna Red Lamp On" className={`absolute w-${width}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, times: [0, 0.2, 0.8, 1] }} />
        <motion.img src={EchidnaSolveLeverHandle} alt="Echidna Solve Lever" className={`absolute w-${width}`}
        initial={{y: '0%'}}
        animate={{y: ['0%', '7%', '0%']}}
        transition={{ ease: "easeInOut", duration: 1 }}
        />
        <motion.img src={EchidnaSolveLeverStem} alt="Echidna Solve Lever" className={`absolute w-${width}`}
        initial={{y: '0%'}}
        animate={{y: ['0%', '7%', '0%']}}
        transition={{ ease: "easeInOut", duration: 1 }}
        />
      </div>  
    );
}
  
  export default Echidna;