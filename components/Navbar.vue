<template>
    <b-navbar toggleable="sm" type="dark" variant="dark" class="mb-5">
        <NuxtLink to="/">
            <b-navbar-brand>Search And Stay</b-navbar-brand>
        </NuxtLink>
        <b-navbar-nav class="ml-auto">
            <a href="#">
                <b-navbar-brand v-if="$store.state.isLoggedIn" @click="logout">Logout</b-navbar-brand>
            </a>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit('setToken', {});
            this.$store.commit('changeIsLoggedIn');
            this.$router.push("/");
            return;
        }
    }
}
</script>