import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NavBar() {
  return (
    <nav className="px-5 flex w-full h-[77px] justify-center items-center border-b fixed bg-white z-50">
      <Image
        className="relative"
        src="https://bp-prod.cloudimg.io/_images_/app/uploads/sites/5/2023/05/23170818/bp-full.png"
        alt="Amazen Logo"
        width={200}
        height={50}
        priority
      />
    </nav>
  )
}
