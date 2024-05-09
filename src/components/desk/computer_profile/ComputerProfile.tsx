import { Screen } from '@/util';
import computer_screen_main from '../../../assets/room/main_menu/computer/computer_screen_main.png';
import switch_account_icon from '../../../assets/room/main_menu/computer/SwitchAccount.png';
import turn_off_icon from '../../../assets/room/main_menu/computer/TurnOff.png';
import log_out_base from '../../../assets/room/main_menu/computer/log_out_base.png';
import log_out_cap from '../../../assets/room/main_menu/computer/log_out_cap.png';
import EchidnaButton from '../../../components/ui/echidna_button';
import profile_base from '../../../assets/room/main_menu/computer/ProfileInfoIcon_base.png';
import profile_cap from '../../../assets/room/main_menu/computer/ProfileInfoIcon_cap.png';
import { motion } from 'framer-motion';
import click_sound from '../../../assets/sounds/click.mp4';

/* 
This is the component for the computer visible on the desk on the main menu. The computer is where the user 
can access profile related activities. This includes checking their info, signing in, signing out and creating a new player.
The user can also press the back button to go back to the main menu.
*/

interface ComputerProps {
  handleScreenButtonClick: (screen: Screen) => void;
  isMuted: boolean;
}

export function ComputerProfile({
  handleScreenButtonClick,
  isMuted
}: ComputerProps) {
  const currentProfile = localStorage.getItem('profile');

  const getUsername = (): string => {
    if (currentProfile) {
      const parsedProfile = JSON.parse(currentProfile);
      return parsedProfile.profile.username;
    }
    return 'guest';
  };

  const logout = async () => {
    if (currentProfile) {
      const parsedProfile = JSON.parse(currentProfile);
      if (parsedProfile.profile.username === 'guest') {
        alert('Cannot log out of guest account.');
      }
      localStorage.removeItem('profile');
      const defaultProfile = {
        profile: {
          username: 'guest',
          password: 'guest_password',
          completed_puzzles: []
        }
      };
      localStorage.setItem('profile', JSON.stringify(defaultProfile));
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
      <motion.img
        className="absolute w-[25%] top-[43%] left-[55%] cursor-pointer"
        onClick={() => {
          handleScreenButtonClick(Screen.SignIn);
          playClickSound();
        }}
        src={switch_account_icon}
        alt="switch_account_icon"
        draggable={false}
        whileHover={{ opacity: 0.6 }}
      />
      <div className="absolute top-[19%] right-[13%] w-[8%] cursor-pointer">
        <EchidnaButton
          baseImage={profile_base}
          capImage={profile_cap}
          onClick={() => {
            handleScreenButtonClick(Screen.PlayerInfo);
            playClickSound();
          }}
        />
      </div>
      <div className="absolute top-[60%] right-[26%] w-[12%] cursor-pointer">
        <EchidnaButton
          baseImage={log_out_base}
          capImage={log_out_cap}
          onClick={() => {
            logout;
            playClickSound();
          }}
        />
      </div>
      <motion.img
        className="absolute scale-[300%] top-[77%] left-[22%] cursor-pointer"
        onClick={() => {
          handleScreenButtonClick(Screen.MainGamePage);
          playClickSound();
        }}
        src={turn_off_icon}
        alt="turn_off_icon"
        draggable={false}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: 0.8 }}
      />
      <div className="absolute left-[10%] top-[55%] w-[40%]">
        <p className="opacity-[70%] text-[2rem] font-[alagard] h-[35%] text-center inset-0">
          Welcome, {getUsername()}
        </p>
      </div>
    </div>
  );
}
