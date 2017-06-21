var count = 0
var generator = setInterval(() => {
    console.log(JSON.stringify({metric: Math.random()}))
    count++
    if (count > 9) {
        clearInterval(generator)
    }
}, 1000)
