"use client";

import { useState } from "react";

import { CalendarScheduling } from "@/components/calendar-scheduling";
import { QuickNotes } from "@/components/quick-notes";
import { SmartSuggestions } from "@/components/smart-suggestions";
import { Timer } from "@/components/timer";
import { AlarmTrigger } from "@/components/alarm-trigger";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

export default function Home() {
  const [notes, setNotes] = useState("");

  return (
    <SidebarProvider>
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <h1 className="font-semibold">Pocket Planner</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => console.log("Notes Clicked")}>
                <Icons.file />
                <span>Quick Notes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => console.log("Timer Clicked")}>
                <Icons.workflow />
                <span>Timer</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => console.log("Calendar Clicked")}>
                <Icons.calendar />
                <span>Calendar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => console.log("Alarm Clicked")}>
                <Icons.alarm />
                <span>Alarm</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground">
            Was first created by Firebase Studio
          </p>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4">
        <QuickNotes notes={notes} setNotes={setNotes} />
        <Timer />
        <CalendarScheduling />
        <AlarmTrigger />
        <SmartSuggestions notes={notes} />
      </main>
    </SidebarProvider>
  );
}
