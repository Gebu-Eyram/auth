"use client";

import { useRouter } from "next/navigation";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/lib/auth-store";

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { profile, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  const displayName = profile
    ? `${profile.first_name || ""}${
        profile.middle_name ? ` ${profile.middle_name}` : ""
      } ${profile.last_name || ""}`.trim()
    : user?.email || "Guest User";

  const displayEmail = profile?.email || user?.email || "guest@example.com";

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(
        0
      )}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const roleGradient = profile
    ? profile.role === "member"
      ? "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"
      : profile.role === "superadmin"
      ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600"
      : profile.role === "admin"
      ? "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600"
      : "bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600"
    : "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback
                  className={`h-8 w-8 rounded-lg ${roleGradient}`}
                >
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{displayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {profile?.role || "Member"}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback
                    className={`h-8 w-8 rounded-lg ${roleGradient}`}
                  >
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {displayEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/account")}>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/billing")}>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/notifications")}>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
