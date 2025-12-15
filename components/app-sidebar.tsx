"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMoon,
  IconReport,
  IconSearch,
  IconSettings,
  IconSun,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { RiBookOpenLine, RiBrain2Fill, RiHomeSmile2Line } from "react-icons/ri";
import { BrainCircuit } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const data = {
  teams: [
    {
      name: "KenteCode",
      logo: "KC",
      role: "admin",
    },
    {
      name: "Acme Inc",
      logo: "AI",
      role: "user",
    },
    {
      name: "Tech Innovators",
      logo: "TI",
      role: "admin",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/app",
      icon: RiHomeSmile2Line,
    },

    {
      title: "LMS",
      url: "/lms",
      icon: RiBookOpenLine,
    },
    {
      title: "CRM",
      url: "/crm",
      icon: IconListDetails,
    },
    {
      title: "AI",
      url: "/ai",
      icon: BrainCircuit,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { accessToken, profile, setProfile, isAuthenticated } = useAuthStore();
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(false);

  // Fetch user profile on mount if authenticated
  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !accessToken) {
        return;
      }

      // If profile already exists, no need to fetch again
      if (profile) {
        return;
      }

      setIsLoadingProfile(true);
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to fetch profile");
        }

        if (data.success && data.profile) {
          setProfile(data.profile);
        } else {
          // No profile found, redirect to onboarding
          toast.error("Profile not found. Please complete your profile setup.");
          setTimeout(() => {
            router.push("/onboarding");
          }, 1500);
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile. Redirecting to onboarding...");
        setTimeout(() => {
          router.push("/onboarding");
        }, 1500);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, accessToken, profile, setProfile, router]);

  const navSecondaryWithTheme = [
    {
      title: "Light Mode",
      icon: IconSun,
      action: () => setTheme("light"),
    },
    {
      title: "Dark Mode",
      icon: IconMoon,
      action: () => setTheme("dark"),
    },
  ];

  // Determine which nav items to show based on role
  const isAdmin =
    profile?.role === "superadmin" ||
    profile?.role === "admin" ||
    profile?.role === "account_superadmin" ||
    profile?.role === "account_admin";

  const navMainItems = isAdmin
    ? data.navMain
    : data.navMain.filter(
        (item) => item.title === "Home" || item.title === "LMS"
      );

  return (
    <Sidebar collapsible="icon" className="bg-background border-r" {...props}>
      <div className="bg-background flex flex-row items-center justify-between gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center border-b">
        <SidebarMenu className="flex-1 group-data-[collapsible=icon]:hidden">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <Image
                  alt="logo"
                  src={"/logo.webp"}
                  width={20}
                  height={20}
                  className="size-8 dark:invert"
                />
                <span className="text-base font-semibold">KenteCode AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger className="h-8 w-8 p-0" />
      </div>
      <SidebarHeader className="bg-background border-b">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={navMainItems} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={navSecondaryWithTheme} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
