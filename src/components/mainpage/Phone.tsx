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
    <div className="h-[400px]" style={{ imageRendering: 'pixelated' }}>
      <img
        className="absolute min-h-[220px] h-[calc(25vw*9/16)] top-[4%] left-[3%]"
        style={{ imageRendering: 'pixelated' }}
        src={phoneBase}
        alt="phone base"
        draggable={false}
      />
      <motion.img
        className="absolute min-h-[150px] h-[calc(16vw*9/16)] left-[5%] hover:animate-phone-ring"
        style={{ imageRendering: 'pixelated' }}
        onMouseEnter={() => playPhoneRing()}
        src={phoneHandset}
        alt="phone handset"
        draggable={false}
      />
    </div>
  );
}
