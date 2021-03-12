import Vue from 'vue'
import Vuex, {createLogger} from 'vuex'
import login from "./modules/login";
import adminHome from "./modules/adminHome";
import user from "./modules/user";
import warning from "./modules/warning";
import video from "./modules/video";
import feedback from "./modules/feedback";

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        login,
        adminHome,
        user,
        warning,
        video,
        feedback
    },
    strict: true,
    plugins: debug ? [createLogger()] : []
})
export default store
