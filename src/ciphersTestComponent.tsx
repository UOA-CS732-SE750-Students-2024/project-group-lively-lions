import {
  simpleCaesarCipher,
  vigenereCipher,
  encodeToMorse,
  encodeEmojiSubstitutionCipher,
  binaryToAscii
} from './ciphers';
/**
 * Renders a component that tests various cipher encoding methods.
 */
const CipherTestComponent: React.FC = () => {
  const caesarkey = 3;
  const phrase = 'hello';
  const keyword = 'hello';
  return (
    <div className="text-white">
      <p>
        Simple Caesar
        {simpleCaesarCipher({ caesarkey, phrase })}
        {/* <SimpleCaesarCipher caesarkey={1} phrase="hello" /> */}
        Vigenere
        {vigenereCipher({ keyword, phrase })}
        Morse Code
        {encodeToMorse({ phrase })}
        Emoji Substitution
        {encodeEmojiSubstitutionCipher({ phrase })}
        Binary Converter
        {binaryToAscii({ phrase })}
      </p>
    </div>
  );
};

export default CipherTestComponent;
