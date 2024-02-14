import { LibraryBig, Store, Wallet } from "lucide-react";
import { ComponentProps } from "react";
import { useMatch, useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Route } from "@/routes";

function ItemLink({
  href,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuLink>) {
  const path = `${href}`;
  const navigate = useNavigate();
  const pathMatch = useMatch(path);
  return (
    <NavigationMenuLink
      {...props}
      className={navigationMenuTriggerStyle()}
      active={!!pathMatch}
      onSelect={() => navigate(path)}
    >
      <div className="flex items-center gap-3 cursor-pointer">{children}</div>
    </NavigationMenuLink>
  );
}

function Navigation() {
  return (
    <div className="flex justify-center h-16 border-y">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ItemLink href={Route.ROOT}>
              <Wallet size={16} />
              Account
            </ItemLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ItemLink href={Route.INVENTORY}>
              <LibraryBig size={16} />
              Inventory
            </ItemLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ItemLink href={Route.MARKET}>
              <Store size={16} />
              Market
            </ItemLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navigation;
