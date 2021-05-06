import Api from '../api/Api'

export const actions = {
  async bookProperty ({ dispatch, commit }, data) {
    return Api.post(`/api/v1/users-properties/`, data).then((response) => {
      return response
    }).catch((err) => {
      throw err
    })
  },
}
export default {
  actions
}
