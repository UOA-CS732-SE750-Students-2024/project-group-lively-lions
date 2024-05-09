import echidnaAuxDisplayInput from '/echidna_aux_display_input.png?url';

interface EchidnaKeyWordInputProps {
  handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// This component handles the creation of the keyboard input for the ECHIDNA
export function EchidnaKeyWordInput({
  handleKeywordChange
}: EchidnaKeyWordInputProps) {
  return (
    <div className="absolute w-[100%] h-[100%]">
      <p className="absolute font-[alagard] opacity-[60%] text-[1.2rem] top-[5%] left-[32%]">
        Keyword
      </p>
      <img
        src={echidnaAuxDisplayInput}
        className="absolute w-[75%] h-[40%] top-[40%] left-[12%]"
        draggable={false}
      />
      <input
        className="absolute w-[75%] h-[40%] top-[40%] left-[12%] bg-transparent font-[alagard] text-[0.9rem] text-[#C1E7EB] text-center p-[5%] outline-none"
        onChange={handleKeywordChange}
      />
    </div>
  );
}

export default EchidnaKeyWordInput;
