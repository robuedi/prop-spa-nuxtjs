import Api from '../Api'

const VERSION = 'v1'
const END_POINT = () => `roles-users`

export default {
    store(data){
      return Api.post(`${VERSION}/${END_POINT()}`, data);
    },

    update(roleId, data){
      return Api.put(`${VERSION}/${END_POINT()}/${roleId}`, data);
    },
}

