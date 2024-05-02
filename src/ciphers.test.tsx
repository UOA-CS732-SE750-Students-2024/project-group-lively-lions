import {
  simpleCaesarCipher,
  vigenereCipher,
  vigenereDecipher,
  encodePolybius,
  decodePolybius,
  encodeToMorse,
  decodeMorseToAscii
} from './ciphers';

/*
 Testing Simple Caesar Cipher
*/
test('Decoding with opposite negative value', () => {
  const phrase = 'hello world';

  const encodedPhrase = simpleCaesarCipher({
    caesarkey: 3,
    phrase: phrase
  });

  const decodedPhrase = simpleCaesarCipher({
    caesarkey: -3,
    phrase: encodedPhrase
  });

  expect(decodedPhrase).toBe('hello world');
});

/*
 Testing Vigenere Cipher
*/
test('Encoding and decoding with Vigenere Cipher', () => {
  const keyword = 'key';
  const phrase = 'hello world';

  const encodedPhrase = vigenereCipher({
    keyword: keyword,
    phrase: phrase
  });

  const decodedPhrase = vigenereDecipher({
    keyword: keyword,
    phrase: encodedPhrase
  });

  expect(decodedPhrase).toBe('hello world');
});

test('Vigenere: Expect no change if keyword is empty', () => {
  const keyword = '';
  const phrase = 'hello world';
  const encodedPhrase = vigenereCipher({
    keyword: keyword,
    phrase: phrase
  });
  expect(encodedPhrase).toBe(phrase);
});

/*
 Testing Polybius Cipher
*/
test('Encoding with Polybius Cipher', () => {
  const phrase = 'hello world';
  const polybiusSquare = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y'],
    ['Z']
  ];
  const encodedPhrase = encodePolybius({
    phrase: phrase
  });

  const decodedPhrase = decodePolybius(encodedPhrase, polybiusSquare);
  expect(decodedPhrase).toBe('hello world');
});

/*
 Testing Morse Cipher
*/
test('Encoding with Morse Cipher', () => {
  const phrase = 'hello world';
  const encodedPhrase = encodeToMorse({
    phrase: phrase
  });
  expect(encodedPhrase).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
});

test('Decoding with Morse Cipher', () => {
  const phrase = '.... . .-.. .-.. --- / .-- --- .-. .-.. -..';
  const decodedPhrase = decodeMorseToAscii({
    phrase: phrase
  });
  expect(decodedPhrase).toBe('hello world');
});
