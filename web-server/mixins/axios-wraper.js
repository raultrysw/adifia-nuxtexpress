const mixin = {
    methods: {
        makeRequest({url, data, headers}, method, cb, errorCb) {
            let req = this.$http[method](url, data, headers)
            console.log('Hacienod peticion a', url);
            
            req.then(response => {
                console.log('respuesta', response);
                
                cb(response.data.items)
            }).catch(({request, response}) => {
                debugger
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