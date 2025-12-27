import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ServiceCard } from "@/components/ServiceCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Shield, Clock, Star, Hammer } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()
  const { data: services } = await supabase.from("services").select("*")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground mb-8 max-w-4xl leading-[1.1]">
            Home Repairs, <span className="text-primary italic">Simplified.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-medium">
            Connect with verified local professionals for plumbing, electrical, carpentry, and more. 
          </p>

          <div className="w-full max-w-3xl bg-card p-3 rounded-[2rem] shadow-2xl shadow-primary/10 border border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center px-6 gap-3 border-b md:border-b-0 md:border-r border-border">
              <Search className="w-6 h-6 text-primary" />
              <Input 
                placeholder="What do you need help with?" 
                className="border-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-lg h-12"
              />
            </div>
            <div className="flex-1 flex items-center px-6 gap-3">
              <MapPin className="w-6 h-6 text-secondary-foreground" />
              <Input 
                placeholder="Enter your location" 
                className="border-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-lg h-12"
              />
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-10 h-14 text-lg font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
              Find Pro
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-10 text-base font-semibold text-muted-foreground">
            <div className="flex items-center gap-3 bg-secondary/30 px-5 py-2.5 rounded-full border border-secondary/50">
              <Shield className="w-5 h-5 text-secondary-foreground" />
              Verified Pros
            </div>
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20">
              <Clock className="w-5 h-5 text-primary" />
              On-Time Service
            </div>
            <div className="flex items-center gap-3 bg-accent/20 px-5 py-2.5 rounded-full border border-accent/30">
              <Star className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
              4.8/5 Rating
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-foreground mb-4 tracking-tight">Our Services</h2>
              <p className="text-muted-foreground text-lg font-medium">Find the right expert for your home maintenance needs.</p>
            </div>
            <Button variant="ghost" className="text-primary font-bold text-lg hover:bg-primary/10 rounded-xl px-6">
              View All Services
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-secondary/20 relative overflow-hidden rounded-[4rem] mx-4 mb-24 border border-secondary/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-10 text-foreground tracking-tight">Why SnapFix?</h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Background Checked</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">Every technician goes through a rigorous verification process.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Clock className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Instant Booking</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">Schedule your service in seconds. No more endless phone calls.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Star className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Satisfaction Guaranteed</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">If you're not happy, we'll make it right. No questions asked.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=800&auto=format&fit=crop" 
              alt="Professional repair" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 border-8 border-white group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 mb-24">
        <div className="max-w-6xl mx-auto bg-primary rounded-[3.5rem] p-16 md:p-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight">Ready to fix your home?</h2>
            <p className="text-primary-foreground/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of happy homeowners and experience the modern way of home maintenance.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-secondary/10 hover:text-primary rounded-full px-12 h-16 text-xl font-black shadow-xl transition-all hover:scale-105 active:scale-95">
              Book Your First Service
            </Button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full -mb-32 -mr-32 blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <Hammer className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">SnapFix</span>
            </div>
            <p className="text-muted-foreground text-lg font-medium max-w-sm leading-relaxed">
              Making home repairs and maintenance accessible, reliable, and stress-free for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-zinc-500 text-sm">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-zinc-500 text-sm">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Safety</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-100 mt-12 pt-8 flex justify-between items-center text-sm text-zinc-400">
          <p>© 2024 SnapFix Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-600">Twitter</Link>
            <Link href="#" className="hover:text-zinc-600">Instagram</Link>
            <Link href="#" className="hover:text-zinc-600">Facebook</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
