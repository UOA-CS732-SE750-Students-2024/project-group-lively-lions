import SpeechBubble from './SpeechBubble';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from './phoneDialog';
import { AnimatePresence, motion } from 'framer-motion';
import purrlock from '../../assets/common/PurrlockHolmesNobkgd.png';
import caperton from '../../assets/common/CapybaraFella.png';
import { WoodenCard } from './WoodenCard';
import Phone from '../mainpage/Phone';

import phoneCallSound from '../../assets/sounds/phonecall.mp4';

export interface Message {
  sender: string;
  text: string;
}

export interface Transcript {
  messages: Message[];
}

interface HintDialogProps {
  transcript: Transcript;
}

// This component takes a transcript
const HintDialog: React.FC<HintDialogProps> = ({ transcript }) => {

  function playCallSound() {
    //new Audio(phoneCallSound).play();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div onClick={() => playCallSound()} style={{ imageRendering: 'pixelated', cursor: 'pointer' }}>
          <Phone />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-row place-items-center justify-between min-w-[960px] min-h-[540px] w-[calc(60vw)] h-[calc(60vw*9/16)] bg-slate-500 bg-opacity-10 border-none">
        {/* Left Sprite */}
        <WoodenCard className="overflow-hidden">
          <motion.div
            className="items-center justify-center"
            initial={{ x: '-50%', y: '0%', opacity: 0 }}
            animate={{ x: '0%', y: '0%', opacity: 1 }}
            transition={{ type: 'linear', duration: 1 }}
          >
            <img
              src={purrlock}
              className="w-[15rem] pulse-slow mb-[-5%] pt-[5%]"
              draggable={false}
            />
          </motion.div>
        </WoodenCard>
        {/* The dialog */}
        <div className="max-h-full p-2 overflow-auto scroll-smooth no-scrollbar">
          <AnimatePresence>
            {transcript.messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 2 + 3,
                  type: 'spring',
                  stiffness: 120
                }}
              >
                <SpeechBubble
                  text={message.text}
                  arrow={message.sender === 'Purrlock' ? 'left' : 'right'}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Right Sprite */}
        <WoodenCard className="overflow-hidden">
          <motion.div
            className="items-center justify-center"
            initial={{ x: '150%', y: '0%', opacity: 0 }}
            animate={{ x: '0%', y: '0%', opacity: 1 }}
            transition={{ type: 'linear', duration: 1 }}
          >
            <img
              src={caperton}
              className="w-[10rem] pulse-fast mb-[-5%] pt-[5%]"
              draggable={false}
            />
          </motion.div>
        </WoodenCard>
      </DialogContent>
      <DialogFooter className="sm:justify-start"></DialogFooter>
    </Dialog>
  );
};

export default HintDialog;
