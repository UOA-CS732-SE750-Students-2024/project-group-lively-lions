import { Screen } from '@/util';
import { Button } from '../ui/button';
import { ReferenceBookPage } from './ReferenceBookPage';
import cipherInfo from '../../lib/cipherInfo.json';
import { useState } from 'react';
import arrow from '../../assets/room/main_menu/reference_book/arrow.png';
import binders from '../../assets/room/main_menu/reference_book/note-binders.png';

/* 
This is the component for the reference book. It displays the information about two ciphers side by side It passes into these pages the needed information from cipherInfo.json.
If there is an odd number of ciphers, the last page on the right is left blank at the end of the list.
*/

interface ReferenceBookProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  returnToScreen: Screen;
}

export function ReferenceBook({
  handleScreenButtonClick,
  returnToScreen
}: ReferenceBookProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // The following constants make sure to not attempt to access additional ciphers that do not exist.
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

  // Please note that if the description of the cipher is too long, then it will come off the paper as the paper image may not be long enough.
  return (
    <div className="flex flex-col min-h-[540px] h-[calc(60vw*9/16)] min-w-[960px] w-[calc(60vw)] justify-center items-center space-between p-5">
      <div className="flex flex-ro justify-center items-center mb-4">
        {/* Left Arrow */}
        <img
          className="min-w-[48px] w-[calc(3vw)] min-h-[80px] h-[calc(5vw)] rotate-180 hover:scale-105 active:scale-110 cursor-pointer m-x-10"
          onClick={() => handlePageChange(-2)}
          src={arrow}
        />
        {/* Left Page */}
        <ReferenceBookPage
          cipherName={handleGetName(0)}
          encoding={handleGetEncoding(0)}
          decoding={handleGetDecoding(0)}
        />
        {/* Right Page */}
        <ReferenceBookPage
          cipherName={handleGetName(1)}
          encoding={handleGetEncoding(1)}
          decoding={handleGetDecoding(1)}
        />
        {/* Right Arrow */}
        <img
          className="min-w-[48px] w-[calc(3vw)] min-h-[80px] h-[calc(5vw)] hover:scale-105 active:scale-110 cursor-pointer m-x-10"
          onClick={() => handlePageChange(2)}
          src={arrow}
        />
        {/* Page Binder */}
        <img
          className="absolute min-w-[49px] w-[calc(3vw)] min-h-[267px] h-[calc(16vw)] top-[20%] left-[47%] drop-shadow-2xl"
          src={binders}
        />
      </div>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide w-[90%]"
        onClick={(e) => handleScreenButtonClick(returnToScreen, e)}
        size={'sm'}
      >
        EXIT
      </Button>
    </div>
  );
}
