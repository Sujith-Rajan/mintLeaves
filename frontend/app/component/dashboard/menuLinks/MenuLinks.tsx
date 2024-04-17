
import Link from 'next/link'
import { IconType } from 'react-icons';



interface MenuLinkProps {
    lists:{title:string;
    path:string;
    icon:IconType;
    }
}
const MenuLink:React.FC<MenuLinkProps> = ({lists}) => {
    const { title, path, icon:Icon} = lists; 
    
  return (
    <Link href={path} className='flex gap-2 items-cente hover:bg-teal-600 p-1 rounded-md'>
     <Icon/>
      {title}
    </Link>
  )
}

export default MenuLink
