import { caesar, vigenere, polybius, morse, binary, emoji } from './ciphers';
/**
 * Renders a component that tests various cipher encoding methods.
 */
const CipherTestComponent: React.FC = () => {
  const caesarkey = 3;
  const phrase = 'hello world';
  const keyword = 'hello';

  const encodedPolybius = polybius.encode({ phrase });
  return (
    <div className="text-white">
      <p>Simple Caesar</p>
      {caesar.encode({ caesarkey, phrase })}
      {/* <SimpleCaesarCipher caesarkey={1} phrase="hello" /> */}
      <p>
        Vigenere
        {vigenere.encode({ keyword, phrase })}
      </p>
      <p>
        Polybius Square
        {polybius.encode({ phrase })}
        {polybius.decode(encodedPolybius)}
      </p>
      <p>
        Morse Code
        {morse.encode({ phrase })}
      </p>
      <p>
        Emoji Substitution
        {emoji.encode({ phrase })}
      </p>
      <p>
        Binary Converter
        {binary.encode({ phrase })}
      </p>
    </div>
  );
};

export default CipherTestComponent;
