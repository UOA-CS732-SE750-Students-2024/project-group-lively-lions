import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';

/* 
This is the component for the new player menu. It allows the creation of a new player profile.
So far it has input fields for a new profile name and password. These are not yet connected to a database.
It also has a confirm button, which does nothing yet, and a back button to the landing page.
*/

interface NewPlayerProps {
  handleScreenButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const SERVER_MONGODB_URI = 'http://localhost:3000';

export function NewPlayer({ handleScreenButtonClick }: NewPlayerProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    try {
      const response = await fetch(SERVER_MONGODB_URI + '/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Handle success
        console.log('Player profile created successfully');
        // Add more code so 1) the player knows the account
        // was made, and 2) that account gets loaded in locally
        // as the account currently logged in (maybe)
      } else {
        // Handle error
        console.error('Failed to create player profile');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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
        onClick={handleConfirm}
        size={'sm'}
      >
        CONFIRM
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
