"use client";

import { useSidebar } from "@/components/ui/Sidebar/sidebar";
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
import { SidebarDefault } from "./fragments/SidebarDefault/sidebar-default.component";
import { SidebarMobile } from "./fragments/SidebarMobile/sidebar-mobile.component";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Cartões de Crédito/Débito",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Pagamentos",
    url: "#",
    icon: BanknoteArrowDown,
  },
  {
    title: "Recebimentos",
    url: "#",
    icon: BanknoteArrowUp,
  },
  {
    title: "Planejamentos",
    url: "#",
    icon: PiggyBank,
  },
  {
    title: "Lista de Compras",
    url: "#",
    icon: ShoppingCart,
  },
  {
    title: "Conversor de Moedas",
    url: "#",
    icon: BadgeDollarSign,
  },
] as const;

const itemSettings = {
  title: "Settings",
  url: "#",
  icon: Settings,
} as const;

export type SidebarProps = {
  items: typeof items;
  settings: typeof itemSettings;
};

export function Sidebar() {
  const { isMobile } = useSidebar();

  return (
    <>
      {!isMobile ? (
        <SidebarDefault items={items} settings={itemSettings} />
      ) : (
        <SidebarMobile items={items} settings={itemSettings} />
      )}
    </>
  );
}
