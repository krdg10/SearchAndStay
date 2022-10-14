<template>
    <Login v-if="!$store.state.isLoggedIn"></Login>
    <ListOfColorsPatterns v-else></ListOfColorsPatterns>
</template>

<script>
import ListOfColorsPatterns from "../components/ListOfColorsPatterns.vue";
export default {
  name: "IndexPage",
  components: { ListOfColorsPatterns }
}
</script>
