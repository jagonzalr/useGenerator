'use strict'

import React, { Fragment, useState } from 'react'
import 'whatwg-fetch'

import { useGenerator } from '../src/index'

import './styles/tailwind.css'
import './styles/index.scss'

const IMAGE_URLS = [
  'https://images.pexels.com/photos/1884306/pexels-photo-1884306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2259495/pexels-photo-2259495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2422785/pexels-photo-2422785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

const IP_URL = 'https://api.ipify.org'

const App = () => {
  const [startFetching, setStarFetching] = useState(false)
  const [images, setImages] = useState([])
  const [ipAddress, setIpAddress] = useState(null)
  const [loading, setLoading] = useState(true)

  useGenerator(
    function* () {
      if (startFetching) {
        let images = []
        for (let i = 0; i < IMAGE_URLS.length; i++) {
          const url = IMAGE_URLS[i]
          const img = yield fetch(url)
          if (!img.error) images.push(img.value.url)
        }

        const ipResponse = yield fetch(IP_URL).then(data => data.text())

        setImages(images)
        setIpAddress(ipResponse.value)
        setLoading(false)
      }
    },
    [startFetching]
  )

  return (
    <div className='container mx-auto px-3 py-3'>
      <h1 className='bold font-bold text-3xl flex-1'>useGenerator</h1>
      {!startFetching && (
        <button onClick={() => setStarFetching(true)}>Fetch</button>
      )}
      {startFetching && (
        <Fragment>
          {loading ? (
            <p className='my-2'>Fetching data ...</p>
          ) : (
            <Fragment>
              {ipAddress && (
                <p className='mt-2 mb-4'>Your IP address is: {ipAddress}</p>
              )}
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
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default App
