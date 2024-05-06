import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import { Caesar, Vigenere, Polybius, Morse, Binary, Emoji } from './ciphers';

/*
 Testing Simple Caesar Cipher
*/
test('Decoding with opposite negative value', () => {
  const phrase = 'hello world';
  const caesar = new Caesar();
  const encodedPhrase = caesar.encode({
    caesarkey: 3,
    phrase: phrase
  });

  const decodedPhrase = caesar.decode({
    caesarkey: 3,
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
  const vigenere = new Vigenere();
  const encodedPhrase = vigenere.encode({
    keyword: keyword,
    phrase: phrase
  });

  const decodedPhrase = vigenere.decode({
    keyword: keyword,
    phrase: encodedPhrase
  });

  expect(decodedPhrase).toBe('hello world');
});

test('Vigenere: Expect no change if keyword is empty', () => {
  const keyword = '';
  const phrase = 'hello world';
  const vigenere = new Vigenere();
  const encodedPhrase = vigenere.encode({
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
  const polybius = new Polybius();
  const encodedPhrase = polybius.encode({
    phrase: phrase
  });

  const decodedPhrase = polybius.decode({ phrase: encodedPhrase });
  expect(decodedPhrase).toBe('hello world');
});

/*
 Testing Morse Cipher
*/
test('Encoding with Morse Cipher', () => {
  const phrase = 'hello world';
  const morse = new Morse();
  const encodedPhrase = morse.encode({
    phrase: phrase
  });
  expect(encodedPhrase).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
});

test('Decoding with Morse Cipher', () => {
  const phrase = '.... . .-.. .-.. --- / .-- --- .-. .-.. -..';
  const morse = new Morse();
  const decodedPhrase = morse.decode({
    phrase: phrase
  });
  expect(decodedPhrase).toBe('hello world');
});

/*
 Testing Binary to ASCII
*/
test('Converting ASCII to binary', () => {
  const phrase = 'hello world';
  const binary = new Binary();
  const bin = binary.encode({ phrase });
  expect(bin).toBe(
    '01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100'
  );
});

test('Converting binary to ASCII', () => {
  const binary = new Binary();
  const bin =
    '01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100';
  const ascii = binary.decode({
    phrase: bin
  });
  expect(ascii).toBe('hello world');
});

/*
 Testing Emoji Substitution Cipher
*/
test('Encoding with Emoji Substitution Cipher', () => {
  const phrase = 'hello world';
  const emoji = new Emoji();
  const encodedPhrase = emoji.encode({
    phrase: phrase
  });
  expect(encodedPhrase).toBe('🤣😆🙃🙃😍🔒😜😍😙🙃😁');
});

test('Decoding with Emoji Substitution Cipher', () => {
  const phrase = '🤣😆🙃🙃😍🔒😜😍😙🙃😁';
  const emoji = new Emoji();
  const decodedPhrase = emoji.decode({
    phrase: phrase
  });

  expect(decodedPhrase).toBe('hello world');
});
