'use strict'

import { useEffect, useRef } from 'react'

export const useGenerator = generator => {
  const generatorRef = useRef(generator)

  useEffect(() => {
    let ignore = false
    if (generatorRef.current) {
      const genFunc = generatorRef.current()

      const execute = async () => {
        let result = { value: null, done: false }
        while (!result.done) {
          try {
            if (ignore) return
            result = genFunc.next(result.value)

            try {
              const value = await result.value
              result.value = { value, error: null }
            } catch (err) {
              if (ignore) return
              const error = await err
              result.value = { value: null, error: error.message }
            }
          } catch (err) {
            console.error(`useGenerator - unhandled error: ${err.message}`)
            return
          }
        }
      }

      execute()
    }

    return () => {
      ignore = true
    }
  }, [generatorRef.current])
}
