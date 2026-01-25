import { Landmark, Cpu, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Landmark,
    title: "Connect Accounts",
    description: "Securely link your bank accounts and credit cards in seconds.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our AI categorizes and analyzes your spending patterns automatically.",
  },
  {
    icon: Sparkles,
    title: "Get Your Wrapped",
    description: "Receive a beautiful, shareable summary of your financial story.",
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b-2 border-foreground bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">Three simple steps to understand your spending</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group flex flex-col items-center rounded-lg border-2 border-foreground/20 bg-[#F5F0E8] p-8 text-center transition-all hover:border-foreground hover:shadow-lg"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;