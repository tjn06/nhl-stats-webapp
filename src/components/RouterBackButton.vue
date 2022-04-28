<script>
  export default {
    computed: {
      lastRoute: function () {
        return this.$store.state.lastRoute
      }
    },
    props: {
      routeProp: {
        type: String,
        default: null
      }
    }
  }
</script>

<template>
  <button
    v-if="lastRoute"
    type="button"
    @click="$router.push(routeProp ? routeProp : lastRoute)"
  >
    <slot> Button </slot>
  </button>
</template>

<style scoped>
  button {
    /*   width: 100px;
    height: 25px; */
  }
</style>
