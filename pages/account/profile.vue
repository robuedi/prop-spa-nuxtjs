<template>
    <div>
        <router-view></router-view>
        <AccountNavigation activeSection="accountProfile"/>
        <template v-if="this.$auth.user">
            <p class="mb-3">
                <strong>Name</strong>: {{this.$auth.user.name}}
                <br/>
                <strong>Email</strong>: {{this.$auth.user.email}}
                <br/>
                <strong>Account type:</strong> <span >{{this.$auth.user.active_user_role[0].role.name}}</span>
            </p>
            <button type="button" @click="$router.push({name: 'roles'})" class="btn btn-outline-dark btn-md mb-5">
                Change profile
            </button>
        </template>
    </div>
</template>

<script>
import AccountNavigation from "../../layouts/account/AccountNavigation";

export default {
    components: {
        AccountNavigation
    },
    methods: {
      profileCompletedCheck()
      {
        if(!this.$auth.user)
        {
          this.$router.push({name: 'signIn'})
        }

        if(this.$auth.user.active_user_role.length === 0)
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
