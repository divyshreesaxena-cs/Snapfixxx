"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hammer, User, Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">SnapFix</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Services</Link>
            <Link href="/providers" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Providers</Link>
            <Link href="/bookings" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">My Bookings</Link>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Login
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
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
