import React from 'react'
import Image from 'next/image'
import Gif from '@/public/gif3.gif'
import Particles from './Particles';

const HomePage = () => {
  return (
    <div className='h-full w-full flex flex-col bg-white p-4 relative'>      
      <Particles
        particleColors={['#000000', '#000000']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  )
}

export default HomePage