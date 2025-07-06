"use client";

import { NeonButton } from "@/app/components/core/neonButton/neonButton.component";
import { cn } from "@/app/lib/cn.utils";
import {
  CreditCard,
  Home,
  BanknoteArrowDown,
  BanknoteArrowUp,
  PiggyBank,
  Settings,
  BadgeDollarSign,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const menuItems = [
  {
    label: "Home",
    url: "/",
    icon: Home,
  },
  {
    label: "Cartões",
    url: "#",
    icon: CreditCard,
  },
  {
    label: "Pagamentos",
    url: "#",
    icon: BanknoteArrowUp,
  },
  {
    label: "Recebimentos",
    url: "#",
    icon: BanknoteArrowDown,
  },
  {
    label: "Planejamentos",
    url: "#",
    icon: PiggyBank,
  },
  {
    label: "Lista de Compras",
    url: "#",
    icon: ShoppingCart,
  },
  {
    label: "Conversor de Moedas",
    url: "#",
    icon: BadgeDollarSign,
  },
  {
    label: "Settings",
    url: "#",
    icon: Settings,
  },
] as const;

function FooterComponent() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 w-full glass-light backdrop-blur-[20px] border-t border-neon-blue/20 z-50 animate-fade-in-up">
      <div className="container mx-auto px-4 min-w-80 overflow-x-auto">
        <div className="flex justify-between items-center py-3 gap-7">
          {menuItems.map((item, index) => (
            <NeonButton
              key={index}
              variant={pathname === item.url ? "blue" : "ghost"}
              className="border-0 lg:border border-neon-purple/10"
            >
              <Link
                href={item.url}
                className={cn(
                  "flex flex-col gap-1 justify-center items-center w-full min-w-max",
                  pathname === item.url && "opacity-70 hover:opacity-100",
                  "hover:text-accent-foreground",
                  "md:w-auto"
                )}
              >
                <item.icon className="" size={20} />
                <span className="text-xs break-words">{item.label}</span>
              </Link>
            </NeonButton>
          ))}
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
