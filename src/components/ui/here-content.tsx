import clsx from 'clsx'
import Link from 'next/link'

type Topic = {
  title: string
  description: string
  href: string
}

export const HeroContent = () => {
  const topics: Topic[] = [
    {
      title: 'Sorting Algorithms',
      description: 'Bubble, Quick, Merge',
      href: '/sorting',
    },
    {
      title: 'Data Structures',
      description: 'Stack, Queue',
      href: '/data-structures',
    },
  ]

  return (
    <main className={clsx('z-10')}>
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <div className={clsx('relative')}>
          <div className={clsx('text-center', 'px-4')}>
            <h1 className={clsx('text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              <span className={clsx('font-bold', 'italic', 'font-monos')}>
                Algorithm Visualization
              </span>
            </h1>
            <p
              className={clsx(
                'text-xl',
                'text-pretty',
                'mx-auto',
                'text-white',
              )}
            >
              Learn algorithms and data structures
            </p>
          </div>

          <div className={clsx('mt-4')}>
            <h2 className={clsx('text-xm', 'font-bold', 'text-white', 'mb-3')}>
              Explore Topics
            </h2>
            <div className={clsx('grid', 'grid-cols-2', 'gap-3')}>
              {topics.map((topic) => (
                <Link key={topic.href} href={topic.href} className="group">
                  <div
                    className={clsx(
                      'px-4',
                      'py-3',
                      'rounded-lg',
                      'bg-white/15',
                      'backdrop-blur-sm',
                    )}
                  >
                    <div className={clsx('font-medium', 'mb-1', 'text-white')}>
                      {topic.title}
                    </div>
                    <div className={clsx('text-white/80', 'text-xs')}>
                      {topic.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
