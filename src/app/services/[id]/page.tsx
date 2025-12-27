import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/BookingForm"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Star, MapPin, ChevronLeft } from "lucide-react"
import Link from "next/link"
import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single()

  if (!service) {
    notFound()
  }

  const { data: providers } = await supabase
    .from("providers")
    .select("*")
    .eq("service_id", id)

  const Icon = (Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle) as LucideIcon

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="bg-white border-b border-zinc-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 mb-1">
                    Home Service
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">{service.name}</h1>
                </div>
              </div>
              <p className="text-lg text-zinc-600 max-w-2xl">
                {service.description} Our verified professionals are ready to help you with all your {service.name.toLowerCase()} needs.
              </p>
              
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Shield className="w-4 h-4 text-green-600" />
                  Satisfaction Guaranteed
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock className="w-4 h-4 text-blue-600" />
                  24/7 Availability
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Star className="w-4 h-4 text-yellow-500" />
                  4.8+ Rated Experts
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
              <h4 className="font-semibold text-zinc-900 mb-2">Service Pricing</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-zinc-900">${service.base_price}</span>
                <span className="text-zinc-500 text-sm">base price</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                * Final price may vary based on the specific work required.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">What's included?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Professional consultation",
                  "Verified expert technician",
                  "Post-service cleanup",
                  "30-day service warranty",
                  "Transparent pricing",
                  "Quality materials used"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Icons.Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-zinc-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">How it works</h2>
              <div className="space-y-6">
                {[
                  { title: "Select a Professional", desc: "Choose from our top-rated local experts based on their profiles and reviews." },
                  { title: "Pick a Time", desc: "Select a date and time slot that works best for your schedule." },
                  { title: "Relax and Fix", desc: "Our professional arrives at your doorstep and takes care of everything." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">{step.title}</h4>
                      <p className="text-zinc-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Book Now</h2>
              <BookingForm service={service} providers={providers || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
