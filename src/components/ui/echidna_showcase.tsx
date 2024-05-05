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
  EchidnaRedLampOff,
  EchidnaRedLampOn,
  EchidnaSolveLever
} from '../../assets/echidna';
import { delay, motion } from 'framer-motion';


/**
 * This component is for testing animations on the Echidna without worrying about things like "functionality" and "centering divs".
 */
const showcaseDelays = [1, 1.5, 2, 2.5, 3, 3.5]

const EchidnaShowcase = () => {
    return (
      <div className='flex flex-col items-center w[100%] pt-[5%]'>
        <img src={EchidnaBase} alt="Echidna Base" className="absolute w-[40%]"/>
        <img src={EchidnaCipherButtonBaseDown} alt="Echidna Cipher Button Base Down" className="absolute w-[40%]" />
        <img src={EchidnaCipherButtonBaseUp} alt="Echidna Cipher Button Base Up" className="absolute w-[40%]" />
        <motion.img src={EchidnaCipherButtonCapDown} alt="Echidna Cipher Button Cap Down" className="absolute w-[40%]"
        initial={{y: '0%'}}
        animate={{y: ['0%', '0.85%', '0%']}}
        transition={{ ease: "easeInOut", duration: 0.5, delay: showcaseDelays[1] }}
        />
        <motion.img src={EchidnaCipherButtonCapUp} alt="Echidna Cipher Button Cap Up" className="absolute w-[40%]"
        initial={{y: '0%'}}
        animate={{y: ['0%', '0.85%', '0%']}}
        transition={{ ease: "easeInOut", duration: 0.5, delay: showcaseDelays[0]}}
        />
        <motion.div className='absolute w-[100%] h-[20.3%] overflow-hidden'>
          <motion.img src={EchidnaPaper} alt="Echidna Paper" className="absolute w-[40%] left-[30%]"
          initial={{y: '0%'}}
          animate={{y: ['0%', '18%', '0%']}}
          transition={{ ease: "easeInOut", duration: 1, delay: showcaseDelays[2] }}
          />
        </motion.div>
        <motion.img src={EchidnaGreenLampOff} alt="Echidna Green Lamp Off" className="absolute w-[40%]" />
        <motion.img src={EchidnaGreenLampOn} alt="Echidna Green Lamp On" className="absolute w-[40%] hidden" />
        <motion.img src={EchidnaHelpTab} alt="Echidna Help Tab" className="absolute w-[40%]" />
        <motion.img src={EchidnaPaperFeedArms} alt="Echidna Paper Feed Arms" className="absolute w-[40%]" />
        <motion.img src={EchidnaRedLampOff} alt="Echidna Red Lamp Off" className="absolute w-[40%]" />
        <motion.img src={EchidnaRedLampOn} alt="Echidna Red Lamp On" className="absolute w-[40%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: showcaseDelays[4], duration: 1, times: [0, 0.2, 0.8, 1] }} />
        <motion.img src={EchidnaSolveLever} alt="Echidna Solve Lever" className="absolute w-[40%]"
        initial={{y: '0%'}}
        animate={{y: ['0%', '7%', '0%']}}
        transition={{ ease: "easeInOut", duration: 1, delay: showcaseDelays[2] }}
        />
      </div>  
    );
  }

export default EchidnaShowcase;