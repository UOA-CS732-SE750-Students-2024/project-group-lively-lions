import React from 'react';

interface CaesarCipherProps {
  caesarkey: number;
  phrase: string;
}
interface VigenereCipherProps {
  keyword: string;
  phrase: string;
}

interface MorseCipherProps {
  phrase: string;
}

/**
 * A simple Caesar cipher component.
 *
 * @param caesarkey - The key for the Caesar cipher.
 * @param phrase - The phrase to be encoded using the Caesar cipher.
 */
export const SimpleCaesarCipher: React.FC<CaesarCipherProps> = ({
  caesarkey,
  phrase
}) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return phrase
    .split('')
    .map((char) => {
      if (!alphabet.includes(char.toLowerCase())) {
        return char;
      }

      const currIndex = alphabet.indexOf(char.toLowerCase());
      if (caesarkey < 0) {
        caesarkey = 26 + caesarkey;
      }
      const newIndex = (currIndex + caesarkey) % 26;

      return char === char.toUpperCase()
        ? alphabet[newIndex].toUpperCase()
        : alphabet[newIndex];
    })
    .join('');
};

/**
 * VigenereCipher component for encoding a phrase using the Vigenere cipher.
 * @param keyword - The keyword used for encoding.
 * @param phrase - The phrase to be encoded.
 * @returns The encoded phrase as a string.
 */
export const VigenereCipher: React.FC<VigenereCipherProps> = ({
  keyword,
  phrase
}) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const keyLength = keyword.length;
  let keyIndex = 0;

  return phrase
    .split('')
    .map((char) => {
      if (!alphabet.includes(char.toLowerCase())) {
        return char;
      }

      const currIndex = alphabet.indexOf(char.toLowerCase());
      const keyChar = keyword[keyIndex % keyLength];
      const keyIndexInAlphabet = alphabet.indexOf(keyChar.toLowerCase());
      const newIndex = (currIndex + keyIndexInAlphabet) % 26;

      keyIndex++;

      return char === char.toUpperCase()
        ? alphabet[newIndex].toUpperCase()
        : alphabet[newIndex];
    })
    .join('');
};

/**
 * PolybiusCipher component represents a React functional component that encodes a given phrase using the Polybius cipher.
 *
 * @param phrase - The phrase to be encoded.
 * @returns The encoded phrase wrapped in a paragraph element with the "text-white" class.
 */
export const PolybiusCipher: React.FC<CaesarCipherProps> = ({ phrase }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const polybiusSquare = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y'],
    ['Z']
  ];

  /**
   * Encodes a given string using the Polybius cipher.
   *
   * @param str - The string to be encoded.
   * @returns The encoded string.
   */

  return phrase
    .split('')
    .map((char) => {
      if (!alphabet.includes(char.toLowerCase())) {
        return char;
      }

      const charIndex = alphabet.indexOf(char.toLowerCase());
      const row = Math.floor(charIndex / 5);
      const col = charIndex % 5;

      return polybiusSquare[row][col];
    })
    .join('');
};

/**
 * Decodes a given string encoded using the Polybius cipher.
 *
 * @param str - The string to be decoded.
 * @returns The decoded string.
 */
export const decodePolybius = (str: string) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const polybiusSquare = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y'],
    ['Z']
  ];

  return str
    .split('')
    .map((char) => {
      if (!alphabet.includes(char.toLowerCase())) {
        return char;
      }

      const rowIndex = polybiusSquare.findIndex((row) =>
        row.includes(char.toUpperCase())
      );
      const colIndex = polybiusSquare[rowIndex].indexOf(char.toUpperCase());

      return alphabet[rowIndex * 5 + colIndex];
    })
    .join('');
};

/**
 * MorseCodeCipher component encodes a given phrase into Morse code.
 *
 * @param phrase - The phrase to be encoded into Morse code.
 * @returns The encoded phrase in Morse code.
 */
