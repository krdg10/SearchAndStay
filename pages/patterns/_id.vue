<template>
    <div>
        <Navbar></Navbar>
        <b-container v-if="$route.params.id && $store.state.isLoggedIn" class="my-5">
            <h4 class="d-flex justify-content-center">Calendar Pattern {{pattern.id}}</h4>
            <b-card v-bind:style="{ 'background-color': pattern.bg_color}">
                <b-card-text class="text-center">
                    <h2 v-bind:style="{ 'color': pattern.text_color}">Background Color: {{pattern.bg_color}}</h2>
                    <h2 v-bind:style="{ 'color': pattern.text_color}">Text Color: {{pattern.text_color}}</h2>
                </b-card-text>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
export default {
    data() {
        return {
            pattern: {}
        };
    },
    methods: {
        async getCalendarPattern() {
            let config = {
                method: "get",
                url: "https://sys-dev.searchandstay.com/api/admin/calendar_patterns/" + this.$route.params.id,
                headers: {
                    "Authorization": "Bearer " + this.$store.state.token.access_token,
                    "Content-Type": "text/plain"
                },
            };
            try {
                await this.$axios(config).then(async (response) => {
                    this.pattern = response.data.data;
                });
            }
            catch (e) {
                if (e.message == "Request failed with status code 409") {
                    this.$store.commit("setToken", {});
                    if (this.$store.state.isLoggedIn) {
                        this.$store.commit("changeIsLoggedIn");
                    }
                    this.$router.push("/");
                }
            }
        },
    },
    async created() {
        if (!this.$store.state.isLoggedIn) {
            this.$router.push("/");
            return;
        }
        if (this.$route.params.id) {
            await this.getCalendarPattern();
        }
        else {
            this.$router.push("/");
            return;
        }
    },
    components: { Navbar }
}
</script>