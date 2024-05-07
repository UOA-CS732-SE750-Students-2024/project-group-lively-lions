import { Screen } from '@/util';
import { Button } from '../ui/button';
import { ReferenceBookPage } from './ReferenceBookPage';
import cipherInfo from '../../lib/cipherInfo.json';
import { useState } from 'react';

/* 
This is the component for the reference book. This will need to be updated.
*/

interface ReferenceBookProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function ReferenceBook({ handleScreenButtonClick }: ReferenceBookProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (increment: number): void => {
    if (
      currentPage + increment < cipherInfo.cipherList.length &&
      currentPage + increment >= 0
    ) {
      setCurrentPage(currentPage + increment);
    }
  };

  const handleGetName = (increment: number): string => {
    if (currentPage + increment < cipherInfo.cipherList.length) {
      return cipherInfo.cipherList[currentPage + increment].name;
    } else {
      return '';
    }
  };

  const handleGetEncoding = (increment: number): string => {
    if (currentPage + increment < cipherInfo.cipherList.length) {
      return cipherInfo.cipherList[currentPage + increment].encoding;
    } else {
      return '';
    }
  };

  const handleGetDecoding = (increment: number): string => {
    if (currentPage + increment < cipherInfo.cipherList.length) {
      return cipherInfo.cipherList[currentPage + increment].decoding;
    } else {
      return '';
    }
  };

  return (
    <div>
      <div className="flow-root">
        <p
          className="
      relative bg-[#dde7e9] rounded-md
      w-[calc(30vw)] h-[calc(45vw*9/16)]
      min-w-[425px] min-h-[337.5px]
      overflow-scroll no-scrollbar float-left"
        >
          <ReferenceBookPage
            cipherName={handleGetName(0)}
            encoding={handleGetEncoding(0)}
            decoding={handleGetDecoding(0)}
          />
        </p>
        <p
          className="
      relative bg-[#dde7e9] rounded-md
      w-[calc(30vw)] h-[calc(45vw*9/16)]
      min-w-[425px] min-h-[337.5px]
      overflow-scroll no-scrollbar float-right"
        >
          <ReferenceBookPage
            cipherName={handleGetName(1)}
            encoding={handleGetEncoding(1)}
            decoding={handleGetDecoding(1)}
          />
        </p>
      </div>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={() => handlePageChange(2)}
        size={'sm'}
      >
        NEXT
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={() => handlePageChange(-2)}
        size={'sm'}
      >
        BACK
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
        size={'sm'}
      >
        EXIT
      </Button>
    </div>
  );
}
