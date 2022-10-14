<template>
  <div>
    <Navbar></Navbar>
    <Login v-if="!$store.state.isLoggedIn"></Login>
    <ListOfColorsPatterns v-else></ListOfColorsPatterns>
  </div>
</template>

<script>
import ListOfColorsPatterns from "../components/ListOfColorsPatterns.vue";
import Navbar from "../components/Navbar.vue";
export default {
  name: "IndexPage",
  components: { ListOfColorsPatterns, Navbar }
}
</script>
