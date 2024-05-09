import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EchidnaCipherButtonProps {
  capImage: string;
  baseImage: string;
  onClick: () => void;
}

/*
* This styles the buttons for the echidna machine
*/
const EchidnaButton: React.FC<EchidnaCipherButtonProps> = ({
  capImage,
  baseImage,
  onClick
}) => {
  const [isPressed, setPressed] = useState(false);
  const variants = {
    pressed: { y: '10%' },
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
        src={baseImage}
        alt="button base"
        onDragStart={(e) => {
          e.preventDefault();
          return false;
        }}
        draggable={false}
      />
      <motion.img
        src={capImage}
        alt="button cap"
        animate={isPressed ? 'pressed' : 'notPressed'}
        variants={variants}
        transition={{ duration: 0.1 }}
        className="absolute w-[100%] cursor-pointer"
        onDragStart={(e) => {
          e.preventDefault();
          return false;
        }}
        drag={false}
      />
    </div>
  );
};

export default EchidnaButton;
