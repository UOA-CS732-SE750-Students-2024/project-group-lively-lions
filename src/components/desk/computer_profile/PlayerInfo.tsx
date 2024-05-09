import { Button } from '../../ui/button';
import { useState, useEffect } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';
import computer_screen_main from '../../../assets/room/main_menu/computer/computer_screen_main.png';
import confirm_cap from '../../../assets/room/main_menu/computer/confirm_cap.png';
import confirm_base from '../../../assets/room/main_menu/computer/confirm_base.png';
import back_cap from '../../../assets/room/main_menu/computer/back_arrow_cap.png';
import back_base from '../../../assets/room/main_menu/computer/back_arrow_base.png';
import EchidnaButton from '../../../components/ui/echidna_button';
import click_sound from '../../../assets/sounds/click.mp4';

/* 
This is the component for the player info menu. It allows the user to view profile details.
So far it has input fields for changing profile name and password. These are not yet connected to a database. It also shows the current profile data, including:
- Username
- Password
It also has a change info button and a back button to the landing page.
*/

<<<<<<< HEAD
const SERVER_MONGODB_URI = 'http://localhost:3000';
=======
const SERVER_API_URL = import.meta.env.VITE_BASE_API_URL
>>>>>>> main

interface ProfileProps {
  handleScreenButtonClick: (
    screen: Screen,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  isMuted: boolean;
}

export function PlayerInfo({ handleScreenButtonClick, isMuted }: ProfileProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currentProfile = localStorage.getItem('profile');
  const getUsername = (): string => {
    if (currentProfile) {
      const parsedProfile = JSON.parse(currentProfile);
      return parsedProfile.profile.username;
    }
    return 'guest';
  };

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
    const isGuestProfile =
      currentProfile.profile.username === 'guest' || username === 'guest';

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody) // Send the complete request body
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Player account updated:', data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert(
        'Cannot update a guest profile or name a profile guest, please make your own first.'
      );
      localStorage.setItem('profile', currentProfileString);
    }
  };

  function playClickSound() {
    if (!isMuted) {
      new Audio(click_sound).play();
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="absolute inset-0">
        <img
          className="w-[100%]"
          src={computer_screen_main}
          draggable={false}
        />
      </div>
      <form className="w-[30%] absolute top-[35%] right-[17%]">
        <div className="flex">
          <div>
            <p className="font-[alagard] text-[1.3rem] p-2">Identity:</p>
            <p className="font-[alagard] text-[1.3rem]">Password:</p>
          </div>
          <div className="pl-1">
            <TextField
              value={username}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              placeholder={'Username'}
            />
            <TextField
              value={password}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder={'Password'}
            />
          </div>
        </div>
      </form>
      <div className="absolute top-[60%] right-[25%] w-[12%] cursor-pointer">
        <EchidnaButton
          baseImage={confirm_base}
          capImage={confirm_cap}
          onClick={() => {
            handleConfirm();
            playClickSound();
          }}
        />
      </div>
      <div className="absolute top-[18%] left-[12%] w-[10%] cursor-pointer">
        <EchidnaButton
          baseImage={back_base}
          capImage={back_cap}
          onClick={() => {
            handleScreenButtonClick(Screen.ComputerProfile);
            playClickSound();
          }}
        />
      </div>
      <div className="absolute left-[10%] top-[55%] w-[40%]">
        <p className="opacity-[70%] text-[2rem] font-[alagard] h-[35%] text-center inset-0">
          Welcome, {getUsername()}
        </p>
      </div>
    </div>
  );
}
