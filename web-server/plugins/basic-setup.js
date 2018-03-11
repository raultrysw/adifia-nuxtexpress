import Vue from 'vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faPlus, faTimes} from '@fortawesome/fontawesome-free-solid'
 
fontawesome.library.add(faPlus, faTimes)


Vue.component('font-awesome-icon', FontAwesomeIcon)