const mixin = {
    methods: {
        makeRequest(url, data, options) {
            let req = this.$http({
                url
            })
            console.log(req);
            
        }
    }
}

export default mixin;