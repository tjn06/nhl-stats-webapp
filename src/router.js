import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import TeamsView from './views/TeamsView.vue'
import TeamView from './views/TeamView.vue'
import PlayerStatsView from './views/PlayerStatsView.vue'
import VisitedPlayersView from './views/VisitedPlayersView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: TeamsView,
      path: '/teams/:conference'
    },
    {
      component: TeamView,
      path: '/team/:teamId'
    },
    {
      component: PlayerStatsView,
      path: '/playerstats/:playerId'
    },
    {
      component: VisitedPlayersView,
      path: '/visitedplayers/:category'
    },
    {
      component: HomeView,
      path: '/'
    }
  ]
})
