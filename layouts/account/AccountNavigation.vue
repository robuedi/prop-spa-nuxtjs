<template>
    <div>
        <template v-for="(btnInfo, btnId) in btns" v-if="btnInfo.roles.includes(activeRole.role_id)">
            <button type="button" @click="$router.push({path: btnId})" :class="{ 'active' : activeSection === btnId}"  class="mb-5 mr-4 btn btn-outline-dark">
                {{btnInfo.name}}
            </button>
        </template>
    </div>
</template>


<script>

import rolesSections from "../../plugins/account/rolesSections";
import { mapGetters } from 'vuex'

export default {
    name: 'AccountNavigation',
    props: {
        activeSection: String
    },
    data () {
        return {
            btns: null
        }
    },
    computed: {
      activeRole() {
        return this.$auth.user.active_user_role[0]
      },
    },
    mounted() {
        this.btns = rolesSections
    },
    methods: {
        setActiveSection(sectionName)
        {
            this.activeSection = sectionName
        },
    }
}
</script>

<style scoped>

</style>
