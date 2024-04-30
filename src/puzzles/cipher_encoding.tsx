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

interface KeywordShiftCipherProps {
  caesarkey: number;
  keyword: string;
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

  const caesar = (str: string, caesarkey: number) => {
    return str
      .split('')
      .map((char) => {
        if (!alphabet.includes(char.toLowerCase())) {
          return char;
        }

        const currIndex = alphabet.indexOf(char.toLowerCase());
        const newIndex = (currIndex + caesarkey) % 26;

        return char === char.toUpperCase()
          ? alphabet[newIndex].toUpperCase()
          : alphabet[newIndex];
      })
      .join('');
  };

  return <p className="text-white">{caesar(phrase, caesarkey)}</p>;
};

/**
 * VigenereCipher component for encoding a phrase using the Vigenere cipher.
 * @param keyword - The keyword used for encoding.
 * @param phrase - The phrase to be encoded.
 * @returns The encoded phrase as a React element.
 */
export const VigenereCipher: React.FC<VigenereCipherProps> = ({
  keyword,
  phrase
}) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const vigenere = (str: string, keyword: string) => {
    const keyLength = keyword.length;
    let keyIndex = 0;

    return str
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

  return <p className="text-white">{vigenere(phrase, keyword)}</p>;
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
  const polybius = (str: string) => {
    return str
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

  return <p className="text-white">{polybius(phrase)}</p>;
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

  const morseCode = (str: string) => {
    return str
      .toLowerCase()
      .split('')
      .map((char) => {
        return morseCodeMap[char] || char;
      })
      .join(' ');
  };

  return <p className="text-white">{morseCode(phrase)}</p>;
};

/**
 * KeywordShiftCipher component represents a React functional component that applies a keyword shift cipher to a given phrase.
 *
 * @param {KeywordShiftCipherProps} props - The component props.
 * @param {number} props.caesarkey - The caesar key used for the cipher.
 * @param {string} props.keyword - The keyword used for the cipher.
 * @param {string} props.phrase - The phrase to be encoded using the cipher.
 * @returns {JSX.Element} The rendered component.
 */
export const KeywordShiftCipher: React.FC<KeywordShiftCipherProps> = ({
  caesarkey,
  keyword,
  phrase
}) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const keywordShift = (str: string, keyword: string, caesarkey: number) => {
    const keywordLength = keyword.length;
    let keywordIndex = 0;

    return str
      .split('')
      .map((char) => {
        if (!alphabet.includes(char.toLowerCase())) {
          return char;
        }

        const currIndex = alphabet.indexOf(char.toLowerCase());
        const keywordChar = keyword[keywordIndex % keywordLength];
        const keywordShift = alphabet.indexOf(keywordChar.toLowerCase());
        const newIndex = (currIndex + keywordShift + caesarkey) % 26;

        keywordIndex++;

        return char === char.toUpperCase()
          ? alphabet[newIndex].toUpperCase()
          : alphabet[newIndex];
      })
      .join('');
  };

  return (
    <p className="text-white">{keywordShift(phrase, keyword, caesarkey)}</p>
  );
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

  return <p className="text-white">{asciiToBinary(phrase)}</p>;
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

  return <p className="text-white">{emojiSubstitution(phrase)}</p>;
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
      <p className="text-white">Keyword Shift</p>
      <KeywordShiftCipher caesarkey={1} keyword="hello" phrase="hello" />
      <p className="text-white">Emoji Substitution</p>
      <EmojiSubstitutionCipher phrase="hello" />
      <p className="text-white">Binary Converter</p>
      <AsciiToBinary phrase="hello" />
    </div>
  );
};

export default CipherTestComponent;
