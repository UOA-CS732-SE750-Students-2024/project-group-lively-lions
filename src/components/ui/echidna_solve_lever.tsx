import { useState } from "react";
import { motion } from "framer-motion";
import { EchidnaSolveLeverHandle, EchidnaSolveLeverStem } from "@/assets/echidna-2";

interface EchidnaSolveLeverProps{
  delay: number;
  onClick: () => void;
}

const EchidnaSolveLever: React.FC<EchidnaSolveLeverProps> = ({delay, onClick}) => {

  const [isPressed, setPressed] = useState(false);

  function pushLever(){
    if (!isPressed) {
      setPressed(true);
      onClick;
      setTimeout(() => {
        setPressed(false);
      }, delay);
    }
  }

  return (
    <div
      onClick={pushLever}
    >
      <motion.img
      key='modal'
      className='absolute w-[100%]'
      src={EchidnaSolveLeverStem}
      animate={{ y: isPressed ? 28 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <motion.img
      key='modal'
      className='absolute w-[100%] cursor-pointer'
      src={EchidnaSolveLeverHandle}
      animate={{ y: isPressed ? 44 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  )
}

export default EchidnaSolveLever;

