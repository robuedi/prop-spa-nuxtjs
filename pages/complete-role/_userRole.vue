<template>
    <div>
        <h1 class="mb-4">Complete Registration</h1>
        <button type="button" @click="$router.push({name: 'roles'})" class="btn btn-outline-dark btn-md mb-5">
            Choose profiles
        </button>

        <p v-if="!this.$auth.user">Loading...</p>
        <p v-if="checkingProfileComplete">{{ checkingProfileComplete }}</p>

        <template v-if="selectedUserRole">

            <h2 v-if="selectedUserRole">{{selectedUserRole.role.name}}</h2>

            <Tenant :roleUserId="this.$route.params.userRole | parseInteger" v-on:checkIfProfileCompleted="checkIfProfileCompleted" v-if="selectedUserRole.role.id === 1" />
            <Buyer :roleUserId="this.$route.params.userRole | parseInteger" v-on:checkIfProfileCompleted="checkIfProfileCompleted" v-else-if="selectedUserRole.role.id === 2" />
            <Landlord :roleUserId="this.$route.params.userRole | parseInteger" v-on:checkIfProfileCompleted="checkIfProfileCompleted"  v-else-if="selectedUserRole.role.id === 3" />
            <Seller :roleUserId="this.$route.params.userRole | parseInteger" v-on:checkIfProfileCompleted="checkIfProfileCompleted"  v-else-if="selectedUserRole.role.id === 4" />
        </template>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

import Buyer from '../../components/complete-role/Buyer'
import Seller from '../../components/complete-role/Seller'
import Tenant from '../../components/complete-role/Tenant'
import Landlord from '../../components/complete-role/Landlord'

export default {
    components: {
        Buyer,
        Seller,
        Tenant,
        Landlord
    },
    data (){
        return {
            selectedUserRole: null,
            checkingProfileComplete: ''
        }
    },
    methods: {
        ...mapActions('user', [
            'checkUserProfileComplete',
            'setActiveRole',
        ]),
        getSelectedUserRole(){
            this.selectedUserRole = this.$auth.user.user_role.filter(userRole => userRole.id === parseInt(this.$route.params.userRole)).shift()
        },
        checkIfProfileCompleted()
        {
            //check if the user role is now completed
            this.checkingProfileComplete = 'Checking if the profile is complete..'
            this.checkUserProfileComplete(this.selectedUserRole.id).then((res) => {
                this.checkingProfileComplete = 'The profile is complete, please wait..'
                if(parseInt(res.data.data.is_completed) === 1)
                {
                    //refresh user data
                    this.$auth.fetchUser().then(() => {
                        let activeRole = this.$auth.user.user_role.filter(userRole => userRole.id === parseInt(this.$route.params.userRole)).shift()
                        this.setActiveRole(activeRole)
                        this.$router.push({path: '/account/profile'})
                    });
                }
            }).catch(() => {
                this.checkingProfileComplete = 'Something went wrong.';
            });
        }
    },
    async fetch() {
      this.getSelectedUserRole()
    }
}
</script>





