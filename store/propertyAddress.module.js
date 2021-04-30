export const state = () => ({
  userPropertyAddress: [],
  propertyAddress: [],
})

export const mutations = {
  SET_USER_PROPERTY_ADDRESS (state, value) {
    state.userPropertyAddress = value
  },

  SET_PROPERTY_ADDRESS (state, value) {
    state.userPropertyAddress = value
  }
}

export const getters = {
  userPropertyAddress (state) {
    return state.userPropertyAddress
  },
  propertyAddress (state) {
    return state.propertyAddress
  }
}
export const actions = {
  async storeUserPropertyAddress ({ commit, rootGetters }, data) {
    return axios.post(`/api/v1/users/${rootGetters['auth/userId']}/properties/${data.propertyId}/addresses`, data.address).then((response) => {
      commit('SET_USER_PROPERTY_ADDRESS', response.data.data)
      return response
    }).catch((err) => {
      commit('SET_USER_PROPERTY_ADDRESS', [])
      throw err
    })
  },

  async showPropertyAddress ({ dispatch, commit }, propertyId) {
    await axios.get('/api/v1/properties/'+propertyId+'/address').then((response) => {
      commit('SET_PROPERTY_ADDRESS', response.data.data)
      return response
    }).catch((err) => {
      commit('SET_PROPERTY_ADDRESS', null)
      throw err
    })
  }
}
