const state = () => ({
})

const getters = {}

const actions = {
    topFixed({commit}, payload) {
        commit('topFixed', payload)
    },
    changeCollapse({commit}) {
        commit('changeCollapse')
    }
}

const mutations = {
    topFixed(state, payload) {
        if (state.topBarFixed !== payload.fixed) {
            state.topBarFixed = payload.fixed
        }
    },
    changeCollapse(state) {
        state.isCollapsed = !state.isCollapsed
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}
