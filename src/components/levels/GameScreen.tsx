import { Screen } from '@/util';
import { motion } from 'framer-motion';
import background from '../../assets/room/active_game/background.png';
import lighting from '../../assets/room/active_game/lighting.png';
import { CipherType } from '@/ciphers/Cipher';
import { Transcript } from '../ui/hint_dialog';
import HintDialog from '../ui/hint_dialog';
import ReferenceBookEntryPoint from '../main_game_page/ReferenceBookEntryPoint';

interface GameScreenProps {
    handleScreenButtonClick: (
        screen: Screen,
        event: React.MouseEvent<HTMLElement>
    ) => void;
    level: number;
    handleReturnScreen: (
        screen: Screen
    ) => void;
}

export default function GameScreen({
    handleScreenButtonClick,
    level,
    handleReturnScreen
}: GameScreenProps) {

    handleReturnScreen(Screen.GameScreen);

    // Replace cypher with actual cypher used by the task 
    const cipher = CipherType.Caesar;

    const exampleTranscript: Transcript = {

        messages: [
            { sender: 'Purrlock', text: 'Hello, Director!' },
            { sender: 'Capo', text: 'Hi, Detective! What can I do for you?' },
            {
                sender: 'Purrlock',
                text: 'I was just wanting to see if the analysts in B.I.O.M.E where able to get any information from that clue I sent you?'
            },
            { sender: 'Purrlock', text: 'This case has turned out to be tricker than I first thought, so I would appreciate the help!' },
            { sender: 'Capo', text: 'Of course!' },
            { sender: 'Capo', text: 'I actually just got the reports back from the analysts this morning, but I have been running a bit behind on my paper work today so I forgot to send it to you.' },
            { sender: 'Capo', text: 'Let me have a look....' },
            { sender: 'Capo', text: 'Found it! It seems like the analysts believe that the clue may have something to do with something called a ' + cipher + ' cipher.' },
            { sender: 'Capo', text: 'Not quite sure what that means but I hope it helps!' },
            { sender: 'Purrlock', text: 'Wonderful! Im sure that will help me solve the case.' },
            { sender: 'Purrlock', text: 'Thanks Capo! I knew I could count on you.' },
            { sender: 'Capo', text: 'Of course Purrlock, good luck with the case!' }
        ]
    };

    return (
        <motion.div className='w-[100%] h-[100%]'
            style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', imageRendering: 'pixelated' }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 0.5, 0.7, 1]
            }}
            exit={{ opacity: 0 }}>
            {/* Lighting layer */}
            <div className='absolute w-[100%] h-[100%] top-0 pointer-events-none' style={{ backgroundImage: `url(${lighting})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', imageRendering: 'auto' }} />
            <div className='absolute w-[30%] scale-[150%] top-[32%] left-[10%]'>
                <HintDialog transcript={exampleTranscript} />
            </div>
            <div className='absolute w-[30%] scale-[250%] top-[81%] left-[21%] rotate-12'>
                <ReferenceBookEntryPoint handleScreenButtonClick={handleScreenButtonClick} />
            </div>
        </motion.div>
    )
}