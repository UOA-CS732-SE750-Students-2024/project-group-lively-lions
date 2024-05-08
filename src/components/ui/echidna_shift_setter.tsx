import echidnaAuxButtonBase from '/echidna_aux_button_base.png?url';
import echidnaAuxButtonCapDown from '/echidna_aux_button_cap_down.png?url';
import echidnaAuxButtonCapUp from '/echidna_aux_button_cap_up.png?url';
import echidnaAuxDisplay from '/echidna_aux_display.png?url';

import EchidnaButton from './echidna_button';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EchidnaShiftSetterProps {
  shift: number;
  handleShift: (shiftBy: number) => void;
}

export function EchidnaShiftSetter({
  shift,
  handleShift
}: EchidnaShiftSetterProps) {
  return (
    <div className="absolute w-[100%] h-[100%]">
      {/* Shift setting block */}
      <p className="absolute font-[alagard] opacity-[60%] text-[1.2rem] top-[5%] left-[37%]">
        Shift
      </p>
      {/* Shift setting controls */}
      <div className="absolute w-[15%] left-[60%] top-[37%]">
        <EchidnaButton
          capImage={echidnaAuxButtonCapUp}
          baseImage={echidnaAuxButtonBase}
          onClick={() => {
            handleShift(1);
          }}
        />
      </div>
      <div className="absolute w-[15%] left-[60%] top-[60%]">
        <EchidnaButton
          capImage={echidnaAuxButtonCapDown}
          baseImage={echidnaAuxButtonBase}
          onClick={() => {
            handleShift(-1);
          }}
        />
      </div>
      {/* Shift setting display */}
      <div className="absolute w-[20%] h-[57%] top-[34%] left-[37%]">
        <img
          src={echidnaAuxDisplay}
          className="absolute w-[100%] h-[100%]"
          draggable={false}
        />
        <motion.p
          className="absolute w-[100%] h-[100%] font-[alagard] text-[1.3rem] text-center text-[#C1E7EB] pt-[25%]"
          key={shift + 'shift'}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
          exit={{ opacity: [1, 0, 1, 0, 1, 0] }}
          transition={{ duration: 0.1 }}
        >
          {shift}
        </motion.p>
      </div>
    </div>
  );
}

export default EchidnaShiftSetter;
