<template>
    <div>
        <h1>Sign In</h1>
        <NotificationLabels :errors="errors"/>
        <form action="#" @submit.prevent="submit">
            <div class="mb-3">
                <label for="InputEmail" class="form-label">Email address</label>
                <input type="email" v-model="form.email" class="form-control w-50" id="InputEmail" >
            </div>
            <div class="mb-3">
                <label for="InputPassword" class="form-label">Password</label>
                <input type="password" class="form-control w-50" v-model="form.password" id="InputPassword">
            </div>
            <button type="submit" class="btn btn-primary"> Sign in</button>
        </form>
    </div>
</template>

<script>
import NotificationLabels from "../components/NotificationLabels";
import {mapActions, mapGetters} from 'vuex'
import RoleUser from "../api/models/RoleUser";

export default {
    components: {
        NotificationLabels
    },
    data () {
        return {
            errors: [],
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        ...mapActions('user', ['setActiveRole']),
        async submit () {
            await this.$auth.loginWith('laravelSanctum', {
              data: {
                email: this.form.email,
                password: this.form.password
              }
            }).then(()=>{
              //no roles, make one
              if(this.$auth.user.user_role.length === 0)
              {
                this.$router.push({name: 'roles'})
                return;
              }

              //check if only one active if it has many
              let activeRoles = this.$auth.user.user_role.filter(userRole => userRole.is_completed === 1);

              //one active role found -> go to it
              if(activeRoles.length === 1 && this.$auth.user.user_role.length === 1)
              {
                this.setActiveRole(activeRoles[0])
                this.$router.push({name: 'account'})
              }
              else
              {
                this.$router.push({name: 'roles'})
              }
            }).catch((err) => {
                for (const [key, msg] of Object.entries(err.response.data.errors)) {
                    this.errors.push(msg[0]);
                }
            })
        },
    }
}
</script>




