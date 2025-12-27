import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  icon: string
  base_price: number
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = (Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle) as LucideIcon

  return (
    <Link href={`/services/${service.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 border-zinc-200 overflow-hidden">
        <CardContent className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-2">{service.name}</h3>
          <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
            {service.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-medium text-zinc-900">Starts at ${service.base_price}</span>
            <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
              Book Now →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
