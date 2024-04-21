import folder_sprite from '../../assets/folder_sprite.png'

interface HoverFolderProps {
  overlap: string
  zIndex: number
}

export function HoverFolder({overlap, zIndex}: HoverFolderProps) {
  return (
    <div 
    className="relative inline-block transition-all duration-500 ease-in-out"
    style={{ marginTop: overlap, zIndex: zIndex}} // Adjust this value to control the vertical overlap
    onMouseOver={(event) => (event.target as HTMLElement).style.transform = 'translateY(-50px)'}
    onMouseOut={(event) => (event.target as HTMLElement).style.transform = ''}
    >
        <img
        className="transition-all duration-500 ease-in-out"
        style={{ zIndex: zIndex}}
        src={folder_sprite}
        />
    </div>

  );
}