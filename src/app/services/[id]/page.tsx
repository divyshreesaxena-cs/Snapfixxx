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
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-base font-bold text-muted-foreground hover:text-primary mb-10 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
  
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center shadow-inner">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <Badge variant="secondary" className="bg-secondary/30 text-secondary-foreground border-secondary/50 mb-3 px-4 py-1 rounded-full font-bold">
                    Premium Service
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">{service.name}</h1>
                </div>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
                {service.description} Our verified professionals are ready to help you with all your {service.name.toLowerCase()} needs.
              </p>
              
              <div className="flex flex-wrap gap-8 mt-10">
                <div className="flex items-center gap-3 text-base font-bold text-muted-foreground bg-secondary/20 px-4 py-2 rounded-xl">
                  <Shield className="w-5 h-5 text-secondary-foreground" />
                  Verified Experts
                </div>
                <div className="flex items-center gap-3 text-base font-bold text-muted-foreground bg-primary/10 px-4 py-2 rounded-xl">
                  <Clock className="w-5 h-5 text-primary" />
                  On-Time Guarantee
                </div>
                <div className="flex items-center gap-3 text-base font-bold text-muted-foreground bg-accent/20 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                  4.8+ Rating
                </div>
              </div>
            </div>
  
            <div className="w-full md:w-96 bg-secondary/10 rounded-[2.5rem] p-10 border border-secondary/30 shadow-inner">
              <h4 className="font-black text-foreground mb-4 text-lg">Service Pricing</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-foreground tracking-tighter">${service.base_price}</span>
                <span className="text-muted-foreground font-bold text-lg">base fee</span>
              </div>
              <p className="text-sm text-muted-foreground mt-6 font-medium leading-relaxed italic">
                * Final price may vary based on specific requirements and parts.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-20">
            <section>
              <h2 className="text-3xl font-black text-foreground mb-10 tracking-tight">What's included?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Professional consultation",
                  "Verified expert technician",
                  "Post-service cleanup",
                  "30-day service warranty",
                  "Transparent pricing",
                  "Quality materials used"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm group hover:border-primary/30 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </section>
  
            <section>
              <h2 className="text-3xl font-black text-foreground mb-10 tracking-tight">How it works</h2>
              <div className="space-y-10">
                {[
                  { title: "Select a Professional", desc: "Choose from our top-rated local experts based on their profiles and reviews." },
                  { title: "Pick a Time", desc: "Select a date and time slot that works best for your schedule." },
                  { title: "Relax and Fix", desc: "Our professional arrives at your doorstep and takes care of everything." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-foreground mb-2">{step.title}</h4>
                      <p className="text-lg text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
  
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <h2 className="text-3xl font-black text-foreground mb-8 tracking-tight">Book Service</h2>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border border-border">
                <BookingForm service={service} providers={providers || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

