"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useMotionValue,
  type Variants,
} from "framer-motion"
import { cn } from "@/lib/utils" // Assumes a 'lib/utils.ts' file for 'cn'
import { X } from "lucide-react"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

// Defines the structure for each image item in the gallery
type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  span: string // Tailwind CSS grid span classes (e.g., "md:col-span-2")
}

// Defines the props for the main gallery component
interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  eyebrow?: string
  title: string
  description: string
}

// Animation variants for the section heading (matches the site's other sections)
const headerContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

// Animation variants for the container to stagger children
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Animation variants for each gallery item
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

// Modal component for displaying the selected image
const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem
  onClose: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.title}
          className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Close image view"
      >
        <X size={24} />
      </button>
    </motion.div>
  )
}

// Main gallery component
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, eyebrow, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const x = useMotionValue(0)
  const isInteracting = useRef(false)
  const dragDistance = useRef(0)

  // The track holds two copies of the items back-to-back, so half its
  // scroll width is one full loop — wrap x within that range for a
  // seamless, endless strip.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth / 2)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [imageItems])

  useAnimationFrame((_, delta) => {
    if (trackWidth === 0) return
    if (!isInteracting.current) {
      x.set(x.get() - (trackWidth / 30000) * delta)
    }
    const current = x.get()
    if (current <= -trackWidth) x.set(current + trackWidth)
    else if (current > 0) x.set(current - trackWidth)
  })

  const handleItemClick = (item: ImageItem) => {
    if (dragDistance.current > 5) return
    setSelectedItem(item)
  }

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerContainerVariants}
        className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        {eyebrow && (
          <motion.span
            variants={headerItemVariants}
            className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h2
          variants={headerItemVariants}
          className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h2>

        <motion.p variants={headerItemVariants} className="mt-5 text-lg text-slate-500">
          {description}
        </motion.p>
      </motion.div>

      <div className="relative mt-12 w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          onDragStart={() => {
            isInteracting.current = true
            dragDistance.current = 0
          }}
          onDrag={(_, info) => {
            dragDistance.current += Math.abs(info.delta.x)
          }}
          onDragEnd={() => {
            isInteracting.current = false
          }}
          onHoverStart={() => (isInteracting.current = true)}
          onHoverEnd={() => (isInteracting.current = false)}
          className="grid w-max cursor-grab auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 px-4 active:cursor-grabbing md:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[...imageItems, ...imageItems].map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              variants={itemVariants}
              className={cn(
                "group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                item.span,
              )}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => e.key === "Enter" && handleItemClick(item)}
              tabIndex={0}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery
