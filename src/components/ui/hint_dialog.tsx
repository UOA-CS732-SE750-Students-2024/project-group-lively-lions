import FadeIn from 'react-fade-in';
import SpeechBubble from './speech_bubble';

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
    <div className="grid grid-col3">
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
  );
};

export default HintDialog;
