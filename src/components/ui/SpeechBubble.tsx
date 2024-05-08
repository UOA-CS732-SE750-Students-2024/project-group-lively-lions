interface SpeechBubbleProps {
  text: string;
  arrow: 'left' | 'right' | 'none';
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, arrow }) => {
  return (
    // Conditionally gives left (white) or right (black) pointing speech bubbles depending on arrow direction
    <div
      className={`p-[12px] relative inline-block m-[20px] text-center font-[PS2] text-[0.75rem] leading-[1.3em] box-border after:content-[''] after:block after:absolute after:box-border w-[350px] 
      ${arrow === 'left' ? 'bg-[#fff] text-[#000] [box-shadow:0_-4px_#fff,_0_-8px_#000,_4px_0_#fff,_4px_-4px_#000,_8px_0_#000,_0_4px_#fff,_0_8px_#000,_-4px_0_#fff,_-4px_4px_#000,_-8px_0_#000,_-4px_-4px_#000,_4px_4px_#000,_4px_12px_rgba(0,0,0,0.1),_12px_4px_rgba(0,0,0,0.1),_8px_8px_rgba(0,0,0,0.1)] after:h-[4px] after:w-[4px] after:top-[20px] after:-left-[8px] after:bg-[white] after:[box-shadow:-4px_-4px_#fff,_-4px_0_#fff,_-8px_0_#fff,_0_-8px_#fff,_-4px_4px_#000,_-8px_4px_#000,_-12px_4px_#000,_-16px_4px_#000,_-12px_0_#000,_-8px_-4px_#000,_-4px_-8px_#000,_0_-4px_#fff]' : ''}
      ${arrow === 'right' ? 'bg-[#000] text-[#fff] [box-shadow:0_-4px_#000,_0_-8px_#fff,_4px_0_#000,_4px_-4px_#fff,_8px_0_#fff,_0_4px_#000,_0_8px_#fff,_-4px_0_#000,_-4px_4px_#fff,_-8px_0_#fff,_-4px_-4px_#fff,_4px_4px_#fff,_4px_12px_rgba(255,255,255,0.1),_12px_4px_rgba(255,255,255,0.1),_8px_8px_rgba(255,255,255,0.1)] after:h-[4px] after:w-[4px] after:top-[20px] after:-right-[8px] after:bg-[black] after:[box-shadow:4px_4px_#000,_4px_0_#000,_8px_0_#000,_0_8px_#000,_4px_-4px_#fff,_8px_-4px_#fff,_12px_-4px_#fff,_16px_-4px_#fff,_12px_0_#fff,_8px_4px_#fff,_4px_8px_#fff,_0_4px_#000] ml-[50px]' : ''}
      ${arrow === 'none' ? 'bg-[#fff] text-[#000] [box-shadow:0_-4px_#fff,_0_-8px_#000,_4px_0_#fff,_4px_-4px_#000,_8px_0_#000,_0_4px_#fff,_0_8px_#000,_-4px_0_#fff,_-4px_4px_#000,_-8px_0_#000,_-4px_-4px_#000,_4px_4px_#000,_4px_12px_rgba(0,0,0,0.1),_12px_4px_rgba(0,0,0,0.1),_8px_8px_rgba(0,0,0,0.1)] after:h-[4px] after:w-[4px] after:top-[20px]' : ''}`}
    >
      {text}
    </div >
  );
};

export default SpeechBubble;
