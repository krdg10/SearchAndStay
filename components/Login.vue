<template>
    <b-form>
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1"
            description="We'll never share your email with anyone else.">
            <b-form-input id="input-1" type="email" placeholder="Enter email" v-model="form.email" required>
            </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2"
            description="We'll never share your password with anyone else.">
            <b-form-input id="input-2" type="password" placeholder="Enter password" v-model="form.password" required>
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    </b-form>
</template>

<script>

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },

        }
    },

    methods: {
        async onSubmit(event) {
            let login = '{"login": {"email": "' + this.form.email + '","password": "' + this.form.password + '"}}';
            //  login = JSON.stringify({ login: { email: this.email, password: this.password } });
            console.log(login)
            event.preventDefault();
            try {
                this.invalidSign = false;
                await this.$axios
                    .$post("login_json", login)
                    .then(res => {
                        if (res.success) {
                            this.$store.commit('setToken', res.data.result);
                            this.$store.commit('changeIsLoggedIn');
                        }
                    });
            } catch (e) {
            }
        },
    }
}
</script>