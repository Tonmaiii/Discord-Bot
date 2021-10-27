const awaits = []

class MessageAwait {
    constructor(resolveFunction) {
        this.resolveFunction = resolveFunction
        this.resolved = false
        awaits.push(this)
    }

    async resolve() {
        this.promise = await new Promise(
            (resolve, reject) => (this.deferred = { resolve, reject })
        )
        const result = await this.promise
        return result
    }

    receiveMessage(message) {
        const resolving = this.resolveFunction(message)
        if (resolving?.resolved) {
            this.deferred.resolve(resolving.result)
        }
    }
}

const receiveMessage = message => {
    awaits.forEach(messageAwait => messageAwait.receiveMessage(message))
}

const awaitUntilMessage = async resolveFunction => {
    const awaitMessage = new MessageAwait(resolveFunction)
    const result = await awaitMessage.resolve()
    return result
}

module.exports = { awaitUntilMessage, receiveMessage }
