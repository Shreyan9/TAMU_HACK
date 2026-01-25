import { TrendingUp, Shield, Share2, CreditCard, Zap } from "lucide-react"

const features = [
  {
    icon: CreditCard,
    title: "All Cards, One View",
    description: "See spending across all your accounts. Know which card you reach for most.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Read-only access with 256-bit encryption. We never see your login credentials.",
  },
  {
    icon: Share2,
    title: "Shareable Stories",
    description: "Create beautiful cards to share your financial wins (or lessons) with friends.",
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description: "AI-powered analysis reveals patterns you never knew existed in your spending.",
  },
]

function WhySpendWrapped() {
  return (
    <section id="features" className="border-b-2 border-foreground bg-card py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold text-foreground">Why SpendWrapped?</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            We built this because we were tired of boring budget apps. Your spending tells a story — let{"'"}s make it interesting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4 rounded-lg border-2 border-foreground/20 bg-background p-6 transition-all hover:border-foreground hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySpendWrapped;