import Link from "next/link"

function Footer() {
  return (
    <footer className="border-foreground bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold">
          <span className="text-foreground">$</span>
          <span>SpendWrapped</span>
        </Link>

        <p className="text-sm text-muted-foreground">
          Built with care. Your data stays yours.
        </p>

        <div className="flex gap-6">
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;