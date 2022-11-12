import React from 'react'
import Image from 'next/image'
import banner from '../public/images/banner.png'

export default function Header() {
  return (
    <div className="banner">
      <Image
      src={banner}
      alt="The Block Header"
      />
    </div>
  )
}
