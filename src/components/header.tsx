import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Header() {
  return (
    <Card className="flex justify-between p-[1.875rem] items-center">
      <Button size="icon" variant="outline" className="p-">
        <MenuIcon />
      </Button>

      <h1 className="font-semibold text-lg"><span className="text-primary">FSW</span> Store</h1>

      <Button size="icon" variant="outline" className="p-">
        <ShoppingCartIcon />
      </Button>      
    </Card>
  )
}