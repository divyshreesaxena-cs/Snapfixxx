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
      <Card className="group hover:shadow-2xl transition-all duration-500 border-border overflow-hidden rounded-[2rem] bg-card hover:-translate-y-1">
        <CardContent className="p-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500 shadow-inner">
            <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
          </div>
          <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">{service.name}</h3>
          <p className="text-base text-muted-foreground font-medium line-clamp-2 mb-6 leading-relaxed">
            {service.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
            <span className="text-base font-bold text-foreground">Starts at ${service.base_price}</span>
            <span className="text-primary text-base font-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Book Now <Icons.ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
