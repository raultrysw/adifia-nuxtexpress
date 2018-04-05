const lower = (widthW, width) => widthW < width 
const greater = (widthW, width) => widthW > width 
const equal = (widthW, width) => widthW === width 

const checks = {'-': lower, '+': greater, '=': equal}

const mixin = {
    methods: {
        mqIs(query) {
            const {widths, widthW} = this.$store.state
            
            const [type, width] = [query[0], query.substring(1)]

            if (checks[type]) return checks[type](widthW, widths[width])
        }
    }
}

export default mixin