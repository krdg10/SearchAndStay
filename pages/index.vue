<template>
  <b-container class="bv-example-row">
    <Login v-if="!$store.state.isLoggedIn"></Login>
    <ListOfColorsPatterns v-else></ListOfColorsPatterns>
  </b-container>
</template>

<script>
import ListOfColorsPatterns from "../components/ListOfColorsPatterns.vue";
export default {
  name: "IndexPage",
  components: { ListOfColorsPatterns }
}
</script>
