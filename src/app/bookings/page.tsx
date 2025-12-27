import { createClient } from "@/lib/supabase/server"
import { BookingList } from "@/components/BookingList"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"

export default async function BookingsPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      services (name, icon),
      providers (name, image_url)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="bg-white border-b border-zinc-200 pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Bookings</h1>
              <p className="text-zinc-500">Manage your service requests and view history.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                <span className="text-sm font-medium text-blue-700">Active: {bookings?.filter(b => b.status === 'pending' || b.status === 'confirmed').length || 0}</span>
              </div>
              <div className="bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-100">
                <span className="text-sm font-medium text-zinc-600">Total: {bookings?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12">
        <BookingList initialBookings={bookings || []} />
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-zinc-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Need something else fixed?</h3>
            <p className="text-zinc-400">Our experts are available 24/7 for any emergency repairs.</p>
          </div>
          <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8">
            <Link href="/">Book New Service</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function Button({ children, className, asChild, ...props }: any) {
  const Comp = asChild ? "span" : "button"
  return (
    <Comp className={`inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className}`} {...props}>
      {children}
    </Comp>
  )
}
