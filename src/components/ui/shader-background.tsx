'use client'

import { MeshGradient } from '@paper-design/shaders-react'
import clsx from 'clsx'
import {
  type FC,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import type { Simplify } from 'type-fest'

type ShaderBackgroundProps = Simplify<{
  children: ReactNode
}>

export const ShaderBackground = (({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [_, setIsActive] = useState(false)
  const glassEffectId = useId()
  const gooeyFilterId = useId()

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* SVG Filters */}
      <svg
        className={clsx('absolute', 'inset-0', 'w-0', 'h-0')}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={glassEffectId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter
            id={gooeyFilterId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders */}
      <MeshGradient
        className={clsx('absolute', 'inset-0', 'w-full', 'h-full')}
        colors={['#e0eaff', '#464cecb5', '#5b8efb', '#abcbde99']}
        speed={0.3}
      />
      <MeshGradient
        className={clsx('absolute inset-0 w-full h-full opacity-60')}
        colors={['#e0eaff', '#464cecb5', '#5b8efb']}
        speed={0.6}
      />

      {children}
    </div>
  )
}) satisfies FC<ShaderBackgroundProps>
