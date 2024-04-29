import { Button } from '../ui/button';
import { useState } from 'react';
import { TextField } from '../ui/text_field';

interface NewPlayerProps {
  handleLevelButtonClick: (
    level: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleConfirm: (
    username: string,
    password: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function NewPlayer({
  handleLevelButtonClick,
  handleConfirm
}: NewPlayerProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form>
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
      </form>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleConfirm(username, password, e)}
        size={'sm'}
      >
        CONFIRM
      </Button>
      <Button
        className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
        onClick={(e) => handleLevelButtonClick(0, e)}
        size={'sm'}
      >
        BACK
      </Button>
    </div>
  );
}
