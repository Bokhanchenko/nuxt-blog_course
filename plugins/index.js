import Vue from 'vue'
import './element-ui'
import dateFilter from '@/common/filters/date.filter'

import VueMarkdown from 'vue-markdown'

Vue.component('vue-markdown', VueMarkdown);
Vue.filter('date', dateFilter);
