<template>
    <div>
        <template >
            <AnnualSalary :roleUserId="this.roleUserId | parseInteger" v-if="activeStep === 0" v-on:hasAnnualSalary="annualSalaryCompleted()"/>
            <Savings :roleUserId="this.roleUserId | parseInteger" v-if="activeStep === 1" v-on:hasSavings="savingsCompleted()"/>
            <Employment :roleUserId="this.roleUserId | parseInteger" v-if="activeStep === 2" v-on:hasEmployment="employmentCompleted()"/>
            <RoleUserAddress :roleUserId="this.roleUserId | parseInteger" v-if="activeStep === 3" v-on:hasAddress="addressCompleted()"/>
        </template>
    </div>
</template>

<script>
import AnnualSalary from '../profile-sections/AnnualSalary'
import Savings from '../profile-sections/Savings'
import Employment from '../profile-sections/Employment'
import RoleUserAddress from '../profile-sections/RoleUserAddress'

export default {
    components: {
        RoleUserAddress,
        AnnualSalary,
        Savings,
        Employment
    },
    props: {
        roleUserId: Number
    },
    data () {
        return {
            activeStep: 0,
            errors: []
        }
    },
    methods: {
        addressChange(address)
        {
            this.form.address = address;
        },
        annualSalaryCompleted()
        {
            this.activeStep = 1;
        },
        savingsCompleted()
        {
            this.activeStep = 2;
        },
        employmentCompleted()
        {
            this.activeStep = 3;
        },
        addressCompleted()
        {
            this.$emit('checkIfProfileCompleted');
        },
    }
}
</script>





