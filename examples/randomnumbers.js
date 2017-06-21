console.log('Hello from standalone experiment')
console.log(process.argv.slice(2).join(' '))

var count = 0

var generator = setInterval(() => {
    console.log(JSON.stringify({metric: Math.random()}))
    count++
    if (count > 10) {
        clearInterval(generator)
    }
}, 1000)
