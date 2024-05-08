import {
  CaesarCipherProps,
  KeywordProps,
  Cipher,
  CipherType,
  SubstitutionProps
} from './Cipher';

type CipherProps = CaesarCipherProps | KeywordProps | SubstitutionProps;

const checkType = (props: CipherProps): CipherType => {
  if ('caesarkey' in props) {
    return CipherType.Caesar;
  } else if ('keyword' in props) {
    return CipherType.Keyword;
  } else if ('phrase' in props) {
    return CipherType.Substitution;
  } else {
    throw new Error('Invalid props');
  }
};

/**
 * A simple Caesar cipher component.
 *
 * @param caesarkey - The key for the Caesar cipher.
 * @param phrase - The phrase to be encoded using the Caesar cipher.
 */
const simpleCaesarCipher = ({ caesarkey, phrase }: CaesarCipherProps) => {
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

export class Caesar implements Cipher {
  static displayName = 'Caesar';
  encode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Caesar) {
      return simpleCaesarCipher(props as CaesarCipherProps);
    }
    throw new Error('Invalid props');
  };

  decode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Caesar) {
      return simpleCaesarCipher({
        caesarkey: -1 * (props as CaesarCipherProps).caesarkey,
        phrase: (props as CaesarCipherProps).phrase
      });
    }
    throw new Error('Invalid props');
  };
  type = CipherType.Caesar;
}

/**
 * VigenereCipher component for encoding a phrase using the Vigenere cipher.
 * @param keyword - The keyword used for encoding.
 * @param phrase - The phrase to be encoded.
 * @returns The encoded phrase as a string.
 */
const vigenereCipher = ({ keyword, phrase }: KeywordProps) => {
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
const vigenereDecipher = ({ keyword, phrase }: KeywordProps) => {
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

export class Vigenere implements Cipher {
  static displayName = 'Vigenere';
  encode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Keyword) {
      return vigenereCipher(props as KeywordProps);
    }
    throw new Error('Invalid props');
  };

  decode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Keyword) {
      return vigenereDecipher(props as KeywordProps);
    }
    throw new Error('Invalid props');
  };
  type = CipherType.Keyword;
}

/**
 * Encodes a given string using the Polybius cipher.
 *
 * @param str - The string to be encoded.
 * @returns The encoded string.
 */
const encodePolybius = ({ phrase }: SubstitutionProps) => {
  let row, col;
  let result = '';

  // convert each character
  // to its encrypted code
  for (let i = 0; i < phrase.length; i++) {
    // finding row of the table
    if (phrase.charAt(i).toLowerCase() === 'j') {
      row = 2;
      col = 4;
    } else if (phrase.charAt(i) === ' ') {
      row = 0;
      row = 0;
    } else {
      let code =
        phrase.charAt(i).toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
      if (code >= 9) code--; // excluding j, shift remaining codes by 1
      row = Math.floor(code / 5) + 1;
      col = (code % 5) + 1;
    }

    result += row + '' + col;
  }

  return result;
};

/**
 * Decodes a given string encoded using the Polybius cipher.
 *
 * @param str - The string to be decoded.
 * @returns The decoded string.
 */
const decodePolybius = ({ phrase }: SubstitutionProps) => {
  const polybiusSquare = [
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h', 'i/j', 'k'],
    ['l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u'],
    ['v', 'w', 'x', 'y', 'z']
  ];

  let encoded = '';
  for (let i = 0; i < phrase.length; i++) {
    const row = parseInt(phrase[i]);
    const col = parseInt(phrase[++i]);
    if (row > 0 && col > 0) {
      encoded += polybiusSquare[row - 1][col - 1];
    } else {
      encoded += ' ';
    }
  }
  return encoded;
};

export class Polybius implements Cipher {
  static displayName = 'Polybius';
  encode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return encodePolybius(props as SubstitutionProps);
    }
    throw new Error('Invalid props');
  };
  decode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return decodePolybius(props as SubstitutionProps); // Fix: Pass the 'phrase' property of 'props' to 'decodePolybius'
    }
    throw new Error('Invalid props');
  };
  type = CipherType.Substitution;
  class = Polybius;
}

/**
 * MorseCodeCipher encodes a given phrase into Morse code.
 *
 * @param phrase - The phrase to be encoded into Morse code.
 * @returns The encoded phrase in Morse code.
 */
const encodeToMorse = ({ phrase }: SubstitutionProps) => {
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
const decodeMorseToAscii = ({ phrase }: SubstitutionProps) => {
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
export class Morse implements Cipher {
  static displayName = 'Morse Code';
  encode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return encodeToMorse(props as SubstitutionProps);
    }
    throw new Error('Invalid props');
  };
  decode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return decodeMorseToAscii(props as SubstitutionProps); // Fix: Pass the 'phrase' property of 'props' to 'decodePolybius'
    }
    throw new Error('Invalid props');
  };
  type = CipherType.Substitution;
}
/**
 * Converts a string of ASCII characters to binary representation.
 *
 * @param phrase - The input string to convert.
 * @returns The binary representation of the input string.
 */
const asciiToBinary = ({ phrase }: SubstitutionProps) => {
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
const binaryToAscii = ({ phrase }: SubstitutionProps) => {
  return phrase
    .split(' ')
    .map((binaryCode) => {
      const asciiCode = parseInt(binaryCode, 2);
      const char = String.fromCharCode(asciiCode);
      return char;
    })
    .join('');
};

export class Binary implements Cipher {
  static displayName = 'Binary';
  encode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return asciiToBinary(props as SubstitutionProps);
    }
    throw new Error('Invalid props');
  };
  decode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return binaryToAscii(props as SubstitutionProps); // Fix: Pass the 'phrase' property of 'props' to 'decodePolybius'
    }
    throw new Error('Invalid props');
  };
  type = CipherType.Substitution;
}

/**
 * Component that performs emoji substitution cipher encoding on a given phrase.
 *
 * @param {Object} props - The component props.
 * @param {string} props.phrase - The phrase to be encoded.
 * @returns {JSX.Element} The encoded phrase wrapped in a paragraph element.
 */
const encodeEmojiSubstitutionCipher = ({ phrase }: SubstitutionProps) => {
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

/**
 * Decodes a given string encoded using the emoji substitution cipher.
 * @param {string} phrase - The phrase to be decoded.
 * @returns {string} The decoded phrase.
 */

const decodeEmojiSubstitutionCipher = ({ phrase }: SubstitutionProps) => {
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

export class Emoji implements Cipher {
  static displayName = 'Emoji';
  encode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return encodeEmojiSubstitutionCipher(props as SubstitutionProps);
    }
    throw new Error('Invalid props');
  };
  decode = (props: CipherProps) => {
    if (checkType(props) == CipherType.Substitution) {
      return decodeEmojiSubstitutionCipher(props as SubstitutionProps);
    }
    throw new Error('Invalid props');
  };
  type = CipherType.Substitution;
}
