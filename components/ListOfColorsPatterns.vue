<template>
    <b-container>
        <h5 class="text-center mb-3">List of Calendars Patterns</h5>
        <ModalForm title="Update Calendar Pattern" :submit="onUpdateColors" ref="formModalUpdate"
            :colorPattern="colorPattern">
        </ModalForm>
        <ModalMessage :message="message" ref="modalMessage"></ModalMessage>
        <ModalMessage :message="message" :deleteFunction="onDeletePattern" ref="modalDelete"></ModalMessage>
        <b-row>
            <b-col sm="4" v-for="colorPattern in listOfPatterns" :value="colorPattern.id" :key="colorPattern.id">
                <b-card v-bind:style="{ 'background-color': colorPattern.bg_color}">
                    <b-card-text>
                        <pre
                            v-bind:style="{ 'color': colorPattern.text_color}">Background Color: {{colorPattern.bg_color}}</pre>
                        <pre
                            v-bind:style="{ 'color': colorPattern.text_color}">Text Color: {{colorPattern.text_color}}</pre>
                        <b-button @click="showModalUpdate(colorPattern)">Edit</b-button>
                        <NuxtLink :to="{ name: 'patterns-id', params: { id: colorPattern.id }}">
                            <b-button variant="primary">Show</b-button>
                        </NuxtLink>
                        <b-button variant="danger" @click="showModalDelete(colorPattern)">Delete</b-button>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
        <b-container class="d-flex justify-content-center">
            <ModalForm title="Create New Calendar Pattern" :submit="onCreateColors" ref="formModalCreate" class="my-5">
            </ModalForm>
        </b-container>
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
                if (e.message == 'Request failed with status code 409') {
                    this.$store.commit('setToken', {});
                    this.$store.commit('changeIsLoggedIn');
                }
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
                await this.$axios(config).then(async () => {
                    this.$refs.formModalUpdate.show = !this.$refs.formModalUpdate.show;
                    await this.loadListOfPatterns();
                    this.message = 'Calendar Pattern Updated Successfully';
                    this.$refs.modalMessage.show = !this.$refs.modalMessage.show;
                });
            }
            catch (e) {
                if (e.message == 'Request failed with status code 409') {
                    this.$store.commit('setToken', {});
                    this.$store.commit('changeIsLoggedIn');
                }
            }
        },

        showModalUpdate(colorPattern) {
            this.colorPattern = colorPattern;
            this.$refs.formModalUpdate.form.bg_color = colorPattern.bg_color;
            this.$refs.formModalUpdate.form.text_color = colorPattern.text_color;
            this.$refs.formModalUpdate.show = !this.$refs.formModalUpdate.show;
        },

        showModalDelete(colorPattern) {
            this.colorPattern = colorPattern;
            this.message = 'Are you sure you want to delete the selected calendar pattern?'
            this.$refs.modalDelete.show = !this.$refs.modalDelete.show;

        },

        async loadListOfPatterns() {
            this.listOfPatterns = await this.$axios.$get("calendar_patterns", { headers: { Authorization: "Bearer " + this.$store.state.token.access_token } });
            this.listOfPatterns = this.listOfPatterns.data.entities;
        },

        async onDeletePattern(event) {
            event.preventDefault();
            let config = {
                method: "DELETE",
                url: "https://sys-dev.searchandstay.com/api/admin/calendar_patterns/" + this.colorPattern.id,
                headers: {
                    "Authorization": "Bearer " + this.$store.state.token.access_token,
                    "Content-Type": "text/plain"
                },
            };
            try {
                await this.$axios(config).then(async response => {
                    this.$refs.modalDelete.show = !this.$refs.modalDelete.show;
                    await this.loadListOfPatterns();
                    this.message = response.data.message;
                    this.$refs.modalMessage.show = !this.$refs.modalMessage.show;
                });
            }
            catch (e) {
                if (e.message == 'Request failed with status code 409') {
                    this.$store.commit('setToken', {});
                    this.$store.commit('changeIsLoggedIn');
                }
            }
        },
    },

    async mounted() {
        await this.loadListOfPatterns();
    },
    components: { ModalForm }
}
</script>