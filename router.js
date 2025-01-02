import { createMemoryHistory, createRouter } from 'vue-router'

import HangMan from './views/HangMan.vue'

const routes = [
  { path: '/', component: HangMan },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router