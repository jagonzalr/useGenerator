/* eslint-disable */
'use strict'

import React, { useState } from 'react'
import 'whatwg-fetch'

import { useGenerator } from '../src/index'

import './styles/tailwind.css'
import './styles/index.scss'

import useAsyncEffect from '@n1ru4l/use-async-effect'

const App = () => {
  const [images, setImages] = useState([])
  const [ipAddress, setIpAddress] = useState(null)

  useGenerator(function* (cast) {
    let images = []
    const img1 = yield* cast(
      fetch(
        'https://images.pexels.com/photos/1884306/pexels-photo-1884306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      )
    )
    const img2 = yield* cast(
      fetch(
        'https://images.pexels.com/photos/2259495/pexels-photo-2259495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      )
    )
    const img3 = yield* cast(
      fetch(
        'https://images.pexels.com/photos/2422785/pexels-photo-2422785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      )
    )
    if (!img1.error) images.push(img1.response.url)
    if (!img2.error) images.push(img2.response.url)
    if (!img3.error) images.push(img3.response.url)

    const ipAddressResponse = yield* cast(
      fetch('https://api.ipify.org').then(data => data.text())
    )

    setImages(images)
    setIpAddress(ipAddressResponse.response)
  }, [])

  return (
    <div className='container mx-auto px-3 py-3'>
      <h1 className='bold font-bold text-3xl flex-1'>useGenerator</h1>
      {ipAddress && <p className='my-2'>Your IP address is: {ipAddress}</p>}
      <div className='flex flex-wrap'>
        {images.map(imageUrl => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={imageUrl}
            className='flex-1'
          />
        ))}
      </div>
    </div>
  )
}

export default App
