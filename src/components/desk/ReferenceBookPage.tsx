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
    <div>
      <img className="w-[100%] bottom-0" src={case_paper_sprite} />
      <div className="absolute inset-0" style={{ overflow: 'hidden' }}></div>
      <div className="absolute left-[10%] top-[10%] w-[80%]">
        <p className="opacity-[70%] text-[1.3rem] font-[alagard]">
          {cipherName}
        </p>
        <p className="opacity-[70%] text-[1rem] font-[alagard]">{encoding}</p>
        <p className="opacity-[70%] text-[1rem] font-[alagard]">{decoding}</p>
      </div>
    </div>
  );
}
