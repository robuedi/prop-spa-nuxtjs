<template>
    <div>
        <div class="mb-5" v-if="userRolesList.length">
            <h1>Select profile</h1>
            <button type="button" v-for="userRole in userRolesList" @click="userRole.is_completed === 1 ? setActiveUserRole(userRole) : completeUserRole(userRole)" class="btn btn-outline-dark btn-lg btn-block">
                {{ userRole.role.name }}
                <small v-if="userRole.is_completed === 0">(Needs completion)</small>
            </button>
        </div>
        <div v-if="newRoles.length">
            <h1>Add profile</h1>
            <button type="button" v-for="role in newRoles" @click="makeUserRole(role.id)" class="btn btn-outline-dark btn-lg btn-block">
                {{ role.name }}
            </button>
        </div>
    </div>
</template>

<script>

import {mapActions} from "vuex";
import Role from "../api/models/Role";
import RoleUser from "../api/models/RoleUser";

export default {
    data(){
        return {
            newRoles: [],
            userRolesList: []
        }
    },
    methods:{
        ...mapActions('user', ['setActiveRole']),
        setActiveUserRole(userRole)
        {
            this.setActiveRole(userRole)
            this.$router.push({name: 'account'})
        },
        completeUserRole(userRole)
        {
            this.setActiveRole(userRole).then(()=>{
              this.$router.push({path: '/complete-role/'+userRole.id})

            })
        },
        makeUserRole(roleId)
        {
            RoleUser.store({role_id: roleId, user_id: this.$auth.user.id}).then((res) => {
                //set the new role as the active one
                this.setActiveRole(res.data.data).then(()=>{
                  this.$router.push({path: '/complete-role/'+res.data.data.id})
                })
            })
        },
        initLoad() {
            this.userRolesList = this.$auth.user.user_role

            //get any other roles
            Role.all().then((res) => {
                let userRolesIds = this.userRolesList.map(userRole => userRole.role.id);
                this.newRoles = res.data.data.filter(role => !userRolesIds.includes(role.id))
            });
        }
    },
    mounted() {
        this.initLoad()
    }
}
</script>
