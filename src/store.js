import { createStore } from 'vuex'

const mutations = {
    setVisitedPlayer(state, playerObj) {
      state.visitedPlayers.unshift(playerObj)
    },
    setVisitedSwedishPlayer(state, playerObj) {
      state.visitedSwedishPlayers.unshift(playerObj)
    },
    setLastRoute(state, value) {
      state.lastRoute = value
    }
    /*     addVisitedPlayers(state, payload) {
      console.log('payload', payload.id)
      if (state.visitedPlayers.some((x) => x.id === payload.id)) {
        return
      } else {
        state.visitedPlayers.unshift(payload)
      }
    } */
  },
  state = {
    counter: 2,
    lastRoute: '/',
    visitedPlayers: [],
    visitedSwedishPlayers: []
  },
  actions = {
    addVisitedPlayers({ commit, state }, payload) {
      /*       console.log('payload', payload) */
      if (payload.isSwedish) {
        if (
          state.visitedSwedishPlayers.some((player) => player.id === payload.id)
        ) {
          return
        } else {
          commit('setVisitedSwedishPlayer', payload)
        }
      } else {
        if (state.visitedPlayers.some((player) => player.id === payload.id)) {
          return
        } else {
          commit('setVisitedPlayer', payload)
        }
      }
    }
  }

export default createStore({ mutations, state, actions, strict: true })
