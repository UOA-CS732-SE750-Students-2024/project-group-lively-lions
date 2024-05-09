import { Button } from '../../ui/button';
import { useState, useEffect } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';
import computer_screen_border from '../../../assets/room/main_menu/computer/computer_screen_border.png';

/* 
This is the component for the player info menu. It allows the user to view profile details.
So far it has input fields for changing profile name and password. These are not yet connected to a database. It also shows the current profile data, including:
- Username
- Password
- Game completion %
- Count of hints used
It also has a change info button, which does nothing yet, and a back button to the landing page.
*/

const SERVER_API_URL = import.meta.env.VITE_BASE_API_URL

interface ProfileProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function PlayerInfo({
  handleScreenButtonClick
}: ProfileProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Load existing username and password from local storage
    const playerInfo = localStorage.getItem('profile');
    console.log('Player Info from Local Storage:', playerInfo);
    if (playerInfo) {
      const parsedPlayerInfo = JSON.parse(playerInfo);
      console.log('Parsed Player Info:', parsedPlayerInfo);
      const { profile } = parsedPlayerInfo;
      console.log('Profile:', profile);
      if (profile) {
        setUsername(profile.username);
        setPassword(profile.password);
      } else {
        console.log(playerInfo);
        console.error('Profile object not found in player info.');
      }
    } else {
      console.error('Player info not found in local storage.');
    }
  }, []);

  const handleConfirm = () => {
    // Get the current profile from local storage
    const currentProfileString = localStorage.getItem('profile');
    if (!currentProfileString) {
      console.error('No profile found in local storage.');
      return;
    }
  
    // Parse the current profile
    const currentProfile = JSON.parse(currentProfileString);
  
    // Check if either the current or new username is "guest"
    const isGuestProfile = currentProfile.profile.username === 'guest' || username === 'guest';
  
    // Update the username and password fields inside the profile object
    const old_username = currentProfile.profile.username;
    const old_password = currentProfile.profile.password;

    currentProfile.profile.username = username;
    currentProfile.profile.password = password;

    // Store the updated profile back into local storage
    localStorage.setItem('profile', JSON.stringify(currentProfile));
  
    // Prepare the request body with all necessary fields
    const requestBody = {
      old_username: old_username,
      old_password: old_password,
      username: currentProfile.profile.username,
      password: currentProfile.profile.password
    };
  
    // Send a PUT request to update player's account if it's not a guest profile
    if (!isGuestProfile) {
      fetch(`${SERVER_API_URL}/player`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Send the complete request body
      })
        .then(response => response.json())
        .then(data => {
          console.log('Player account updated:', data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert('Cannot update a guest profile or name a profile guest, please make your own first.');
      localStorage.setItem('profile', currentProfileString)
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
        <p className="font-[alagard] text-[1.5rem]">
          Game Completion Percentage:{' '}
        </p>
        <p className="font-[alagard] text-[1.5rem]">Hints Used: </p>
        <Button
          className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[50%]"
          onClick={handleConfirm}
          size={'sm'}
        >
          CONFIRM CHANGES
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
