import { Button } from '../../ui/button';
import { useState } from 'react';
import { TextField } from '../../ui/TextField';
import { Screen } from '@/util';
import computer_screen from '../../../assets/room/main_menu/computer/computer_sign_in_new_profile.png';
import new_account_cap from '../../../assets/room/main_menu/computer/new_account_cap.png';
import new_account_base from '../../../assets/room/main_menu/computer/new_account_signin_base.png';
import confirm_cap from '../../../assets/room/main_menu/computer/confirm_cap.png';
import confirm_base from '../../../assets/room/main_menu/computer/confirm_base.png';
import back_cap from '../../../assets/room/main_menu/computer/back_arrow_cap.png';
import back_base from '../../../assets/room/main_menu/computer/back_arrow_base.png';
import EchidnaButton from '../../../components/ui/echidna_button';
import click_sound from '../../../assets/sounds/click.mp4';

/* 
This is the component for the sign in menu. It allows the user to sign into their profile.
So far it has input fields for a profile name and password. These are not yet connected to a database.
It also has a confirm button, which does nothing yet, and a back button to the landing page.
*/

const SERVER_MONGODB_URI = 'http://localhost:3000';

interface SignInProps {
  handleScreenButtonClick: (
    level: number,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  isMuted: boolean;
}

export function SignIn({ handleScreenButtonClick, isMuted }: SignInProps) {
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
        fetch(
          `${SERVER_MONGODB_URI}/player?username=${username}&password=${password}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            console.log(data); // Moved console.log inside the .then() block
            // If it's a guest account, remove it from local storage
            localStorage.removeItem('profile');
            localStorage.setItem('profile', JSON.stringify({ profile: data }));
          })
          .catch((error) => {
            alert('Username or password is incorrect.');
          });
      } else {
        // If it's not a guest account, prompt the user to log out first
        alert('Please log out before logging in with a new account.');
      }
    }
  };

  function playClickSound() {
    if (!isMuted) {
      new Audio(click_sound).play();
    }
  }

  return (
    <div>
      <div className="absolute inset-0 flex justify-center items-center ">
        <img className="w-[100%]" src={computer_screen} draggable={false} />
      </div>
      <div className="absolute inset-0 flex justify-center flex-col items-center top-[26%]">
        <div className="absolute top-[7%] right-[18%] w-[18%] cursor-pointer">
          <EchidnaButton
            baseImage={new_account_base}
            capImage={new_account_cap}
            onClick={() => {
              handleScreenButtonClick(Screen.NewPlayer);
              playClickSound();
            }}
          />
        </div>
        <p className="font-[alagard] text-[1.3rem]">Sign In</p>
        <form className="w-[30%]">
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
