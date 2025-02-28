import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Latest News Carousel */}
          <section className="bg-[#FFF3E9] p-4 rounded-lg">
            <div className="relative group">
              {/* Image and Controls */}
              <div className="relative h-[400px] mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="News thumbnail"
                  fill
                  className="rounded-lg object-cover"
                />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
                  <Play className="h-8 w-8 ml-1" />
                </button>
                <div className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded text-sm">
                  25 mins read
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold mb-2">
                Protest against war crimes erupts in Italy as thousands gather
                near Bell Tower
              </h2>
              <p className="text-gray-600">
                Italy has called on the European Union to impose ad hoc
                sanctions against Hamas and its supporters, the foreign
                ministers of the three nations wrote in a joint letter to the
                EU&apos;s foreign policy chief Josep Borrell. Follow our live
                blog fo...
              </p>
            </div>
          </section>

          {/* Trending News */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex justify-between items-center">
              Trending
              <Link href="/trending" className="text-[#F48634] text-sm">
                View all →
              </Link>
            </h2>
            <div className="space-y-4">
              {[
                {
                  title:
                    "Jamia revokes suspension of professor accused of sexual harassment",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title:
                    "Australian man charged with several offences over fatal crash that killed 3 Indian-origin families",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title:
                    "Tibetans in exile accuse China of destroying their identity in Tibet under its rule",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title:
                    "U.S. calls on Beijing to stop 'dangerous' conduct in South China Sea",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title:
                    "U.S. F-16 jet crashes in South Korea, pilot rescued after ejecting",
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((item, i) => (
                <article key={i} className="flex gap-4 group">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt="News thumbnail"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-[#F48634]">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Politics Section */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="p-1 bg-blue-100 rounded">📰</span> Politics
            </h2>
            <Link href="/politics" className="text-[#F48634]">
              View all →
            </Link>
          </div>
          <div className="grid grid-flow-col auto-cols-[280px] gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <article key={i} className="group">
                <div className="relative h-48 mb-3">
                  <Image
                    src={`/placeholder.svg?height=200&width=280`}
                    alt="News thumbnail"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="font-medium group-hover:text-[#F48634] line-clamp-2">
                  Egypt says problem is genocide in Gaza, not a big farm as the
                  world&apos;s eyes are fixed on Gaza
                </h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
