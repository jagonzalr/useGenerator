[![npm version](https://badge.fury.io/js/use-generator.svg)](https://badge.fury.io/js/use-generator)

# useGenerator

[Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Demo](#demo)
- [References](#references)
- [Images](#images)
- [License](#license)

## Getting started

`npm install --save use-generator`

## Usage

```
import { useGenerator } from 'use-generator'
const [ipAddress, setIpAddress] = useState(null)
useGenerator(function* () {
	const ipAddressResponse = yield fetch('https://api.ipify.org').then(data => data.text())
	setIpAddress(ipAddressResponse.value)
}, [])
```

## Demo

```
git clone git@github.com:jagonzalr/useMediaRecorder.git
cd useGenerator
npm intall
npm start
```

## References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
- https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8
- https://gist.github.com/ericelliott/890c20d18bcc4362048dba2dca8e67ac

## Images

- https://www.pexels.com/photo/brown-and-gray-rock-formation-1884306/
- https://www.pexels.com/photo/white-rock-formation-and-blue-body-of-water-2259495/
- https://www.pexels.com/photo/brown-rock-near-body-of-water-2422785/

## License

useGenerator is [MIT licensed](./LICENSE).
