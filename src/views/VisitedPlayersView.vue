<script>
  import RouterBackButton from '../components/RouterBackButton.vue'

  export default {
    components: {
      RouterBackButton
    },
    data() {
      return {
        error: null,
        teamName: null,
        loading: false
      }
    },
    computed: {
      oppositeVisitedRoute: function () {
        return this.oppositeCategory()
          ? '/visitedplayers/swe'
          : '/visitedplayers/all'
      },
      oppositeVisitedName: function () {
        return this.oppositeCategory() ? 'SWEDISH' : 'ALL'
      },
      splitIndexes: function () {
        if (this.players) {
          let even = this.players.length % 2
          let split = this.players.length / 2
          if (this.players.length === 1) {
            return { fa: 1, fb: 1 }
          } else if (even === 0) {
            return { fa: split, fb: split }
          } else {
            return { fa: Math.ceil(split), fb: -Math.floor(split) }
          }
        }
        return null
      },
      playersHeader: function () {
        console.log('papapdda', this.$route.params.category)
        if (this.$route.params.category === 'all') {
          return 'ALL PLAYERS'
        } else if (this.$route.params.category === 'swe') {
          return 'VISTED SWEDISH PLAYERS'
        } else {
          return 'ALL PLAYERS'
        }
      },
      players: function () {
        console.log('papapdda', this.$route.params.category)
        if (this.$route.params.category === 'all') {
          return this.$store.state.visitedPlayers
        } else if (this.$route.params.category === 'swe') {
          return this.$store.state.visitedSwedishPlayers
        } else {
          return this.$store.state.visitedPlayers
        }
      }
    },
    created() {},
    methods: {
      oppositeCategory() {
        if (this.$route.params.category === 'all') {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<template>
  <header>
    <h1><span class="yellow">I </span>VISITED</h1>
    <div>
      <RouterBackButton> BACK </RouterBackButton>
      <RouterBackButton :route-prop="oppositeVisitedRoute">
        {{ oppositeVisitedName }}
      </RouterBackButton>
    </div>
  </header>
  <div>
    <h3>{{ playersHeader }}</h3>
  </div>

  <ul v-if="players">
    <section>
      <li :key="player.id" v-for="player in players.slice(0, splitIndexes.fa)">
        <Router-Link :to="`/playerstats/${player.id}`">
          {{ player.playerName }},
          <strong>{{ player.currentTeam }}</strong>
        </Router-Link>
      </li>
    </section>
    <section>
      <li :key="player.id" v-for="player in players.slice(splitIndexes.fb)">
        <Router-Link :to="`/playerstats/${player.id}`">
          {{ player.playerName }},
          <strong>{{ player.currentTeam }}</strong>
        </Router-Link>
      </li>
    </section>
  </ul>
</template>

<style scoped>
  /*   h1 {
    margin: 0;
  } */
  h1 {
    white-space: nowrap;
  }
  li {
    list-style-type: square;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    /*   border: 1px solid black; */
  }
  strong {
    font-size: 0.9rem;
  }
</style>
