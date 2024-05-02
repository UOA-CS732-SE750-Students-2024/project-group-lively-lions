import FadeIn from 'react-fade-in';
import SpeechBubble from './speech_bubble';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from './dialog';
import { Button } from './button';
import { motion } from 'framer-motion';
import purrlock from '../../assets/common/PurrlockHolmesNobkgd.png';
import caperton from '../../assets/common/CapybaraFella.png';
import { WoodenCard } from './wooden_card';

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

const HintDialog: React.FC<HintDialogProps> = ({ transcript }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Transcript</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row place-items-center justify-between min-w-[960px] min-h-[540px] w-[calc(60vw)] h-[calc(60vw*9/16)] bg-slate-500 bg-opacity-10 border-none">
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
            />
          </motion.div>
        </WoodenCard>
        <div className="max-h-full p-2 overflow-auto scroll-smooth no-scrollbar">
          <FadeIn delay={1000}>
            {transcript.messages.map((message, index) => (
              <SpeechBubble
                key={index}
                text={message.text}
                arrow={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </FadeIn>
        </div>
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
            />
          </motion.div>
        </WoodenCard>
      </DialogContent>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  );
};

export default HintDialog;
