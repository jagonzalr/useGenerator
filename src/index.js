// https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8
// https://gist.github.com/ericelliott/890c20d18bcc4362048dba2dca8e67ac
'use strict'

import { useEffect, useRef } from 'react'

function* cast(input) {
  return yield input
}

export const useGenerator = generator => {
  const generatorRef = useRef(generator)

  useEffect(() => {
    let ignore = false
    if (generatorRef.current) {
      const instance = generatorRef.current(cast)

      const run = async instance => {
        let result = { value: undefined, done: false }
        while (!result.done) {
          try {
            if (ignore) return
            result = instance.next(result.value)

            try {
              const response = await result.value
              result.value = { response, error: null }
            } catch (err) {
              if (ignore) return
              const error = await err
              result.value = { response: null, error: error.message }
            }
          } catch (err) {
            console.error(`useGenerator - unhandled error: ${err.message}`)
            return
          }
        }
      }

      run(instance)
    }

    return () => {
      console.log('here')
      ignore = true
    }
  }, [generatorRef.current])
}
