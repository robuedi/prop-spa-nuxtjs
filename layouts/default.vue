<template>
  <div>
    <Navigation />
    <div class="container pt-5">
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }"  />
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation'

export default {
  components: {
    Navigation
  }
}
</script>
