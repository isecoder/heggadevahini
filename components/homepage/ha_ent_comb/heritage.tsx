"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useState } from "react"

const Wildlife = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=600&width=800",
      title: "10 of the rarest animals in the world",
      description: "Discover the most elusive creatures on Earth",
    },
    {
      image: "/placeholder.svg?height=600&width=800",
      title: "Crocodile vs alligator: what's the difference?",
      description: "A guide to these ancient reptiles",
    },
    {
      image: "/placeholder.svg?height=600&width=800",
      title: "Roe deer guide: behavior and habitat",
      description: "Learn about these graceful woodland creatures",
    },
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative bg-gradient-to-b from-sky-100 to-orange-50 p-4 sm:p-6 lg:p-8 rounded-xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800">Heritage & Architecture</h2>
        <Link
          href="#"
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors duration-200"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Mobile Carousel */}
      <div className="block lg:hidden relative">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 px-0.5">
                <ArticleCard image={slide.image} title={slide.title} description={slide.description} />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full text-slate-800 hover:bg-white hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full text-slate-800 hover:bg-white hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? "bg-slate-800 scale-110" : "bg-slate-400 hover:bg-slate-600"
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {slides.map((slide, index) => (
          <ArticleCard key={index} image={slide.image} title={slide.title} description={slide.description} />
        ))}
      </div>
    </section>
  )
}

const ArticleCard = ({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) => (
  <div className="group relative w-full rounded-xl overflow-hidden">
    <div className="aspect-[4/3] relative">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {description}
      </p>
    </div>
    <Link href="#" className="absolute inset-0" aria-label={title}>
      <span className="sr-only">{title}</span>
    </Link>
  </div>
)

export default Wildlife

