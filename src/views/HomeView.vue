<script>
  import axios from 'axios'

  export default {
    created() {
      this.getConferences()
    },
    methods: {
      getConferences() {
        axios
          .get('https://statsapi.web.nhl.com/api/v1/conferences')
          .then((response) => {
            this.conferences = response.data.conferences
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    data() {
      return {
        conferences: []
      }
    }
  }
</script>

<template>
  <header>
    <h1><span class="yellow">I </span>CONFERENCES</h1>
  </header>
  <section>
    <button :key="conference.id" v-for="conference in conferences">
      <Router-Link :to="`/teams/${conference.name}`">
        {{ conference.name.toUpperCase() }}
      </Router-Link>
    </button>
  </section>
</template>

<style scoped>
  section {
    margin-top: 7vh;
    display: flex;
    flex-wrap: wrap;
  }
  h1 {
    white-space: nowrap;
  }
  button {
    width: 300px;
    font-size: 2.5rem;
    padding: 1rem;
    margin: 10px;
  }
</style>
