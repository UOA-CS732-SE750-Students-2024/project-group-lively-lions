import { Caesar, Vigenere, Polybius, Morse, Binary, Emoji } from './ciphers';
/**
 * Renders a component that tests various cipher encoding methods.
 */
const CipherTestComponent: React.FC = () => {
  const caesarkey = 3;
  const phrase = 'hello world';
  const keyword = 'hello';
  const polybius = new Polybius();
  const encodedPolybius = polybius.encode({ phrase });
  return (
    <div className="text-white">
      <p>Simple Caesar</p>
      {new Caesar().encode({ caesarkey, phrase })}
      {/* <SimpleCaesarCipher caesarkey={1} phrase="hello" /> */}
      <p>
        Vigenere
        {new Vigenere().encode({ keyword, phrase })}
      </p>
      <p>
        Polybius Square
        {polybius.encode({ phrase })}
        {polybius.decode({ phrase: encodedPolybius })}
      </p>
      <p>
        Morse Code
        {new Morse().encode({ phrase })}
      </p>
      <p>
        Emoji Substitution
        {new Emoji().encode({ phrase })}
      </p>
      <p>
        Binary Converter
        {new Binary().encode({ phrase })}
      </p>
    </div>
  );
};

export default CipherTestComponent;
