import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';
import computer_screen_border from '../../../assets/room/main_menu/computer/computer_screen_border.png';

/* 
This is the component for the sign in menu. It allows the user to sign into their profile.
So far it has input fields for a profile name and password. These are not yet connected to a database.
It also has a confirm button, which does nothing yet, and a back button to the landing page.
*/

const SERVER_API_URL = import.meta.env.VITE_BASE_API_URL

interface SignInProps {
  handleScreenButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function SignIn({ handleScreenButtonClick}: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  const handleConfirm = () => {
    const existingPlayerInfo = localStorage.getItem('profile');

    if (existingPlayerInfo) {
      // Parse the existing player information from local storage
      const existingPlayerData = JSON.parse(existingPlayerInfo);

      // Check if the existing account is a guest account
      if (existingPlayerData.profile.username === 'guest') {
        fetch(`${SERVER_API_URL}/player?username=${username}&password=${password}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(response => response.json())
          .then(data => {
            setData(data);
            console.log(data); // Moved console.log inside the .then() block
            // If it's a guest account, remove it from local storage
            localStorage.removeItem('profile');
            localStorage.setItem('profile', JSON.stringify({ profile: data }));
          })
          .catch(error => {
            alert("Username or password is incorrect.")

          });
      } else {
        // If it's not a guest account, prompt the user to log out first
        alert('Please log out before logging in with a new account.');
      };
    };
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
          className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[30%]"
          onClick={(e) => handleScreenButtonClick(Screen.NewPlayer, e)}
          size={'sm'}
        >
          CREATE NEW PROFILE
        </Button>
        <form>
          <p className="font-[alagard] text-[1.5rem]">Identity:</p>
          <TextField
            value={username}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder={'Username'}
          />
          <p className="font-[alagard] text-[1.5rem]">Password:</p>
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
          SIGN IN
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
