import computerOff from '../../assets/room/main_menu/computer/computer_off.png';
import computerScreen from '../../assets/room/main_menu/computer/computer_only_screen_and_glow.png';
import { Screen } from '@/util';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import computerBuzzSound from '../../assets/sounds/computer_buzz.mp4';
import computerKeyboardSound from '../../assets/sounds/keyboard.mp4';

interface ComputerProps {
    handleScreenButtonClick: (
        screen: Screen,
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

export default function ({
    handleScreenButtonClick
}: ComputerProps) {

    const [computerIsOn, setComputerIsOn] = useState(false);

    function playComputerBuzzSound() {
        new Audio(computerBuzzSound).play();
    }

    function playComputerKeyboardSound() {
        new Audio(computerKeyboardSound).play();
    }

    return (
        <div
            style={{ imageRendering: 'pixelated' }}>
            <button
                onClick={(e) => { handleScreenButtonClick(Screen.ComputerProfile, e); playComputerKeyboardSound() }}>
                <motion.img
                    className='scale-[400%]'
                    onMouseEnter={() => { setComputerIsOn(true); playComputerBuzzSound() }}
                    src={computerOff}
                    alt="computer" />
                <AnimatePresence>
                    {computerIsOn && (
                        <motion.img
                            className={computerIsOn ? 'absolute top-[0%] scale-[400%] visible' : 'invisible'}
                            onMouseLeave={() => setComputerIsOn(false)}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.5, 0.7, 1, 0.9, 1]
                            }}
                            exit={{ opacity: 0 }}
                            src={computerScreen}
                            alt='computer' />
                    )}
                </AnimatePresence>
            </button>

        </div>
    )
}