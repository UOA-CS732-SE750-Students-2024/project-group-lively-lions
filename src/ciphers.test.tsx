import { SimpleCaesarCipher } from './ciphers';

/*
 Testing Simple Caesar Cipher
*/
test('Decoding with opposite negative value', () => {
  const phrase = 'hello world';

  const encodedPhrase = SimpleCaesarCipher({
    caesarkey: 3,
    phrase: phrase
  });

  const decodedPhrase = SimpleCaesarCipher({
    caesarkey: -3,
    phrase: encodedPhrase?.toString() ?? ''
  });

  expect(decodedPhrase).toBe('hello world');
});
