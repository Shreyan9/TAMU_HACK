import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="relative bg-[#0f172a] border-t border-white/10 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 -top-32 -right-32 bg-[#1ed760] rounded-full blur-3xl" />
        <div className="absolute w-80 h-80 -bottom-40 -left-40 bg-[#7c3aed] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-12 md:flex-row">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-white">
          {/* <div className="w-10 h-10 rounded-xl bg-[#1ed760] flex items-center justify-center">
            <Image
              src="/mouse.svg"
              alt="Mouse icon"
              width={24}
              height={24}
              className="invert"
            />
          </div> */}
          <span>FinSight</span>
        </Link>

        <p className="text-sm text-white/60">
          Built with care. Your data stays yours.
        </p>

        <div className="flex gap-6">
          <Link href="#" className="text-sm text-white/60 transition-colors hover:text-[#1ed760]">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-white/60 transition-colors hover:text-[#1ed760]">
            Terms
          </Link>
          <Link href="#" className="text-sm text-white/60 transition-colors hover:text-[#1ed760]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;