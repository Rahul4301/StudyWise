'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import {
  Home,
  UploadCloud,
  Layers3,
  BrainCircuit,
  MessageSquareMore,
  User,
  LogOut,
  Clapperboard
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/upload', label: 'Upload', icon: UploadCloud },
  { href: '/dashboard/flashcards', label: 'Flashcards', icon: Layers3 },
  { href: '/dashboard/mind-map', label: 'Mind Map', icon: BrainCircuit },
  { href: '/dashboard/ask', label: 'Ask AI', icon: MessageSquareMore },
  { href: '/dashboard/generate-video', label: 'Generate Video', icon: Clapperboard },
  { href: '/dashboard/account', label: 'Account', icon: User }
  
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline">StudyWise</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <LogOut />
            <span>Log Out</span>
          </Link>
        </Button>
      </SidebarFooter>
    </>
  );
}
