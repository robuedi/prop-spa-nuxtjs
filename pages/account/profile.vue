<template>
    <div>
        <router-view></router-view>
        <AccountNavigation activeSection="accountProfile"/>
        <template v-if="user">
            <p class="mb-3">
                <strong>Name</strong>: {{user.name}}
                <br/>
                <strong>Email</strong>: {{user.email}}
                <br/>
                <strong>Account type:</strong> <span >{{activeRole.role.name}}</span>
            </p>
            <button type="button" @click="$router.push({name: 'chooseRoles'})" class="btn btn-outline-dark btn-md mb-5">
                Change profile
            </button>
        </template>
    </div>
</template>

<script>
import AccountNavigation from "../../layouts/account/AccountNavigation";
import {mapGetters} from "vuex";
import apiStates from "@/store/apiStates/apiStateValues";

export default {
    components: {
        AccountNavigation
    },
    computed: {
      ...mapGetters('user', {
        activeRole: 'activeRole',
        apiState: 'authApiState'
      }),
      apiStateLoaded() {
        return this.apiState === apiStates.LOADED;
      },
      apiStateLoading() {
        return this.apiState === apiStates.INIT || this.apiState === apiStates.LOADING;
      }
    },
    watch: {
      apiStateLoaded() {
        this.profileCompletedCheck();
      }
    },
    methods: {
      profileCompletedCheck()
      {
        if(!this.$auth.user)
        {
          this.$router.push({name: 'signIn'})
        }

        if(!this.activeRole)
        {
          this.$router.push({name: 'roles'})
        }
      }
    },
    mounted() {
      this.profileCompletedCheck()
    }
}
</script>

<style scoped>

</style>
