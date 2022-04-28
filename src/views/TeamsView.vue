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
        teams: null,
        firstColumn: null,
        secondColumn: null,
        loading: false
      }
    },
    created() {
      this.$watch(
        () => this.$route.params.conference,
        (newValue, oldValue) => {
          /*           console.log('OLD ' + oldValue + ' NEW ' + newValue) */
          if (newValue) {
            this.getTeams(this.$route.params.teamId)
          }
        },
        { immediate: true }
      )
    },
    computed: {
      oppositeVisitedRoute: function () {
        return this.oppositeConfernece() ? '/teams/Western' : '/teams/Eastern'
      },
      oppositeVisitedName: function () {
        return this.oppositeConfernece() ? 'WESTERN' : 'EASTERN'
      },
      splitIndexes: function () {
        if (this.teams) {
          let even = this.teams.length % 2
          let split = this.teams.length / 2
          if (this.teams.length === 1) {
            return { fa: 1, fb: 2 }
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
      oppositeConfernece() {
        if (this.$route.params.conference === 'Eastern') {
          return true
        } else {
          return false
        }
      },
      filterConferenceTeams(teams) {
        return teams.filter(
          (team) => team.conference.name === this.$route.params.conference
        )
      },
      getTeams() {
        this.error = this.teams = null
        this.loading = true
        axios
          .get('https://statsapi.web.nhl.com/api/v1/teams')
          .then((response) => {
            console.log('Teams', response)
            this.teams = this.filterConferenceTeams(response.data.teams)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<template>
  <header>
    <h1><span class="yellow">I </span>TEAMS</h1>
    <div>
      <RouterBackButton :route-prop="oppositeVisitedRoute">
        {{ oppositeVisitedName }}
      </RouterBackButton>
      <RouterBackButton> BACK </RouterBackButton>
    </div>
  </header>

  <h3>
    {{ $route.params.conference.toUpperCase() }}
    {{ Object.keys($route.params)[0].toUpperCase() }}
  </h3>
  <ul v-if="teams">
    <section>
      <li :key="team.id" v-for="team in teams.slice(0, splitIndexes.fa)">
        <Router-Link :to="`/team/${team.id}`">
          {{ team.name }}
        </Router-Link>
      </li>
    </section>
    <section>
      <li :key="team.id" v-for="team in teams.slice(splitIndexes.fb)">
        <Router-Link :to="`/team/${team.id}`">
          {{ team.name }}
        </Router-Link>
      </li>
    </section>
  </ul>
</template>

<style scoped>
  h1 {
    margin: 0;
  }
  h1 {
    white-space: nowrap;
  }
  li {
    list-style-type: square;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    /* border: 1px solid black; */
  }
</style>
