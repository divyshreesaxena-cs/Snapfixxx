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
          <form onSubmit={handleBooking} className="space-y-8">
            <div className="space-y-5">
              <Label className="text-lg font-black text-foreground">1. Select a Professional</Label>
              <div className="grid grid-cols-1 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={cn(
                      "flex items-center gap-5 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                      selectedProvider === provider.id
                        ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <img
                      src={provider.image_url}
                      alt={provider.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-background shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg">{provider.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1 font-semibold text-accent-foreground">
                          <Icons.Star className="w-4 h-4 text-accent-foreground fill-accent-foreground" />
                          {provider.rating}
                        </span>
                        <span className="opacity-30">•</span>
                        <span className="font-medium">{provider.experience_years}y exp</span>
                        <span className="opacity-30">•</span>
                        <span className="font-medium">{provider.location}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      selectedProvider === provider.id ? "border-primary bg-primary" : "border-border"
                    )}>
                      {selectedProvider === provider.id && <div className="w-2.5 h-2.5 bg-primary-foreground rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <Label className="text-lg font-black text-foreground">2. Schedule Date & Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-bold h-14 rounded-2xl border-border bg-background hover:bg-secondary/20 hover:border-primary/30 text-base transition-all",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden border-border shadow-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-5">
              <Label className="text-lg font-black text-foreground">3. Service Address</Label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-4.5 w-5 h-5 text-secondary-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  placeholder="Where should the professional come?"
                  className="pl-14 h-14 rounded-2xl border-border bg-background focus-visible:ring-primary/20 text-base font-medium"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <div className="flex items-center justify-between mb-8">
                <span className="text-muted-foreground font-bold text-lg">Service Fee</span>
                <span className="text-3xl font-black text-foreground tracking-tight">${service.base_price}</span>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-primary" />
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
