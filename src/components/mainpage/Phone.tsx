import phoneBase from '../../assets/room/shared/phone/phone_base_only.png';
import phoneHandset from '../../assets/room/shared/phone/phone_handset_and_wire.png';
import phoneRing from '../../assets/sounds/phone_ring.mp4';
import { motion } from 'framer-motion';

interface PhoneProps {
  isMuted: boolean;
}

export default function Phone({ isMuted }: PhoneProps) {

  function playPhoneRing() {
    if (!isMuted) {
      new Audio(phoneRing).play();
    }
  }

  return (
    <div className='h-[100px]' style={{ imageRendering: 'pixelated' }}>
      <img
        className='absolute top-[10%] left-[3%]'
        style={{ imageRendering: 'pixelated' }}
        src={phoneBase}
        alt="phone base"
        draggable={false}
      />
      <motion.img
        className='absolute left-[3%] hover:animate-phone-ring'
        style={{ imageRendering: 'pixelated' }}
        onMouseEnter={() => playPhoneRing()}
        src={phoneHandset}
        alt="phone handset"
        draggable={false}
      />
    </div>
  )
}
