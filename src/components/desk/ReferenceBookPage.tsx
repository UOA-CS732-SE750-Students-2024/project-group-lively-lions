import page from '../../assets/room/main_menu/reference_book/left_page.png';

/* 
This is the component for the reference book. This will need to be updated.
*/
interface ReferencePageProps {
  cipherName: string;
  encoding: string;
  decoding: string;
  diagram: string;
}

export function ReferenceBookPage({
  cipherName,
  encoding,
  decoding,
  diagram,
}: ReferencePageProps) {
  return (
    <div className="flex justify-center relative min-w-[400px] w-[calc(24vw)]">
      <img
        className="min-w-[400px] w-[calc(24vw)] bottom-0"
        src={page}
        draggable={false}
      />
      <div className="absolute left-[10%] top-[0%] w-[80%] h-[95%] pr-[3%] py-[5%] overflow-y-scroll scrollbar">
        <p className="opacity-[70%] text-[1.3rem] font-[alagard] leading-tight">
          {cipherName}
        </p>
        <p className="opacity-[70%] text-[1rem] font-[alagard] leadind-tight">{encoding}</p>
        { diagram != "" ?
        <img className="inline-block mix-blend-multiply py-[1rem] px-[6%] leading-tight" src={diagram} /> 
        :
        <></>
        }
        <p className="opacity-[70%] text-[1rem] font-[alagard]">{decoding}</p>
      </div>
    </div>
  );
}
