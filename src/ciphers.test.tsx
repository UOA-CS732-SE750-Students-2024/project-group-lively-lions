import {
  simpleCaesarCipher,
  vigenereCipher,
  vigenereDecipher,
  encodePolybius,
  decodePolybius,
  encodeToMorse,
  decodeMorseToAscii,
  binaryToAscii,
  asciiToBinary,
  encodeEmojiSubstitutionCipher,
  decodeEmojiSubstitutionCipher
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

/*
 Testing Binary to ASCII
*/
test('Converting ASCII to binary', () => {
  const phrase = 'hello world';
  const binary = asciiToBinary({ phrase });
  expect(binary).toBe(
    '01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100'
  );
});

test('Converting binary to ASCII', () => {
  const binary =
    '01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100';
  const ascii = binaryToAscii({
    phrase: binary
  });
  expect(ascii).toBe('hello world');
});

/*
 Testing Emoji Substitution Cipher
*/
test('Encoding with Emoji Substitution Cipher', () => {
  const phrase = 'hello world';
  const encodedPhrase = encodeEmojiSubstitutionCipher({
    phrase: phrase
  });
  expect(encodedPhrase).toBe('🤣😆🙃🙃😍🔒😜😍😙🙃😁');
});

test('Decoding with Emoji Substitution Cipher', () => {
  const phrase = '🤣😆🙃🙃😍🔒😜😍😙🙃😁';
  const decodedPhrase = decodeEmojiSubstitutionCipher({
    phrase: phrase
  });

  expect(decodedPhrase).toBe('hello world');
});
