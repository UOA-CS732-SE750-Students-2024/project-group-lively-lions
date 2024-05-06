import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/text_field';

/* 
This is the component for the sign in menu. It allows the user to sign into their profile.
So far it has input fields for a profile name and password. These are not yet connected to a database.
It also has a confirm button, which does nothing yet, and a back button to the landing page.
*/

interface SignInProps {
  handleScreenButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleConfirm: (
    username: string,
    password: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function SignIn({
  handleScreenButtonClick,
  handleConfirm
}: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form>
        <p>Identity:</p>
        <TextField
          value={username}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          placeholder={'Username'}
        />
        <p>Password:</p>
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
        SIGN IN
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(7, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </div>
  );
}
