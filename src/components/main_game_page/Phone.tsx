import phoneBase from '../../assets/room/shared/phone/phone_base_only.png';
import phoneHandset from '../../assets/room/shared/phone/phone_handset_and_wire.png';

export default function Phone(){


    return (
        <div className='h-[100px]' style={{imageRendering:'pixelated'}}>
            <img 
                    className='absolute top-[10%] left-[3%]' 
                    style={{imageRendering: 'pixelated'}}
                    src={phoneBase} 
                    alt="phone base"
                />
                <img 
                    className='absolute left-[3%] hover:animate-phone-ring' 
                    style={{imageRendering: 'pixelated'}}
                    src={phoneHandset} 
                    alt="phone handset"
                />
        </div>
    )
}