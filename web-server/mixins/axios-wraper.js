const mixin = {
    methods: {
        recover({url, data, headers}, method, cb, errorCb) {
            let req = this.$http[method](url, data, headers)
            console.log('Hacienod peticion a', url);
            
            req.then(response => {
                debugger
                let {data} = response
                cb(data.data)
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