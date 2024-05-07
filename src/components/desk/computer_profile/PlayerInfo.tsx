import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';

/* 
This is the component for the player info menu. It allows the user to view profile details.
So far it has input fields for changing profile name and password. These are not yet connected to a database. It also shows the current profile data, including:
- Username
- Password
- Game completion %
- Count of hints used
It also has a change info button, which does nothing yet, and a back button to the landing page.
*/

interface ProfileProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleConfirm: (
    username: string,
    password: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function PlayerInfo({
  handleScreenButtonClick,
  handleConfirm
}: ProfileProps) {
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
      <p>Game Completion Percentage: </p>
      <p>Hints Used: </p>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleConfirm(username, password, e)}
        size={'sm'}
      >
        CONFIRM CHANGES
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleScreenButtonClick(Screen.ComputerProfile, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </div>
  );
}
