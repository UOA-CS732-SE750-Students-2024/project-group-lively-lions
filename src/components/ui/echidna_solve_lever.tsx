import { useState } from 'react';
import { motion } from 'framer-motion';
import echidnaSolveLeverHandle from '/echidna_solve_lever_handle.png?url';
import echidnaSolveLeverStem from '/echidna_solve_lever_stem.png?url';
interface EchidnaSolveLeverProps {
  delay: number;
  onClick: () => void;
}

const EchidnaSolveLever: React.FC<EchidnaSolveLeverProps> = ({
  delay,
  onClick
}) => {
  const [isPressed, setPressed] = useState(false);

  function pushLever() {
    if (!isPressed) {
      setPressed(true);
      onClick();
      setTimeout(() => {
        setPressed(false);
      }, delay);
    }
  }

  return (
    <div onClick={pushLever}>
      <motion.img
        className="absolute w-[100%]"
        src={echidnaSolveLeverStem}
        animate={{ y: isPressed ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <motion.img
        className="absolute w-[100%] cursor-pointer"
        src={echidnaSolveLeverHandle}
        animate={{ y: isPressed ? 44 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

export default EchidnaSolveLever;
