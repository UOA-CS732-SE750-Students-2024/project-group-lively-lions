import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EchidnaCipherButtonBase } from '../../assets/echidna-2'


interface EchidnaCipherButtonProps {
  capImage: string;
  onClick: () => void;
}

const EchidnaButton: React.FC<EchidnaCipherButtonProps> = ({capImage, onClick}) => {
  const [isPressed, setPressed] = useState(false);
  const variants = {
    pressed: { y: 3 },
    notPressed: { y: 0 }
  };
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      <img 
      className="absolute w-[100%]" 
      src={EchidnaCipherButtonBase} 
      alt="button base" 
      onDragStart={(e) => { e.preventDefault(); return false; }}
      />
      <motion.img 
      key='modal'
      src={capImage} 
      alt="button cap"
      animate={isPressed ? 'pressed' : 'notPressed'}
      variants={variants}
      transition={{ duration: 0.1 }}
      className="absolute w-[100%] cursor-pointer"
      onDragStart={(e) => { e.preventDefault(); return false; }}
      drag={false}
      />
    </div>
  );
}

export default EchidnaButton;