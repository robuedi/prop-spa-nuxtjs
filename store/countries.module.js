import Country from "../api/models/Country";

export const state = () => ({
  countries: [],
  query: '',
})

export const mutations = {
  SET_COUNTRIES (state, value) {
    state.countries = value
  },

  SET_QUERY (state, value) {
    state.query = value
  }
}

export const getters = {
  countries (state) {
    return state.countries
  },

  query (state) {
    return state.query
  }
}
export const actions = {
  async getCountries ({ commit }, query) {
    if(this.query === query) {
      return this.countries
    }
    else {
      commit('SET_QUERY', query)

      //fetch fresh countries
      return  Country.all(query).then((response) => {
        commit('SET_COUNTRIES', response.data.data)
        return response.data.data
      }).catch((err) => {
        commit('SET_COUNTRIES', [])
        return []
      })
    }
  }
}
