const lower = (widthW, width) => widthW < width 
const greater = (widthW, width) => widthW > width 
const equal = (widthW, width) => widthW === width 

const checks = {lower, greater, equal}

const mixin = {
    methods: {
        mqIs(type, width) {
            const {widths, widthW} = this.$store.state            
            if (checks[type]) return checks[type](widthW, widths[width])
        }
    }
}

export default mixin