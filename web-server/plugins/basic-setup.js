import Vue from 'vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faTimes} from '@fortawesome/fontawesome-free-solid'
import mixinMQ from '../mixins/mediaQueries'
import axiosWraper from '../mixins/axios-wraper'
import protoMixin from '../mixins/proto-mixin'

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:7000/api'
Vue.use(VueAxios, axios)

fontawesome.library.add(faPlus, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.mixin(mixinMQ)
Vue.mixin(axiosWraper)
Vue.mixin(protoMixin)