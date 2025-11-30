import * as React from "react";
import { IconDashboard, IconListDetails } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Kapil",
    email: "hero@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Player Management",
      url: "/player-management",
      icon: IconDashboard,
    },
    {
      title: "Starting XI",
      url: "#",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
