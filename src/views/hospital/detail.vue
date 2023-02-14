<template>
    <div class="app-container">
<!--        {{ $route.params.id }}-->
<!--        {{result}}-->
<!--        <br>-->
        <div style="text-align: center">
            <img :src="'data:image/jpeg;base64,' + result.logoData" alt="" />
        </div>
        <h4>名称：{{result.hosname}}</h4>
        <p>介绍：{{result.intro}}</p>
        <p>状态：{{result.status === 1 ? '上线' : '已下线'}}</p>
        <p>{{result.route}}</p>
        <div>
            <p>规则：</p>
            <li v-for="it in result.bookingRule.rule">
                {{it}}
            </li>
        </div>
    </div>
</template>

<script>
import { getHospital } from '@/api/hospital'

export default {
    name: 'detail',
    data() {
        return {
            result: null
        }
    },
    async created() {
        this.result = (await getHospital(this.$route.params.id)).data;
    }
}
</script>

<style scoped>

</style>
