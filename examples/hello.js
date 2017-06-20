var count = 0

var generator = setInterval(() => {
    console.log(JSON.stringify({value: Math.random()}))
    count++
    if (count > 10) {
        clearInterval(generator)
    }
}, 1000)
