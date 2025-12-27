"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Provider {
  id: string
  name: string
  rating: number
  experience_years: number
  location: string
  image_url: string
}

interface Service {
  id: string
  name: string
  base_price: number
}

export function BookingForm({ service, providers }: { service: Service, providers: Provider[] }) {
  const [date, setDate] = useState<Date>()
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !selectedProvider || !address) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("bookings").insert({
        service_id: service.id,
        provider_id: selectedProvider,
        scheduled_at: date.toISOString(),
        address: address,
        status: "pending"
      })

      if (error) throw error

      setIsSuccess(true)
      toast.success("Booking requested successfully!")
      setTimeout(() => {
        router.push("/bookings")
      }, 2000)
    } catch (error) {
      console.error(error)
      toast.error("Failed to create booking")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-emerald-100 bg-emerald-50/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Booking Requested!</h2>
          <p className="text-emerald-700 mb-6">
            We've sent your request to the professional. You'll be notified once they confirm.
          </p>
          <Button onClick={() => router.push("/bookings")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            View My Bookings
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardContent className="p-6">
        <form onSubmit={handleBooking} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold text-zinc-900">1. Select a Professional</Label>
            <div className="grid grid-cols-1 gap-3">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedProvider === provider.id
                      ? "border-blue-600 bg-blue-50/50 shadow-sm"
                      : "border-zinc-100 hover:border-zinc-200"
                  )}
                >
                  <img
                    src={provider.image_url}
                    alt={provider.name}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-900">{provider.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {provider.rating}
                      </span>
                      <span>•</span>
                      <span>{provider.experience_years}y exp</span>
                      <span>•</span>
                      <span>{provider.location}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    selectedProvider === provider.id ? "border-blue-600 bg-blue-600" : "border-zinc-300"
                  )}>
                    {selectedProvider === provider.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold text-zinc-900">2. Schedule Date & Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 rounded-xl border-zinc-200",
                    !date && "text-zinc-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold text-zinc-900">3. Service Address</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
              <Input
                placeholder="Where should the professional come?"
                className="pl-12 h-12 rounded-xl border-zinc-200"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-zinc-500">Service Fee</span>
              <span className="text-xl font-bold text-zinc-900">${service.base_price}</span>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-xl text-lg font-bold shadow-lg shadow-blue-200"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
            <p className="text-center text-xs text-zinc-400 mt-4 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              Response usually within 15 minutes
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  )
}
