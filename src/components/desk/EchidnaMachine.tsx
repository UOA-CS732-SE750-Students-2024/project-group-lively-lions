import * as ciphersExports from '@/ciphers/ciphers';
import { CipherType } from '@/ciphers/Cipher';
import { useState } from 'react';
import { Screen } from '@/util';

interface EchidnaMachineProps {
  phrase: string;
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const EchidnaMachine = ({
  phrase,
  handleScreenButtonClick
}: EchidnaMachineProps) => {
  const [selectedCipher, setSelectedCipher] = useState(
    Object.values(ciphersExports)[0].name.toString()
  );
  const [shift, setShift] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const [workingPhrase, setWorkingPhrase] = useState(phrase);

  const handleDecipher = () => {
    const cipherValues = Object.values(ciphersExports);
    const index = cipherValues.findIndex(
      (cipher) => cipher.name.toString() === selectedCipher
    );
    const cipher = cipherValues[index];
    const newCipher = new cipher();
    if (newCipher.type === CipherType.Caesar) {
      const decodedPhrase = newCipher.decode({
        caesarkey: shift,
        phrase: phrase
      });
      setWorkingPhrase(decodedPhrase);
    } else if (newCipher.type === CipherType.Keyword) {
      const decodedPhrase = newCipher.decode({
        keyword: keyword,
        phrase: phrase
      });
      setWorkingPhrase(decodedPhrase);
    } else if (newCipher.type === CipherType.Substitution) {
      const decodedPhrase = newCipher.decode({ phrase: phrase });
      setWorkingPhrase(decodedPhrase);
    }
  };

  const handleCycleOptions = (reverse: boolean = false) => {
    const cipherValues = Object.values(ciphersExports);
    const currentIndex = cipherValues.findIndex(
      (cipher) => cipher.name.toString() === selectedCipher
    );

    let nextIndex;
    if (reverse) {
      nextIndex =
        (currentIndex - 1 + cipherValues.length) % cipherValues.length;
    } else {
      nextIndex = (currentIndex + 1) % cipherValues.length;
    }
    setSelectedCipher(cipherValues[nextIndex].name.toString());
  };

  const handleResetPhrase = () => {
    setWorkingPhrase(phrase);
  };
  return (
    <>
      <p> Cipher Phrase </p>

      <div className="text-white">
        <p>{}</p>
        <label>Shift</label>
        <input
          className="bg-white text-black"
          type="number"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setShift(e.target.valueAsNumber)
          }
        ></input>
        <input
          className="bg-white text-black"
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
        ></input>
        <button onClick={() => handleCycleOptions(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <p>Selected cipher = {selectedCipher}</p>
        <button onClick={() => handleCycleOptions(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button onClick={handleDecipher}>Decipher</button>
        <p>{workingPhrase}</p>
        <button onClick={handleResetPhrase}>Reset</button>
      </div>
      <button
        onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
      />
    </>
  );
};

export default EchidnaMachine;
