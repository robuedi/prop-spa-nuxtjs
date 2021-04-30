export const state = () => ({
  statuses: [],
})

export const getters = {
  statuses (state) {
    return state.statuses
  }
}

export const mutations = {
  SET_STATUSES (state, value) {
    state.statuses = value
  }
}

export const actions = {
  async getStatuses ({ commit }) {
    if(this.state.statuses)
    {
      return
    }

    await axios.get('/api/v1/property-statuses?fields=id,name').then((response) => {
      commit('SET_STATUSES', response.data.data)
      return response
    }).catch((err) => {
      commit('SET_STATUSES', [])
      throw err
    })
  },
}
