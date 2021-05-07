<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item ">
                        <router-link class="nav-link" :to="{ name: 'index' }">Home</router-link>
                    </li>

                    <template v-if="this.$auth.loggedIn">
                      <li class="nav-item ">
                        <router-link class="nav-link" :to="{ path: '/account/profile' }"  >{{ this.$auth.user.name }}</router-link>
                      </li>
                      <li class="nav-item ">
                        <a href="#" class="nav-link" @click.prevent="signOut" >Sign out</a>
                      </li>
                    </template>
                    <template v-else >
                      <li class="nav-item ">
                        <router-link class="nav-link" :to="{ name: 'signIn' }">Sign In</router-link>
                      </li>
                      <li class="nav-item ">
                        <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
                      </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    methods: {
        async signOut () {
            await this.$auth.logout().then(()=>{
                this.$router.replace({ name: 'index' }).catch(()=>{});
            })
        }
    }
}
</script>
