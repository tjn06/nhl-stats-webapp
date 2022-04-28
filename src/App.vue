<script>
  export default {
    components: {},
    created() {
      this.$watch(
        () => this.$route.fullPath,
        (newValue, oldValue) => {
          if (oldValue === 'undefined') {
            this.$store.commit('setLastRoute', '/')
          } else {
            this.$store.commit('setLastRoute', oldValue)
          }
          console.log(' NEWRAPP ', newValue)
          console.log('OLDRAPP ', oldValue)
        },
        { immediate: true }
      )
    },
    data() {
      return {
        propNr: 10
      }
    },
    computed: {
      cFromState: function () {
        return this.$store.state.counter
      },
      visitedPlayers: function () {
        return this.$store.state.visitedPlayers.slice(0, 9)
      },
      visitedSwedishPlayers: function () {
        return this.$store.state.visitedSwedishPlayers.slice(0, 4)
      }
    },
    methods: {
      increment() {
        this.propNr++
      }
    }
  }
</script>

<template>
  <nav>
    <h3><span class="yellow">JUST</span>NHL<span class="gray">STATS</span></h3>
    <button><RouterLink to="/">HOME</RouterLink></button>
  </nav>

  <main>
    <div class="router-container">
      <RouterView />
    </div>
    <div class="aside-container">
      <header>
        <h2>VISITED</h2>
      </header>
      <section>
        <aside class="aside-border">
          <Router-Link to="/visitedplayers/all">
            <h3>ALL PLAYERS ></h3>
            <h4>LAST 10</h4>
          </Router-Link>
          <ul>
            <li :key="player.id" v-for="player in visitedPlayers">
              <Router-Link :to="`/playerstats/${player.id}`">
                {{ player.playerName }}, {{ player.currentTeam }}
              </Router-Link>
            </li>
          </ul>
        </aside>
        <aside class="aside-border">
          <Router-Link to="/visitedplayers/swe">
            <h3>SWEDISH PLAYERS ></h3>
            <h4>LAST 5</h4>
          </Router-Link>
          <ul>
            <li :key="player.id" v-for="player in visitedSwedishPlayers">
              <Router-Link :to="`/playerstats/${player.id}`">
                {{ player.playerName }}, {{ player.currentTeam }}
              </Router-Link>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  </main>
</template>

<style scoped>
  main {
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
    /*  border: 2px solid red; */
  }
  .router-container {
    /*  border: 2px solid blue; */
  }
  .aside-container > section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  nav {
    display: flex;
    padding: 0.5rem;
    margin-bottom: 7vh;
  }

  nav h3 {
    margin-right: 5%;
  }
  main h3 {
    margin: 1rem 0 10px 0;
    background: rgb(196, 196, 196, 0.1);
    color: #c8c7ca;
  }
  main h3:hover,
  main h3:focus {
    background: rgb(196, 196, 196, 0.3);
    color: white;
  }

  li {
    list-style-type: square;
  }

  .aside-border {
    /*  border-bottom: 2px solid gray; */
  }
  @media screen and (min-width: 1024px) {
    main {
      max-width: 1200px;
      grid-template-columns: 1fr 320px;
    }
  }
</style>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap');
  body,
  html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
  }

  body {
    background: linear-gradient(-217deg, #29263d, #464354);
    color: white;
  }
  body {
    font-family: 'Abel', cursive;
  }
  button,
  h1,
  h2,
  h3,
  h4 {
    font-family: 'Fugaz One', cursive;
  }

  button {
    font-size: 1.2rem;
    background: rgb(196, 196, 196, 0.1);
    color: #c8c7ca;
    border: none;
    margin: 0 3px 0 3px;
    padding-top: 3px;
    cursor: pointer;
  }
  button:hover,
  button:focus {
    background: rgb(196, 196, 196, 0.3);
    color: white;
  }

  button:focus {
  }

  button:active {
    transform: scale(0.99);
  }

  h1 {
    margin: 0;
    font-size: 3rem;
  }
  h2 {
    margin: 0;
    color: #d5ff3d;
    font-size: 2.3rem;
  }
  h3 {
    margin: 0;
    font-size: 1.3rem;
  }
  h4 {
    margin: 0;
    color: #d5ff3d;
    font-size: 1rem;
  }
  a {
    color: #c8c7ca;
    text-decoration: none;
  }
  a:hover {
    color: white;
    text-decoration: none;
  }
  header {
    display: flex;
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgb(255, 255, 255, 0.16);
  }

  .gray {
    color: #a6a6a6;
  }
  .yellow {
    color: #d5ff3d;
  }
  .yellow-abel {
    font-family: 'Abel', cursive;
    color: #d5ff3d;
  }
</style>
