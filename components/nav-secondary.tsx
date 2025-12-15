"use client";

import * as React from "react";
import {
  IconMoon,
  IconSun,
  IconPalette,
  IconChevronRight,
  IconSettings,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    icon: React.ElementType;
    action: () => void;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathName = usePathname();
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <IconPalette />
                  <span>Themes</span>
                  <IconChevronRight
                    className={`ml-auto transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side="right"
                align="start"
                sideOffset={4}
              >
                {items.map((item) => (
                  <DropdownMenuItem key={item.title} onClick={item.action}>
                    <item.icon />
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <IconSettings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
