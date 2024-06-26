import echidnaAuxPanel from '/echidna_aux_panel.png?url';
import echidnaAuxEngraving from '/echidna_aux_engraving.png?url';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import EchidnaKeyWordInput from './echidna_keyword_input';
import EchidnaShiftSetter from './echidna_shift_setter';

interface EchidnaAuxPanelProps {
  showAuxControls: boolean;
  currentCipher: string;
  handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShift: (shiftValue: number) => void;
  shift: number;
  isMuted: boolean;
}

/*
* This component controls the creation and logic of the aux panel in the ECHIDNA machine
*/
export function EchidnaAuxPanel({
  showAuxControls,
  currentCipher,
  handleKeywordChange,
  handleShift,
  shift,
  isMuted
}: EchidnaAuxPanelProps) {
  const [isAuxControls, setShowAuxControls] =
    useState<boolean>(showAuxControls);

  function cipherFunctions(cipherName: string) {
    switch (cipherName) {
      case 'Vigenere':
        return 'Keyword';
      case 'Caesar':
        return 'Shift';
      default:
        return 'None';
    }
  }

  return (
    <div className="absolute w-[55%] h-[18.2%] top-[64.1%] left-[13%] overflow-hidden">
      <img
        src={echidnaAuxPanel}
        className="absolute w-[100%] h-[100%]"
        draggable={false}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={cipherFunctions(currentCipher)}
          className="absolute w-[100%] h-[100%]"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: 'spring', duration: 0.3 }}
        >
          {currentCipher === 'Vigenere' ? (
            <EchidnaKeyWordInput handleKeywordChange={handleKeywordChange} />
          ) : currentCipher === 'Caesar' ? (
            <EchidnaShiftSetter
              handleShift={handleShift}
              shift={shift}
              isMuted={isMuted}
            />
          ) : (
            <motion.img
              draggable={false}
              src={echidnaAuxEngraving}
              className="absolute w-[100%] opacity-[10%]"
              drag={false}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EchidnaAuxPanel;
