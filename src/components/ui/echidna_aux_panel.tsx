
import echidnaAuxPanel from '/echidna_aux_panel.png?url';
import echidnaAuxEngraving from '/echidna_aux_engraving.png?url'
import echidnaAuxDisplayInput from '/echidna_aux_display_input.png?url';
import echidnaAuxDisplay from '/echidna_aux_display.png?url';

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import * as ciphersExports from '../../ciphers/ciphers';
import { CipherType } from '../../ciphers/Cipher';
import EchidnaButton from './echidna_button';
import EchidnaKeyWordInput from './echidna_keyword_input';
import EchidnaShiftSetter from './echidna_shift_setter';

interface EchidnaAuxPanelProps {
    showAuxControls: boolean;
    currentCipher: string;
    handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShift: (shiftValue: number) => void;
    shift: number
}

export function EchidnaAuxPanel({
    showAuxControls,
    currentCipher,
    handleKeywordChange,
    handleShift,
    shift
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
                return 'None'
        }
    }

    return (
        <div className="absolute w-[55%] h-[18.2%] top-[64.1%] left-[13%] overflow-hidden">
            <img src={echidnaAuxPanel} className="absolute w-[100%] h-[100%]" />
            <AnimatePresence mode="wait">
                <motion.div
                    key={cipherFunctions(currentCipher)}
                    className="absolute w-[100%] h-[100%]"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ type: 'spring', duration: 0.3 }}>
                    {currentCipher === "Vigenere" ?
                        <EchidnaKeyWordInput handleKeywordChange={handleKeywordChange} />
                        :
                        currentCipher === "Caesar" ?
                            <EchidnaShiftSetter handleShift={handleShift} shift={shift} />
                            :
                            <motion.img src={echidnaAuxEngraving} className='absolute w-[100%] opacity-[10%]' />
                    }
                </motion.div>
            </AnimatePresence>
        </div>

    );
}

export default EchidnaAuxPanel;
