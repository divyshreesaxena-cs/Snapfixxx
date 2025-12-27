"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hammer, User, Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 group-active:scale-95">
                <Hammer className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">SnapFix</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/services" className="text-base font-bold text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link href="/providers" className="text-base font-bold text-muted-foreground hover:text-primary transition-colors">Providers</Link>
            <Link href="/bookings" className="text-base font-bold text-muted-foreground hover:text-primary transition-colors">My Bookings</Link>
            <div className="h-6 w-px bg-border mx-2" />
            <Button variant="ghost" size="sm" className="gap-2 font-bold text-base hover:bg-secondary/20">
              <User className="w-5 h-5 text-secondary-foreground" />
              Login
            </Button>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 py-4 px-4 space-y-4">
          <Link href="/services" className="block text-sm font-medium text-zinc-600">Services</Link>
          <Link href="/providers" className="block text-sm font-medium text-zinc-600">Providers</Link>
          <Link href="/bookings" className="block text-sm font-medium text-zinc-600">My Bookings</Link>
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" className="w-full">Login</Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
