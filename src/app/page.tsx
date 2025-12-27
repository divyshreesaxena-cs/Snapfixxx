import { createClient } from "@/lib/supabase/server"
import { ServiceCard } from "@/components/ServiceCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Shield, Clock, Star } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()
  const { data: services } = await supabase.from("services").select("*")

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 max-w-4xl">
            Home Repairs, <span className="text-blue-600">Simplified.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl">
            Connect with verified local professionals for plumbing, electrical, carpentry, and more. 
            Quality service guaranteed at your doorstep.
          </p>

          <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-xl border border-zinc-200 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r border-zinc-100">
              <Search className="w-5 h-5 text-zinc-400" />
              <Input 
                placeholder="What do you need help with?" 
                className="border-0 focus-visible:ring-0 text-zinc-900 placeholder:text-zinc-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-2">
              <MapPin className="w-5 h-5 text-zinc-400" />
              <Input 
                placeholder="Enter your location" 
                className="border-0 focus-visible:ring-0 text-zinc-900 placeholder:text-zinc-400"
              />
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8">
              Find Pro
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Verified Professionals
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              On-Time Service
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              4.8/5 Average Rating
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Services</h2>
              <p className="text-zinc-500">Browse by category and find the right expert for your home.</p>
            </div>
            <Button variant="ghost" className="text-blue-600 font-semibold">
              View All Services
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-zinc-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why SnapFix?</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Background Checked</h3>
                  <p className="text-zinc-400">Every technician goes through a rigorous verification and background check process.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Booking</h3>
                  <p className="text-zinc-400">Schedule your service in less than 60 seconds. No more endless phone calls.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-600/30 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
                  <p className="text-zinc-400">If you're not happy with the service, we'll make it right. No questions asked.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=800&auto=format&fit=crop" 
              alt="Professional repair" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to fix your home?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of happy homeowners and experience the modern way of home maintenance.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-zinc-100 rounded-full px-10 h-14 text-lg font-bold">
              Book Your First Service
            </Button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">SnapFix</span>
            </div>
            <p className="text-zinc-500 max-w-sm">
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