export const MorseCodeCipher: React.FC<MorseCipherProps> = ({ phrase }) => {
  const morseCodeMap: { [key: string]: string } = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
    ' ': '/'
  };
  return phrase
    .toLowerCase()
    .split('')
    .map((char) => {
      return morseCodeMap[char] || char;
    })
    .join(' ');
};

/**
 * Converts a Morse code string to ASCII characters.
 *
 * @param morse - The Morse code string to convert.
 * @returns The ASCII representation of the Morse code string.
 */
export const MorseToAscii: React.FC<MorseCipherProps> = ({ phrase }) => {
  const morseToAsciiMap: { [key: string]: string } = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '/': ' '
  };

  const morseToAscii = (morse: string) => {
    return morse
      .split(' ')
      .map((morseCode) => {
        return morseToAsciiMap[morseCode] || '';
      })
      .join('');
  };

  return morseToAscii(phrase);
};

/**
 * Converts a string of ASCII characters to binary representation.
 *
 * @param str - The input string to convert.
 * @returns The binary representation of the input string.
 */
export const AsciiToBinary: React.FC<MorseCipherProps> = ({ phrase }) => {
  const asciiToBinary = (str: string) => {
    return str
      .split('')
      .map((char) => {
        const asciiCode = char.charCodeAt(0);
        const binaryCode = asciiCode.toString(2);
        return binaryCode;
      })
      .join(' ');
  };

  return asciiToBinary(phrase);
};

/**
 * Converts a binary string to ASCII characters.
 *
 * @param binary - The binary string to convert.
 * @returns The ASCII representation of the binary string.
 */
export const BinaryToAscii: React.FC<MorseCipherProps> = ({ phrase }) => {
  const binaryToAscii = (binary: string) => {
    return binary
      .split(' ')
      .map((binaryCode) => {
        const asciiCode = parseInt(binaryCode, 2);
        const char = String.fromCharCode(asciiCode);
        return char;
      })
      .join('');
  };

  return binaryToAscii(phrase);
};

/**
 * Component that performs emoji substitution cipher encoding on a given phrase.
 *
 * @param {Object} props - The component props.
 * @param {string} props.phrase - The phrase to be encoded.
 * @returns {JSX.Element} The encoded phrase wrapped in a paragraph element.
 */
export const EmojiSubstitutionCipher: React.FC<MorseCipherProps> = ({
  phrase
}) => {
  const emojiMap: { [key: string]: string } = {
    a: '😀',
    b: '😃',
    c: '😄',
    d: '😁',
    e: '😆',
    f: '😅',
    g: '😂',
    h: '🤣',
    i: '😊',
    j: '😇',
    k: '🙂',
    l: '🙃',
    m: '😉',
    n: '😌',
    o: '😍',
    p: '😘',
    q: '😗',
    r: '😙',
    s: '😚',
    t: '😋',
    u: '😛',
    v: '😝',
    w: '😜',
    x: '🤪',
    y: '🤨',
    z: '😎',
    ' ': '🔒'
  };

  /**
   * Encodes a given string using emoji substitution cipher.
   *
   * @param {string} str - The string to be encoded.
   * @returns {string} The encoded string.
   */
  const emojiSubstitution = (str: string) => {
    return str
      .toLowerCase()
      .split('')
      .map((char) => {
        return emojiMap[char] || char;
      })
      .join('');
  };

  return emojiSubstitution(phrase);
};

/**
 * Renders a component that tests various cipher encoding methods.
 */
const CipherTestComponent: React.FC = () => {
  return (
    <div>
      <p className="text-white">Simple Caesar</p>
      <SimpleCaesarCipher caesarkey={1} phrase="hello" />

      <p className="text-white">Vigenere</p>
      <VigenereCipher keyword="hello" phrase="hello" />
      <p className="text-white">Morse Code</p>
      <MorseCodeCipher phrase="hello" />
      <p className="text-white">Emoji Substitution</p>
      <EmojiSubstitutionCipher phrase="hello" />
      <p className="text-white">Binary Converter</p>
      <AsciiToBinary phrase="hello" />
    </div>
  );
};

export default CipherTestComponent;
