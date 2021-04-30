import Api from '../Api'

const VERSION = 'v1'
const END_POINT = () => `users/${store.getters['auth/userId']}/roles-users`

export default {
    store(roleId){
      //TODO FIX THIS
      return Api.post(`${VERSION}/${END_POINT('99')}`, {role_id: roleId});
    },
}

