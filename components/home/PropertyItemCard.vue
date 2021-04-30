<template>
    <div class="card " @click="redirectToProperty">
        <div class="card-img-top" v-if="property.images !== 'undefined' && property.images.length > 0 ">
            <img :src="imagesBaseURL + property.images[0].path" alt="Card image cap">
        </div>
        <div class="card-body">
<!--            <template v-if="property.user_type">-->
<!--                <strong class="float-right">-->
<!--                    <span class="badge badge-primary" v-if="property.user_type.type_id === 3">Rent</span>-->
<!--                    <span class="badge badge-success" v-else-if="property.user_type.type_id === 4">Buy</span>-->
<!--                </strong>-->
<!--            </template>-->
            <h5 class="card-title">{{property.name}}</h5>
            <p class="card-text">
                {{property.address.city.country.name+', '+property.address.city.name}}
                <br/>
                <span class="float-right">Added on {{property.created_at | date}}</span>
            </p>

        </div>
    </div>
</template>


<script>

import serversConf from  '../../plugins/serversConf'

export default {
    props: {
        property: Object
    },
    data() {
      return {
        imagesBaseURL: serversConf.imagesBaseURL
      }
    },
    methods: {
        redirectToProperty() {
            this.$router.push({path: '/property/'+this.property.slug})
        }
    }
}
</script>

<style scoped lang="css">

.card-img-top {
    height: 250px;
    overflow: hidden;

}
.card-img-top img {
        height:100%;
        object-fit: cover;
    }
</style>
