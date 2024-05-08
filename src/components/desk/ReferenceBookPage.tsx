import case_paper_sprite from '../../assets/level-select/case_paper_sprite.png';

/* 
This is the component for the reference book. This will need to be updated.
*/
interface ReferencePageProps {
  cipherName: string;
  encoding: string;
  decoding: string;
}

export function ReferenceBookPage({
  cipherName,
  encoding,
  decoding
}: ReferencePageProps) {
  return (
    <div className="flex justify-center relative min-w-[400px] w-[calc(24vw)]">
      <img
        className="min-w-[400px] w-[calc(24vw)] bottom-0"
        src={case_paper_sprite}
      />
      <div className="absolute left-[10%] top-[20%] w-[80%] h-[70%] overflow-y-scroll scrollbar">
        <p className="opacity-[70%] text-[1.3rem] font-[alagard]">
          {cipherName}
        </p>
        <p className="opacity-[70%] text-[1rem] font-[alagard]">{encoding}</p>
        <p className="opacity-[70%] text-[1rem] font-[alagard]">{decoding}</p>
      </div>
    </div>
  );
}
