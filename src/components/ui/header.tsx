import clsx from 'clsx'
import Image from 'next/image'

export const Header = () => {
  return (
    <header
      className={clsx(
        'relative',
        'z-20',
        'flex',
        'items-center',
        'justify-between',
        'p-6',
      )}
    >
      {/* Logo */}
      <div className={clsx('flex', 'items-center')}>
        <Image
          src="/AlgoVis.svg"
          alt="AlgoVis Logo"
          width={40}
          height={40}
          className={clsx('size-10', 'translate-x-[-0.5px]', 'text-white')}
        />
      </div>
    </header>
  )
}
