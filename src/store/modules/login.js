const state = () => ({
    login_form: {
        username: '',
        password: ''
    },
    loginFormRules: {
        username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
        ]
    },
    userType: 0
})

const getters = {}

const actions = {}

const mutations = {}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}
