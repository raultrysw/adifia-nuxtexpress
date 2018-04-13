const mixin = {
    methods: {
        makeRequest({url, data, options}, method, cb, errorCb) {
            debugger
            let req = this.$http[method](url, data, options)
            console.log('Haciendo peticion a', url);
            
            req.then(response => {
                console.log('respuesta', response);
                
                cb(response.data.items)
            }).catch(({request, response}) => {
                this.log(response.data.message)
                errorCb(response.data)
            })
        },
        log(message) {
            console.log(message)
        }
    }
}

export default mixin;