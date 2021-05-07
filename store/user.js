import apiStates from "./apiStates/apiStateValues";
import Api from '../api/Api'
import RoleUser from "@/api/models/RoleUser";

export const state = () => ({
  authApiState: apiStates.INIT,
  activeRole : null
})

export const mutations = {

  SET_ACTIVE_ROLE (state, value) {
    state.activeRole = value,
      state.apiState = apiStates.LOADING
  },

  SET_AUTH_API_STATE (state, value) {
    state.authApiState = value
  }
}

export const getters = {

  activeRole (state) {
    return state.activeRole
  },

  authApiState (state) {
    return state.authApiState
  },
}
export const actions = {

  async setActiveRole({commit}, activeRole)
  {
    return await RoleUser.update(activeRole.id, {is_used: 1}).then(() => {
      return this.$auth.fetchUser().then(()=>{
        const usedRole = this.$auth.user.user_role.filter((_userRole => _userRole.is_used === 1))
        if(usedRole.length === 1) {
          commit('SET_ACTIVE_ROLE', usedRole[0])
        }

        commit('SET_AUTH_API_STATE', apiStates.LOADED)
      })
    }).catch(() => {
      commit('SET_AUTH_API_STATE', apiStates.ERROR)
    })
  },

  async checkUserProfileComplete({dispatch}, userRoleId)
  {
    return await RoleUser.update(userRoleId, {is_completed: 1}).then((res) => {
        return this.$auth.fetchUser().then(() => {
           return res
        })
    });
  },
}


export default {
  state,
  mutations,
  getters,
  actions,
}
