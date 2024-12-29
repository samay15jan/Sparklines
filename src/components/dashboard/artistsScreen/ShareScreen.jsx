import React, { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { motion } from 'framer-motion'

const ShareScreen = ({ newURL }) => {
  const [url, setUrl] = useState(newURL)
  const ref = useRef(null)

  useEffect(() => {
    qrCode.append(ref.current)
  }, [])

  useEffect(() => {
    qrCode.update({
      data: url,
    })
  }, [url])

  const onUrlChange = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  return (
    <motion.div
      key='qr'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className='App'>
        <div className='absolute z-20 opacity-90' ref={ref} />
      </div>
    </motion.div>
  )
}

const qrCode = new QRCodeStyling({
  type: 'canvas',
  shape: 'square',
  width: 380,
  height: 380,
  margin: 1,
  imageOptions: {
    saveAsBlob: true,
    hideBackgroundDots: false,
    imageSize: 0.8,
    margin: 0,
  },
  dotsOptions: {
    type: 'extra-rounded',
    color: '#ebebeb',
    roundSize: true,
    gradient: {
      type: 'radial',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#ffffff' },
      ],
    },
  },
  backgroundOptions: { round: 4, color: '', gradient: null },
  image: null,
  dotsOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#6a1a4c',
      color2: '#6a1a4c',
      rotation: '0',
    },
  },
  cornersSquareOptions: { type: 'dot', color: '#ffffff' },
  cornersSquareOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#000000',
      color2: '#000000',
      rotation: '0',
    },
  },
  cornersDotOptions: { type: 'dot', color: '#ffffff', gradient: null },
  cornersDotOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#000000',
      color2: '#000000',
      rotation: '0',
    },
  },
  backgroundOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#ffffff',
      color2: '#ffffff',
      rotation: '0',
    },
  },
})

export default ShareScreen
