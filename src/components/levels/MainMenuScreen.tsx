import { Levels, Puzzle, Screen, Story } from '@/util';
import { Button } from '../ui/button';
import { LevelSelect } from '../desk/LevelSelect';
import * as ciphersExports from '@/ciphers/ciphers';
import { useState } from 'react';

interface MainMenuScreenProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleLevel: (
    level: Levels,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void; // Added handleLevel property
  level: Levels; // Added level property
  story: Story;
  puzzle: Puzzle;
  setCurrentPhrase: (phrase: string) => void;
}

export default function MainMenuScreen({
  handleScreenButtonClick,
  handleLevel,
  level,
  story,
  puzzle,
  setCurrentPhrase
}: MainMenuScreenProps) {
  function encodePhrase() {
    const puzzleCipher = puzzle.cipher;
    const puzzleSolution = puzzle.solution;

    switch (puzzleCipher[0]) {
      case 'caesar': {
        const keyshift = Math.floor(Math.random() * 26);
        return new ciphersExports.Caesar().encode({
          phrase: puzzleSolution,
          caesarkey: keyshift
        });
      }
      case 'vigenere': {
        const keyword = 'KEYWORD'; //tbd
        return new ciphersExports.Vigenere().encode({
          phrase: puzzleSolution,
          keyword: keyword
        });
      }
      case 'morse': {
        return new ciphersExports.Morse().encode({
          phrase: puzzleSolution
        });
      }
      case 'binary': {
        return new ciphersExports.Binary().encode({
          phrase: puzzleSolution
        });
      }
      case 'emoji': {
        return new ciphersExports.Emoji().encode({
          phrase: puzzleSolution
        });
      }
      case 'polybius': {
        return new ciphersExports.Polybius().encode({
          phrase: puzzleSolution
        });
      }

      default:
        return '';
    }
  }
  const phrase = encodePhrase();
  setCurrentPhrase(phrase);
  console.log(level);
  return (
    <div>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.LevelSelect, e)}
        size={'sm'}
      >
        Level Select
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(0, e)}
        size={'sm'}
      >
        CONSPIRACY BOARD needs link to working board
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.ComputerProfile, e)}
        size={'sm'}
      >
        COMPUTER/PROFILE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.Phone, e)}
        size={'sm'}
      >
        PHONE
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.ReferenceBook, e)}
        size={'sm'}
      >
        REFERENCE BOOK
      </Button>

      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.PuzzlePage, e)}
        size={'sm'}
      >
        PUZZLE PAGE
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.EchidnaMachine, e)}
        size={'sm'}
      >
        ECHIDNA MACHINE
      </Button>
    </div>
  );
}
