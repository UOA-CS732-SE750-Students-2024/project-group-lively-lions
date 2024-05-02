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
export const simpleCaesarCipher = ({
  caesarkey,
  phrase
}: CaesarCipherProps) => {
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
export const vigenereCipher = ({ keyword, phrase }: VigenereCipherProps) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const keyLength = keyword.length;
  let keyIndex = 0;
  if (keyLength === 0) {
    return phrase;
  }
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
 * Decodes a given phrase encoded using the Vigenere cipher.
 *
 * @param keyword - The keyword used for encoding.
 * @param phrase - The phrase to be decoded.
 * @returns The decoded phrase as a string.
 */
export const vigenereDecipher = ({ keyword, phrase }: VigenereCipherProps) => {
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
      let newIndex = currIndex - keyIndexInAlphabet;
      if (newIndex < 0) {
        newIndex = 26 + newIndex;
      }

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
export const encodePolybius = ({ phrase }: MorseCipherProps) => {
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
export const decodePolybius = (phrase: string, polybiusSquare: string[][]) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return phrase
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
export const encodeToMorse = ({ phrase }: MorseCipherProps) => {
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
export const decodeMorseToAscii = ({ phrase }: MorseCipherProps) => {
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
  return phrase
    .split(' ')
    .map((morseCode) => {
      return morseToAsciiMap[morseCode] || '';
    })
    .join('');
};

/**
 * Converts a string of ASCII characters to binary representation.
 *
 * @param str - The input string to convert.
 * @returns The binary representation of the input string.
 */
export const asciiToBinary = ({ phrase }: MorseCipherProps) => {
  return phrase
    .split('')
    .map((char) => {
      const asciiCode = char.charCodeAt(0);
      let binaryCode = asciiCode.toString(2);
      if (binaryCode.length < 8) {
        binaryCode = '0'.repeat(8 - binaryCode.length) + binaryCode;
      }
      return binaryCode;
    })
    .join(' ');
};

/**
 * Converts a binary string to ASCII characters.
 *
 * @param binary - The binary string to convert.
 * @returns The ASCII representation of the binary string.
 */
export const binaryToAscii = ({ phrase }: MorseCipherProps) => {
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
export const encodeEmojiSubstitutionCipher = ({ phrase }: MorseCipherProps) => {
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
  return phrase
    .toLowerCase()
    .split('')
    .map((char) => {
      return emojiMap[char] || char;
    })
    .join('');
};

//decode emoji cipher

export const decodeEmojiSubstitutionCipher = ({ phrase }: MorseCipherProps) => {
  console.log(phrase);
  const emojiMap: { [key: string]: string } = {
    '😀': 'a',
    '😃': 'b',
    '😄': 'c',
    '😁': 'd',
    '😆': 'e',
    '😅': 'f',
    '😂': 'g',
    '🤣': 'h',
    '😊': 'i',
    '😇': 'j',
    '🙂': 'k',
    '🙃': 'l',
    '😉': 'm',
    '😌': 'n',
    '😍': 'o',
    '😘': 'p',
    '😗': 'q',
    '😙': 'r',
    '😚': 's',
    '😋': 't',
    '😛': 'u',
    '😝': 'v',
    '😜': 'w',
    '🤪': 'x',
    '🤨': 'y',
    '😎': 'z',
    '🔒': ' '
  };

  let decodedPhrase = '';
  for (const emoji of phrase) {
    decodedPhrase += emojiMap[emoji];
  }

  return decodedPhrase;
};
