import { Screen } from '@/util';
import { ReferenceBookPage } from './ReferenceBookPage';
import cipherInfo from '../../lib/cipherInfo.json';
import { useState } from 'react';
import arrow from '../../assets/room/main_menu/reference_book/arrow.png';
import binders from '../../assets/room/main_menu/reference_book/note-binders.png';
import pageSound from '../../assets/sounds/page_turn.mp4';
import clickSound from '../../assets/sounds/click.mp4';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import bookHoverSound from '../../assets/sounds/book_slide.mp4';
import bookOpenSound from '../../assets/sounds/book_open.mp4';
import refBook from '../../assets/room/shared/reference_book.png';
import { motion } from 'framer-motion';
/* 
This is the component for the reference book. It displays the information about two ciphers side by side It passes into these pages the needed information from cipherInfo.json.
If there is an odd number of ciphers, the last page on the right is left blank at the end of the list.
*/

interface ReferenceBookProps {
  isMuted: boolean;
}

export function ReferenceBook({ isMuted }: ReferenceBookProps) {
  const [currentPage, setCurrentPage] = useState(0);

  function playBookHoverSound() {
    if (!isMuted) {
      new Audio(bookHoverSound).play();
    }
  }
  function playBookOpenSound() {
    if (!isMuted) {
      new Audio(bookOpenSound).play();
    }
  }

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

  // Sound Effect functions

  function playPageSound() {
    if (!isMuted) {
      new Audio(pageSound).play();
    }
  }

  function playClickSound() {
    if (!isMuted) {
      new Audio(clickSound).play();
    }
  }

  // Please note that if the description of the cipher is too long, then it will come off the paper as the paper image may not be long enough.
  return (
    <Dialog>
      <DialogTrigger>
        <motion.img
          className="hover:animate-book-shuffle min-h-[170px] h-[calc(19vw*9/16)]"
          onMouseOver={() => playBookHoverSound()}
          onClick={() => playBookOpenSound()}
          src={refBook}
          alt="book"
          draggable={false}
        />
      </DialogTrigger>
      <DialogContent className="flex flex-col min-h-[400px] h-[calc(40vw*9/16)] min-w-[780px] w-[calc(45vw)] justify-center items-center space-between p-5 bg-transparent border-none">
        <div>
          <div className="flex flex-ro justify-center items-center mb-4">
            {/* Left Arrow */}
            <img
              className="min-w-[48px] w-[calc(3vw)] min-h-[80px] h-[calc(5vw)] rotate-180 hover:scale-105 active:scale-110 cursor-pointer m-x-10"
              onClick={() => {
                handlePageChange(-2);
                playPageSound();
              }}
              src={arrow}
              draggable={false}
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
              onClick={() => {
                handlePageChange(2);
                playPageSound();
              }}
              src={arrow}
              draggable={false}
            />
            {/* Page Binder */}
            <img
              className="absolute min-w-[49px] w-[calc(3vw)] min-h-[267px] h-[calc(16vw)] top-[20%] left-[47%] drop-shadow-2xl"
              src={binders}
              draggable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
