import { portfolio } from "@/data/portfolio";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-12">

        {/* Image */}
        <div className="flex justify-center md:justify-start rounded-xl p-5
        bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
        border border-[var(--border)]">
          
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden ring-2 ring-white/20">
            <Image
              src={portfolio.personal.img}
              alt={portfolio.personal.name}
              width={288}
              height={288}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold text-gradient">
            Hi!, I’m {portfolio.personal.name}.
          </h1>

            <div className="flex flex-wrap gap-2 mt-4">
                  
                    <h1
                      className="
                      text-5xl font-bold text-gradient
                    "
                    >
                      {portfolio.personal.role}
                    </h1>
            
                </div>

                {/* <div className="flex flex-wrap gap-2 mt-4">
                  
                    <span
                      className="
                      px-3 py-1
                      rounded-full
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      text-sm text-[var(--text)]
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5
                      hover:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_30%,transparent)]
                    "
                    >
                      {portfolio.personal.role}
                    </span>
            
                </div> */}

          <p className="max-w-xl text-[var(--muted)]">
            {portfolio.personal.summary}
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <a className="px-6 py-3 rounded-full btn-gradient text-white font-medium">
              View Projects
            </a>
            <a className="px-6 py-3 rounded-full secondary-btn-gradient font-medium">
              Contact
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
