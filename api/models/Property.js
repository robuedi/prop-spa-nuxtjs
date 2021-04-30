import Api from '../Api'

const VERSION = 'v1'
const END_POINT = 'properties'

export default {

    async all(query = ''){
        return await Api.get(`${VERSION}/${END_POINT}${query}`);
    },

    async showSlug(slug, query = ''){
        return await Api.get(`${VERSION}/${END_POINT}/${slug}${query}`);
    },

}
