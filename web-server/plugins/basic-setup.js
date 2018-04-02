import Vue from 'vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faTimes} from '@fortawesome/fontawesome-free-solid'

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:7000/api'
Vue.use(VueAxios, axios)

fontawesome.library.add(faPlus, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)