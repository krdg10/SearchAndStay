<template>
    <div>
        <b-card v-for="colorPattern in listOfPatterns" :value="colorPattern.id" :key="colorPattern.id"
            style="max-width: 20rem;"
            v-bind:style="{ 'background-color': colorPattern.bg_color, 'color': colorPattern.text_color}">
            <b-card-text>
                <pre>Background-color Color: {{colorPattern.bg_color}}</pre>
                <pre>Text Color: {{colorPattern.text_color}}</pre>
            </b-card-text>
        </b-card>
    </div>
</template>
<script>

export default {
    data() {
        return {
            listOfPatterns: []
        }
    },

    async mounted() {
        this.listOfPatterns = await this.$axios.$get("calendar_patterns", { headers: { Authorization: 'Bearer ' + this.$store.state.token.access_token } });
        this.listOfPatterns = this.listOfPatterns.data.entities;
    }
}
</script>