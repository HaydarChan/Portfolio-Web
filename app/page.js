'use client'
import React, { useEffect, useState } from 'react'
import StarWhite from '@/public/StarWhite.svg'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from '@/components/HomePage'

const IntroPage = () => {
  const [progress, setProgress] = useState(13)
  const [showTransition, setShowTransition] = useState(false)
  const [showHome, setShowHome] = useState(false)

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100))
      }, 20)
      return () => clearInterval(interval)
    } else {
      const timeout = setTimeout(() => setShowTransition(true), 300)
      return () => clearTimeout(timeout)
    }
  }, [progress])

  const handleTransitionComplete = () => {
    setShowHome(true)
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {!showHome && (
        <div className="flex flex-col items-center justify-center gap-y-12 z-10">
          <motion.div
            animate={{
              opacity: [1, 0.5, 1],  
              scale: [1, 0.9, 1],  
            }}
            transition={{
              duration: 2,          
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image 
              src={StarWhite}
              alt="WhiteStar"
              className='w-32 h-32'
            />
          </motion.div> 
          <div className='flex flex-col gap-y-8 items-center'>
            <p className='italic text-xl text-center text-white'>this website is built with magic</p>
            <Progress value={progress} className="w-[350px]" />
            <p className='text-white'>{progress}%</p>
          </div>
        </div>
      )}

      {/* AnimatePresence untuk transisi bulatan */}
      <AnimatePresence>
        {showTransition && !showHome && (
          <motion.div
            key="circle"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: '200vw', height: '200vw', borderRadius: '50%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
            onAnimationComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>

      {/* Render HomePage setelah transisi */}
      {showHome && (
        <div className="absolute inset-0 z-30">
          <HomePage />
        </div>
      )}
    </div>
  )
}

export default IntroPage
