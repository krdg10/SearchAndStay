export const state = () => ({
    token: {},
    isLoggedIn: false
})

export const mutations = {
    setToken(state, value) {
        state.token = value
    },

    changeIsLoggedIn(state) {
        state.isLoggedIn = !state.isLoggedIn;
    }
}