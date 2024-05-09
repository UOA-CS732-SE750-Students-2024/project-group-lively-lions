import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';
import computer_screen from '../../../assets/room/main_menu/computer/computer_sign_in_new_profile.png';
import confirm_cap from '../../../assets/room/main_menu/computer/confirm_cap.png';
import confirm_base from '../../../assets/room/main_menu/computer/confirm_base.png';
import back_cap from '../../../assets/room/main_menu/computer/back_arrow_cap.png';
import back_base from '../../../assets/room/main_menu/computer/back_arrow_base.png';
import EchidnaButton from '../../../components/ui/echidna_button';
import signin_cap from '../../../assets/room/main_menu/computer/signin_cap.png';
import signin_base from '../../../assets/room/main_menu/computer/new_account_signin_base.png';
import click_sound from '../../../assets/sounds/click.mp4';

/* 
This is the component for the new player menu. It allows the creation of a new player profile.
So far it has input fields for a new profile name and password. These are not yet connected to a database.
It also has a confirm button, which does nothing yet, and a back button to the landing page.
*/

interface NewPlayerProps {
  handleScreenButtonClick: (
    level: number,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  isMuted: boolean;
}

const SERVER_API_URL = import.meta.env.VITE_BASE_API_URL;

export function NewPlayer({
  handleScreenButtonClick,
  isMuted
}: NewPlayerProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    try {
      // Send a POST request to create a new player profile
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
      alert(
        'An error has occurred, we cannot make your profile at this time. Please continue playing with the guest profile'
      );
      console.error('An error occurred:', error);
    }
  };

  function playClickSound() {
    if (!isMuted) {
      new Audio(click_sound).play();
    }
  }

  return (
    <div>
      <div className="absolute inset-0 flex justify-center items-center">
        <img className="w-[100%]" src={computer_screen} draggable={false} />
      </div>
      <div className="absolute inset-0 flex justify-center flex-col items-center top-[26%]">
        <div className="absolute top-[7%] right-[18%] w-[18%] cursor-pointer">
          <EchidnaButton
            baseImage={signin_base}
            capImage={signin_cap}
            onClick={() => {
              handleScreenButtonClick(Screen.SignIn);
              playClickSound();
            }}
          />
        </div>
        <p className="font-[alagard] text-[1.3rem]">Create New Account</p>
        <form className="w-[30%]">
          <div className="flex">
            <div className="pr-1">
              <p className="font-[alagard] text-[1.3rem] p-2">Identity:</p>
              <p className="font-[alagard] text-[1.3rem]">Password:</p>
            </div>
            <div>
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
        <div className="absolute top-[68%] left-[43%] w-[12%] cursor-pointer">
          <EchidnaButton
            baseImage={confirm_base}
            capImage={confirm_cap}
            onClick={() => {
              handleConfirm();
              playClickSound();
            }}
          />
        </div>
        <div className="absolute top-[0%] left-[15%] w-[10%] cursor-pointer">
          <EchidnaButton
            baseImage={back_base}
            capImage={back_cap}
            onClick={() => {
              handleScreenButtonClick(Screen.ComputerProfile);
              playClickSound();
            }}
          />
        </div>
      </div>
    </div>
  );
}
