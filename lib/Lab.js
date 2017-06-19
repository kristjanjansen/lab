class Lab {
    
    constructor(token = null) {
        this.token = process.env.LAB_TOKEN || null
        if (!this.token) {
            throw 'You will need to pass a token as Lab() parameter or LAB_TOKEN environment variable'
        }
    }

    log(message) {
        console.log(message)
    }
}

module.exports = Lab