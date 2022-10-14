<template>
    <b-modal v-model="show" id="modalMessage">
        <p class="my-4">{{message}}</p>
        <template #modal-footer>
            <div class="w-100" v-if="deleteFunction != null">
                <b-button type="submit" variant="danger" size="sm" class="float-center" @click="deleteFunction">
                    Delete</b-button>
            </div>
            <div v-else></div>
        </template>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    props: ['message', 'deleteFunction'],

}
</script>