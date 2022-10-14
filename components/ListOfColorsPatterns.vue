<template>
    <b-container>
        <ModalForm title="Create New Calendar Pattern" :submit="onCreateColors" ref="formModalCreate"></ModalForm>
        <ModalForm title="update" :submit="onUpdateColors" ref="formModalUpdate" :colorPattern="colorPattern">
        </ModalForm>
        <ModalMessage :message="message" ref="modalMessage"></ModalMessage>
        <b-row>
            <b-col cols="4" v-for="colorPattern in listOfPatterns" :value="colorPattern.id" :key="colorPattern.id">
                <b-card style="max-width: 20rem;" v-bind:style="{ 'background-color': colorPattern.bg_color}">
                    <b-card-text>
                        <pre
                            v-bind:style="{ 'color': colorPattern.text_color}">Background Color: {{colorPattern.bg_color}}</pre>
                        <pre
                            v-bind:style="{ 'color': colorPattern.text_color}">Text Color: {{colorPattern.text_color}}</pre>
                        <b-button @click="showModalUpdate(colorPattern)">Edit</b-button>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import ModalForm from './ModalForm.vue';

export default {
    data() {
        return {
            listOfPatterns: [],
            show: false,
            colorPattern: {},
            message: ''
        };
    },
    methods: {
        async onCreateColors(event) {
            event.preventDefault();
            let data = '{ \"calendar_patterns\": { \"bg_color\": \"' + this.$refs.formModalCreate.form.bg_color + '\", \"text_color\": \"' + this.$refs.formModalCreate.form.text_color + '\", \"active\": 1 } }';
            let config = {
                method: "post",
                url: "https://sys-dev.searchandstay.com/api/admin/calendar_patterns",
                headers: {
                    "Authorization": "Bearer " + this.$store.state.token.access_token,
                    "Content-Type": "text/plain"
                },
                data: data
            };
            try {
                await this.$axios(config).then(async () => {
                    this.$refs.formModalCreate.show = !this.$refs.formModalCreate.show;
                    await this.loadListOfPatterns();
                    this.message = 'Calendar Pattern Created Successfully';
                    this.$refs.modalMessage.show = !this.$refs.modalMessage.show;
                });
            }
            catch (e) {
                console.log(e);
            }
        },

        async onUpdateColors(event) {
            event.preventDefault();
            let data = '{ \"calendar_patterns\": { \"bg_color\": \"' + this.$refs.formModalUpdate.form.bg_color + '\", \"text_color\": \"' + this.$refs.formModalUpdate.form.text_color + '\", \"active\": 1 } }';
            let config = {
                method: "put",
                url: "https://sys-dev.searchandstay.com/api/admin/calendar_patterns/" + this.colorPattern.id,
                headers: {
                    "Authorization": "Bearer " + this.$store.state.token.access_token,
                    "Content-Type": "text/plain"
                },
                data: data
            };
            try {
                await this.$axios(config).then(async response => {
                    this.$refs.formModalUpdate.show = !this.$refs.formModalUpdate.show;
                    await this.loadListOfPatterns();
                    this.message = 'Calendar Pattern Updated Successfully';
                    this.$refs.modalMessage.show = !this.$refs.modalMessage.show;
                });
            }
            catch (e) {
                console.log(e);
            }
        },

        showModalUpdate(colorPattern) {
            this.colorPattern = colorPattern;
            this.$refs.formModalUpdate.form.bg_color = colorPattern.bg_color;
            this.$refs.formModalUpdate.form.text_color = colorPattern.text_color;
            this.$refs.formModalUpdate.show = !this.$refs.formModalUpdate.show;
        },

        async loadListOfPatterns() {
            this.listOfPatterns = await this.$axios.$get("calendar_patterns", { headers: { Authorization: "Bearer " + this.$store.state.token.access_token } });
            this.listOfPatterns = this.listOfPatterns.data.entities;
        }
    },

    async mounted() {
        await this.loadListOfPatterns();
    },
    components: { ModalForm }
}
</script>