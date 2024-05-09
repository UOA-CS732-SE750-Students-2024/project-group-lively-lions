import { Screen } from '@/util';
import { Button } from '../../ui/button';
import computer_screen_border from '../../../assets/room/main_menu/computer/computer_screen_border.png';

/* 
This is the component for the computer visible on the desk on the main menu. The computer is where the user 
can access profile related activities. This includes checking their info, signing in, signing out and creating a new player.
The user can also press the back button to go back to the main menu.
*/

interface ComputerProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function ComputerProfile({ handleScreenButtonClick }: ComputerProps) {

  // Logout function for the player
  const logout = async () => {
    const currentProfile = localStorage.getItem('profile');
    if (currentProfile) {
      const parsedProfile = JSON.parse(currentProfile);
      if (parsedProfile.profile.username === 'guest') {
        alert('Cannot log out of guest account.');
      }
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

  if (computer_screen_border == 'a') {
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
            onClick={(e) => handleScreenButtonClick(Screen.SignIn, e)}
            size={'sm'}
          >
            SIGN IN
          </Button>
          <Button
            className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[30%]"
            onClick={(e) => handleScreenButtonClick(Screen.NewPlayer, e)}
            size={'sm'}
          >
            NEW PLAYER
          </Button>
          <Button
            className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[30%]"
            onClick={(e) => handleScreenButtonClick(Screen.MainGamePage, e)}
            size={'sm'}
          >
            <Button
              className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[40%]"
              onClick={logout}
              size={'sm'}
            >
              LOGOUT
            </Button>
            BACK
          </Button>
        </div>
      </div>
    );
  } else {
    // If player is signed in
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
            onClick={(e) => handleScreenButtonClick(Screen.SignIn, e)}
            size={'sm'}
          >
            SWITCH PROFILE
          </Button>
          <Button
            className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[30%]"
            onClick={(e) => handleScreenButtonClick(Screen.PlayerInfo, e)}
            size={'sm'}
          >
            PLAYER INFO
          </Button>
          <Button
            className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[30%]"
            onClick={logout}
            size={'sm'}
          >
            LOGOUT
          </Button>
          <Button
            className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[30%]"
            onClick={(e) => handleScreenButtonClick(Screen.MainGamePage, e)}
            size={'sm'}
          >
            BACK
          </Button>
        </div>
      </div>
    );
  }
}
