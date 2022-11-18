import React, { useState } from 'react'
import Styles from './Carousel.module.css'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'


const images = [ 
  'https://http2.mlstatic.com/D_NQ_NP_2X_690713-MLA52105235903_102022-F.webp',
  'https://http2.mlstatic.com/D_NQ_NP_2X_907618-MLA49175636827_022022-F.webp',
  'https://http2.mlstatic.com/D_NQ_NP_2X_986689-MLA47491523775_092021-F.webp'
   ]

   const variants = {
    initial: direction => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        // scale: 0.5,
      }
    },
    animate: {
      x: 0,
      opacity: 1,
      // scale: 1,
      // transition: 'ease-in',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: direction => {
      return {
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
        // scale: 0.5,
        // transition: 'ease-in',
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      }
    },
  }   

const Carousel = () => {

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextStep = () => {
    setDirection(1)
    if (index === images.length - 1) {
      setIndex(0)
      return
    }
    setIndex(index + 1)
  }

  const prevStep = () => {
    setDirection(-1)
    if (index === 0) {
      setIndex(images.length - 1)
      return
    }
    setIndex(index - 1)
  }



  return (
    <div className={Styles.container}>
    <div className={Styles.slideshow}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          variants={variants}
          animate='animate'
          initial='initial'
          exit='exit'
          src={images[index]}
          alt='slides'
          className={Styles.slides}
          key={images[index]}
          custom={direction}
        />
      </AnimatePresence>
      <button className={Styles.prevButton} onClick={prevStep}>
      <BiLeftArrow size={25} />
      </button>
      <button className={Styles.nextButton} onClick={nextStep}>
      <BiRightArrow size={25}/>
      </button>
    </div>
  </div>
  )
}


export default Carousel;