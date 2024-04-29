import { Button } from '../ui/button';
import { useState } from 'react';
import { TextField } from '../ui/text_field';

/* 
This is the component for the new player menu. It allows the creation of a new player profile.
So far it has input fields for a new profile name and password. These are not yet connected to a database.
It also has a confirm button, which does nothing yet, and a back button to the landing page.
*/

interface NewPlayerProps {
  handleBackButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleConfirm: (
    username: string,
    password: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function NewPlayer({
  handleBackButtonClick,
  handleConfirm
}: NewPlayerProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form>
        <p>New Identity Name:</p>
        <TextField
          value={username}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          placeholder={'Username'}
        />
        <p>New Identity Password:</p>
        <TextField
          value={password}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder={'Password'}
        />
      </form>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleConfirm(username, password, e)}
        size={'sm'}
      >
        CONFIRM
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleBackButtonClick(0, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </div>
  );
}
