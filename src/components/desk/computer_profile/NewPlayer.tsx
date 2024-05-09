import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';
import computer_screen_border from '../../../assets/room/main_menu/computer/computer_screen_border.png';

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

const SERVER_API_URL = import.meta.env.VITE_BASE_API_URL;

export function NewPlayer({ handleScreenButtonClick }: NewPlayerProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    try {
      // Send a POST request to create a new player profile in the MongoDB server
      const response = await fetch(SERVER_API_URL + '/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.status === 500) {
        // Handle internal server error 500
        alert('Username is already taken.');
        throw new Error('Username is already taken.');
      } else {
        // Handle success

        // Check if the current profile in local storage is 'guest'
        const currentProfile = localStorage.getItem('profile');
        if (currentProfile !== null) {
          const parsedProfile = JSON.parse(currentProfile);
          if (
            parsedProfile &&
            parsedProfile.profile &&
            parsedProfile.profile.username === 'guest'
          ) {
            // Delete the current 'profile' object in local storage

            const newPlayer = await response.json();
            if (newPlayer) {
              localStorage.setItem(
                'profile',
                JSON.stringify({ profile: newPlayer })
              );
            } else {
              alert('New profile created.');
            }
            // Set the new player profile returned by the POST request to local storage
          } else {
            alert('New profile created.');
          }
        }
        console.log('Player profile created successfully');
      }
    } catch (error) {
      // In case the server can't be connected to, the guest profile remains active
      alert(
        'An error has occurred, we cannot make your profile at this time. Please continue playing with the guest profile'
      );
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="absolute inset-0">
        <img
          className="w-[100%]"
          src={computer_screen_border}
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center flex-col">
        <Button
          className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[40%]"
          onClick={(e) => handleScreenButtonClick(Screen.SignIn, e)}
          size={'sm'}
        >
          SIGN IN TO EXISTING PROFILE
        </Button>
        <form>
          <p className="font-[alagard] text-[1.5rem]">New Identity Name:</p>
          <TextField
            value={username}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder={'Username'}
          />
          <p className="font-[alagard] text-[1.5rem]">New Identity Password:</p>
          <TextField
            value={password}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder={'Password'}
          />
        </form>
        <Button
          className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[50%]"
          onClick={handleConfirm}
          size={'sm'}
        >
          CONFIRM
        </Button>
        <Button
          className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[50%]"
          onClick={(e) => handleScreenButtonClick(Screen.ComputerProfile, e)}
          size={'sm'}
        >
          BACK
        </Button>
      </div>
    </div>
  );
}
