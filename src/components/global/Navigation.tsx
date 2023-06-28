import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu'
import { Separator } from '../ui/separator'

type NavigationLinkProps = {
  to: string
  children: string
  isSeparator?: boolean
  isActive: boolean
}

const navigations = [
  {
    url: '/',
    label: 'Dashboard',
    isSeparator: true,
  },
  {
    url: '/carosel',
    label: 'Carosel',
  },
]

const NavigationLink = ({
  to,
  isSeparator,
  children,
  isActive,
}: NavigationLinkProps) => {
  return (
    <div className="flex gap-2">
      <Link to={to}>
        <NavigationMenuLink
          className={`py-2 px-3 rounded-md hover:bg-gray-200 transition ${
            isActive ? 'font-bold' : ''
          }`}
        >
          {children}
        </NavigationMenuLink>
      </Link>
      {isSeparator && (
        <Separator orientation="vertical" className="bg-gray-400" />
      )}
    </div>
  )
}

export default function Navigation() {
  const { pathname } = useLocation()

  return (
    <NavigationMenu className="mb-8">
      <NavigationMenuList>
        {navigations.map((navigation) => (
          <NavigationMenuItem key={navigation.url} className="flex gap-2">
            <NavigationLink
              to={navigation.url}
              isSeparator={navigation.isSeparator}
              isActive={pathname === navigation.url}
            >
              {navigation.label}
            </NavigationLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
