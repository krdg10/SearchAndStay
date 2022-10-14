<template>
    <b-modal v-model="show" id="modalMessage">
        <p class="my-4">{{message}}</p>
        <template #modal-footer>
            <div></div>
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
    props: ['message'],

}
</script>