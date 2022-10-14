<template>
    <div>
        <b-button @click="show=true" variant="primary" v-if="title == 'Create New Calendar Pattern'">New Pattern
        </b-button>
        <b-modal v-model="show" :title=title>
            <b-container fluid>
                <b-row class="mb-1 text-center d-flex justify-content-center">
                    <b-form @submit="submit">
                        <b-form-group id="input-group-1" label="Background Color:" label-for="input-1"
                            description="We'll never share your email with anyone else.">
                            <b-form-input id="input-1" type="color" placeholder="Enter email" required
                                v-model="form.bg_color">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Text Color:" label-for="input-2"
                            description="We'll never share your password with anyone else.">
                            <b-form-input id="input-2" type="color" placeholder="Enter password" required
                                v-model="form.text_color">
                            </b-form-input>
                        </b-form-group>
                        <div class="w-100">
                            <b-button type="submit" variant="primary" size="sm" class="float-right">
                                Submit</b-button>
                        </div>
                    </b-form>
                </b-row>
            </b-container>
            <template #modal-footer>
                <div></div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                bg_color: '#000000',
                text_color: '#000000'
            },
            show: false
        }
    },

    props: ['title', 'submit', 'colorPattern'],

    created() {
        if (this.colorPattern) {
            console.log('entrou')
        }
    },
}
</script>

