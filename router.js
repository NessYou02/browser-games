import { createMemoryHistory, createRouter } from 'vue-router'

import Wordle from './src/views/Wordle.vue'
import HangMan from '@/views/HangMan.vue'

const routes = [
  { path: '/', component: Wordle },
  { path: '/Hangman', component: HangMan },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router