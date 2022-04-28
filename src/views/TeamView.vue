<script>
  import axios from 'axios'
  import RouterBackButton from '../components/RouterBackButton.vue'

  export default {
    components: {
      RouterBackButton
    },
    data() {
      return {
        error: null,
        teamName: null,
        players: null,
        loading: false
      }
    },
    created() {
      this.$watch(
        () => this.$route.params.teamId,
        (newValue, oldValue) => {
          /*           console.log('OLD ' + oldValue + ' NEW ' + newValue) */
          if (newValue) {
            this.getTeam(this.$route.params.teamId)
          }
        },
        { immediate: true }
      )
    },
    computed: {
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
      }
    },
    methods: {
      getTeam(team) {
        this.error = this.players = null
        this.loading = true
        axios
          .get(
            `https://statsapi.web.nhl.com/api/v1/teams/${team}?expand=team.roster`
          )
          .then((response) => {
            console.log('Playersroster', response)
            this.teamName = response.data.teams[0].name.toUpperCase()
            this.players = response.data.teams[0].roster.roster
          })
      }
    }
  }
</script>

<template>
  <header>
    <h1><span class="yellow">I </span>TEAM</h1>
    <RouterBackButton> BACK </RouterBackButton>
  </header>

  <h3>{{ this.teamName }} PLAYERS</h3>

  <ul v-if="players">
    <section>
      <li
        :key="player.person.id"
        v-for="player in players.slice(0, splitIndexes.fa)"
      >
        <Router-Link :to="`/playerstats/${player.person.id}`">
          {{ player.person.fullName }},
          <strong>{{ player.position.name }}</strong>
        </Router-Link>
      </li>
    </section>
    <section>
      <li
        :key="player.person.id"
        v-for="player in players.slice(splitIndexes.fb)"
      >
        <Router-Link :to="`/playerstats/${player.person.id}`">
          {{ player.person.fullName }},
          <strong>{{ player.position.name }}</strong>
        </Router-Link>
      </li>
    </section>
  </ul>
</template>

<style scoped>
  h1 {
    white-space: nowrap;
  }
  li {
    list-style-type: square;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    /*  border: 1px solid black; */
  }
  strong {
    font-size: 0.9rem;
  }
</style>
