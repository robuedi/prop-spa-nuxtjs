<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <router-link class="nav-link" :to="{ name: 'index' }">Home</router-link>
                    </li>

                    <template v-if="this.$auth.loggedIn">
                      <router-link class="nav-link" :to="{ name: 'account' }"  >{{ this.$auth.user.name }}</router-link>
                      <a href="#" class="nav-link" @click.prevent="signOut" >Sign out</a>
                    </template>
                    <template v-else >
                      <li class="nav-item dropdown">
                        <router-link class="nav-link" :to="{ name: 'signIn' }">Sign In</router-link>
                      </li>
                      <li class="nav-item dropdown">
                        <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
                      </li>
                    </template>
<!--                    <template v-else-if="profileCompleted">-->
<!--                        <router-link class="nav-link" to="/account"  >{{ user.name }}</router-link>-->
<!--                    </template>-->
<!--                    <template v-else>-->
<!--                        <router-link class="nav-link" to="/complete-register"  >{{ user.name }}</router-link>-->
<!--                        <a href="#" class="nav-link" @click.prevent="signOut" >Sign out</a>-->
<!--                    </template>-->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters({
            user: "auth_/user",
            authenticated: "auth_/authenticated",
        })
    },
    methods: {
        ...mapActions('auth_', {
            signOutAction: 'signOut'
        }),
        async signOut () {
            await this.signOutAction().then(()=>{
                this.$router.replace({ name: 'signIn' }).catch(err => {})
            })
        }
    }
}
</script>
