"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, User, Clock, MoreVertical, XCircle, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Booking {
  id: string
  scheduled_at: string
  status: string
  address: string
  services: { name: string, icon: string }
  providers: { name: string, image_url: string }
}

export function BookingList({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState<any[]>(initialBookings)
  const supabase = createClient()

  const handleCancel = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id)

    if (error) {
      toast.error("Failed to cancel booking")
      return
    }

    setBookings(bookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b))
    toast.success("Booking cancelled")
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-zinc-300" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-2">No bookings yet</h3>
        <p className="text-zinc-500 mb-8">You haven't booked any services yet. Start fixing your home today!</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <a href="/">Browse Services</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden border-zinc-200 hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge 
                      className={cn(
                        "mb-2",
                        booking.status === "pending" && "bg-yellow-50 text-yellow-700 border-yellow-100",
                        booking.status === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-100",
                        booking.status === "completed" && "bg-blue-50 text-blue-700 border-blue-100",
                        booking.status === "cancelled" && "bg-red-50 text-red-700 border-red-100"
                      )}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <h3 className="text-xl font-bold text-zinc-900">{booking.services.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900">
                      {format(new Date(booking.scheduled_at), "PPP")}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {format(new Date(booking.scheduled_at), "p")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="line-clamp-1">{booking.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <img 
                      src={booking.providers.image_url} 
                      alt={booking.providers.name} 
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <span>{booking.providers.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-50 p-6 md:w-48 flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-zinc-100">
                {booking.status === "pending" && (
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </Button>
                )}
                <Button variant="ghost" className="w-full text-zinc-500">
                  Help
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
