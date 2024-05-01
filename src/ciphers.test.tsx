import { simpleCaesarCipher } from './ciphers';

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
