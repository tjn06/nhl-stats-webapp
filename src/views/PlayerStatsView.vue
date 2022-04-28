<script>
  import axios from 'axios'
  import RouterBackButton from '../components/RouterBackButton.vue'
  export default {
    components: {
      RouterBackButton
    },

    computed: {
      playerHeight: function () {
        if (this.info.height) {
          let f = this.info.height.replace(/['"]+/g, '').split(' ')
          return (f[0] / 0.032808 + f[1] / 0.3937).toFixed(0) + 'cm'
        } else {
          return null
        }
      },
      playerWeight: function () {
        if (this.info.weight) {
          return (this.info.weight / 2.20462262185).toFixed(0) + 'kg'
        } else {
          return null
        }
      },
      isGoalie: function () {
        if (this.info.primaryPosition.code) {
          return this.info.primaryPosition.code === 'G' ? true : false
        } else {
          return null
        }
      },
      totalStats: function () {
        if (this.stats) {
          let totalStats = {
            season: 'All seasons',
            games: 0,
            goals: 0,
            assists: 0,
            points: 0,
            plusMinus: 0,
            pim: 0,
            shots: 0
          }
          for (let i = 0; i < this.stats.length; i++) {
            console.log('gamesdd' + this.stats[0][0].stat.games)
            totalStats.games += this.stats[i][0].stat.games
            totalStats.goals += this.stats[i][0].stat.goals
            totalStats.assists += this.stats[i][0].stat.assists
            totalStats.points += this.stats[i][0].stat.points
            totalStats.plusMinus += this.stats[i][0].stat.plusMinus
            totalStats.pim += this.stats[i][0].stat.pim
            totalStats.shots += this.stats[i][0].stat.shots
          }
          return totalStats
        } else {
          return null
        }
      },
      totalStatsGoalie: function () {
        if (this.stats) {
          let totalStats = {
            season: 'All seasons',
            games: 0,
            wins: 0,
            losses: 0,
            shotsAgainst: 0,
            goalsAgainst: 0,
            goalAgainstAverage: 0,
            saves: 0
          }
          for (let i = 0; i < this.stats.length; i++) {
            totalStats.games += this.stats[i][0].stat.games
            totalStats.wins += this.stats[i][0].stat.wins
            totalStats.losses += this.stats[i][0].stat.losses
            totalStats.shotsAgainst += this.stats[i][0].stat.shotsAgainst
            totalStats.goalsAgainst += this.stats[i][0].stat.goalsAgainst
            if (!this.stats[i][0].stat.goalAgainstAverage) {
              totalStats.goalAgainstAverage += 0
            } else {
              totalStats.goalAgainstAverage +=
                this.stats[i][0].stat.goalAgainstAverage
            }

            totalStats.saves += this.stats[i][0].stat.saves
          }

          totalStats.goalAgainstAverage =
            totalStats.goalAgainstAverage / this.stats.length

          console.log(
            'stats in gaa ' +
              totalStats.goalAgainstAverage +
              'gaatype ' +
              typeof totalStats.goalAgainstAverage
          )

          return totalStats
        } else {
          return null
        }
      }
    },

    data() {
      return {
        error: null,
        loading: false,
        stats: null,
        info: null
      }
    },
    created() {
      this.$watch(
        () => this.$route.params.playerId,
        (newValue, oldValue) => {
          /*           console.log('OLD ' + oldValue + ' NEW ' + newValue) */
          if (newValue) {
            this.getPlayerStats(this.$route.params.playerId)
          }
        },
        { immediate: true }
      )
    },
    methods: {
      redoSeasonYears(seasonYears) {
        return seasonYears.substring(0, 4) + '-' + seasonYears.substring(4, 8)
      },
      getPlayerStats(playerId) {
        let baseUrl = `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
        let statsUrlSegment = `/stats/?stats=statsSingleSeason&season=`

        const requestlUrls = [baseUrl],
          fromSeason = 1997,
          toSeason =
            Number(new Date().getFullYear().toString().substring(2)) +
            (fromSeason < 2000 ? 2000 - fromSeason : 0)
        /*    console.log(toSeason) */

        for (let i = 0; i < toSeason; i++) {
          let y1 = fromSeason + i
          let y2 = y1 + 1
          requestlUrls.push(baseUrl + statsUrlSegment + y1 + '' + y2)
        }

        let playerData = { playerInfo: null, allSeasonsStats: [] },
          promises = []

        requestlUrls.forEach(function (url) {
          promises.push(axios.get(url))
        })

        Promise.all(promises).then((results) => {
          results.forEach((response, index) => {
            if (index === 0) {
              const plInfo = response.data.people[0]
              playerData.playerInfo = plInfo
            } else {
              const season = response.data.stats[0].splits
              playerData.allSeasonsStats.unshift(season)
            }
          })

          this.info = playerData.playerInfo
          this.stats = playerData.allSeasonsStats.filter(
            (season) => season.length !== 0
          )

          this.$store.dispatch({
            type: 'addVisitedPlayers',
            id: this.info.id,
            playerName: this.info.fullName,
            currentTeam: this.info.currentTeam.name,
            isSwedish: this.info.nationality == 'SWE'
          })

          console.log(this.stats[1])
          console.log(playerData.playerInfo)
        })
      }
    }
  }
</script>

<template>
  <header>
    <h1><span class="yellow">I </span> PLAYERSTATS</h1>
    <RouterBackButton> BACK </RouterBackButton>
  </header>
  <section v-if="info">
    <h3>
      {{ info.fullName }} <span class="yellow-abel"> | </span> #{{
        info.primaryNumber
      }}
      <span class="yellow-abel"> | </span>
      {{ info.primaryPosition.name }}
      <span v-if="info.captain"> | Captain</span>
    </h3>

    <article class="player-info" v-if="info">
      <div class="row-info">
        <div class="spacing-info">
          <span>Born:</span><span>{{ info.birthDate }}</span>
        </div>
        <div class="spacing-info">
          <span>Birthplace:</span>
          <span>
            {{ info.nationality }}, {{ info.birthStateProvince
            }}{{ info.birthStateProvince ? ', ' : null }}{{ info.birthCity }}
          </span>
        </div>
      </div>
      <div class="row-info">
        <div class="spacing-info">
          <span>Weight:</span><span>{{ playerWeight }}</span>
        </div>
        <div class="spacing-info">
          <span>Height:</span><span>{{ playerHeight }}</span>
        </div>
      </div>
    </article>
  </section>

  <div>
    <table v-if="stats">
      <tr id="tb-head">
        <th>Season</th>

        <th>GP</th>
        <th>{{ isGoalie ? 'W' : 'G' }}</th>
        <th>{{ isGoalie ? 'L' : 'A' }}</th>
        <th>{{ isGoalie ? 'SA' : 'PTS' }}</th>
        <th>{{ isGoalie ? 'GA' : '+/-' }}</th>
        <th>{{ isGoalie ? 'GAA' : 'PIM' }}</th>
        <th>{{ isGoalie ? 'S' : 'Shots' }}</th>
      </tr>

      <tr class="tb-stats" :key="item.season" v-for="item in stats">
        <td>{{ redoSeasonYears(item[0].season) }}</td>
        <td>{{ item[0].stat.games }}</td>
        <td>{{ isGoalie ? item[0].stat.wins : item[0].stat.goals }}</td>

        <td>{{ isGoalie ? item[0].stat.losses : item[0].stat.assists }}</td>
        <td>
          {{ isGoalie ? item[0].stat.shotsAgainst : item[0].stat.points }}
        </td>
        <td>
          {{ isGoalie ? item[0].stat.goalsAgainst : item[0].stat.plusMinus }}
        </td>
        <td>
          {{
            isGoalie
              ? item[0].stat.goalAgainstAverage?.toFixed(2)
              : item[0].stat.pim
          }}
        </td>
        <td>{{ isGoalie ? item[0].stat.saves : item[0].stat.shots }}</td>
      </tr>

      <tr id="tb-total-stats">
        <td>{{ isGoalie ? totalStatsGoalie.season : totalStats.season }}</td>
        <td>{{ isGoalie ? totalStatsGoalie.games : totalStats.games }}</td>
        <td>{{ isGoalie ? totalStatsGoalie.wins : totalStats.goals }}</td>
        <td>{{ isGoalie ? totalStatsGoalie.losses : totalStats.assists }}</td>
        <td>
          {{ isGoalie ? totalStatsGoalie.shotsAgainst : totalStats.points }}
        </td>
        <td>
          {{ isGoalie ? totalStatsGoalie.goalsAgainst : totalStats.plusMinus }}
        </td>
        <td>
          {{
            isGoalie
              ? totalStatsGoalie.goalAgainstAverage?.toFixed(2)
              : totalStats.pim
          }}
        </td>
        <td>{{ isGoalie ? totalStatsGoalie.saves : totalStats.shots }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  h3 {
    margin: 0rem 0 3rem 0;
  }
  h1 {
    white-space: nowrap;
  }
  .player-info {
    width: 100%;
    margin-bottom: 3rem;
  }
  .row-info {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
  .spacing-info {
    /*     border-bottom: 1px solid black; */
    display: flex;
    justify-content: space-between;
  }
  table {
    width: 100%;
  }
  th {
    text-align: left;
  }
</style>
