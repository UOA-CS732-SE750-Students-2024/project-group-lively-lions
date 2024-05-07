import { Button } from '../ui/button';
import { useState } from 'react';
import { TextField } from '../ui/TextField';
import { Caesar } from '@/ciphers/ciphers';
import { Screen } from '@/util';

/* 
This is the component for the Tutorial Page. It allows the user to play the tutorial.
*/

interface TutorialProps {
  handleCheckAnswer: (
    userPhrase: string,
    phrase: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;

  handleScreenButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const caesar = new Caesar();

export function Tutorial({
  handleCheckAnswer,
  handleScreenButtonClick
}: TutorialProps) {
  const phrase = 'Surprise! Happy Birthday Detective Purrlock Holmes!';
  const caesarkey = 3;
  const [userPhrase, setUserPhrase] = useState('');
  return (
    <div>
      <p className="text-white">
        The Case of the Missing Milk: Purrlock Holmes receives a frantic call
        from Mrs. Calico. Her prized saucer of milk has vanished! The only clue
        is a strange note left behind with scrambled letters. Purrlock must use
        his knowledge of the Caesar Cipher to decipher the note and identify the
        milk thief.
        {caesar.encode({ caesarkey, phrase })}
        {caesar.decode({
          caesarkey: -caesarkey,
          phrase: 'Vxusulvh! Kdssb Eluwkgdb Ghwhfwlyh Sxuuorfn Krophv!'
        })}
      </p>

      <form>
        <TextField
          value={userPhrase}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserPhrase(e.target.value)
          }
          placeholder={'Answer'}
        />
      </form>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleCheckAnswer(userPhrase, phrase, e)}
        size={'sm'}
      >
        Check
      </Button>
      <Button
        className="font-[alagard] text-[1rem] mt-5 mb-5 bottom-0"
        onClick={(e) => handleScreenButtonClick(Screen.MainMenuScreen, e)}
      >
        Back
      </Button>
    </div>
  );
}
