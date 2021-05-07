import apiStates from "./apiStates/apiStateValues";
import Api from '../api/Api'

export const state = () => ({
  authApiState: apiStates.INIT,
  authenticated: false,
  user: null,
})

export const mutations = {
  SET_AUTHENTICATED (state, value) {
    state.authenticated = value
  },

  SET_USER (state, value) {
    state.user = value,
      state.apiState = apiStates.LOADING
  },

  SET_AUTH_API_STATE (state, value) {
    state.authApiState = value
  }
}

export const getters = {
  authenticated (state) {
    return state.authenticated
  },

  user (state) {
    return state.user
  },

  userId (state) {
    if(state.user) {
      return state.user.id
    }
    else {
      return null;
    }
  },

  authApiState (state) {
    return state.authApiState
  },
}

//make form data
// const formData = new FormData();
// formData.append('email', credentials.email)
// formData.append('password', credentials.password)
//
// return this.$auth.loginWith('laravelSanctum', {
//   data: formData
// })
export const actions = {
  async signIn ({ dispatch }, credentials) {
    this.$auth.loginWith('laravelSanctum', {
      data: {
        email: credentials.email,
        password: credentials.password
      }
    })
  },

  async register ({ dispatch }, user) {
    await Api.get('/sanctum/csrf-cookie')
    return Api.post('/register', user)
  },

  async me ({ commit }) {
    return await Api.get('/user').then((response) => {
      commit('SET_AUTHENTICATED', true)
      commit('SET_USER', response.data)
      commit('SET_AUTH_API_STATE', apiStates.LOADED)

      const usedRole = response.data.user_role.filter((_userRole => _userRole.is_used === 1))
      if(usedRole.length === 1) {
        commit('SET_ACTIVE_ROLE', usedRole[0])
      }
    }).catch(() => {
      commit('SET_AUTHENTICATED', false)
      commit('SET_USER', null)
      commit('SET_ACTIVE_ROLE', null)
      commit('SET_AUTH_API_STATE', apiStates.ERROR)
    })
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
