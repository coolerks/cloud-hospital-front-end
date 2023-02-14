<template>
    <div class="app-container">
        <!--        {{ departmentList }}-->
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-tree
                        :data="departmentList"
                        node-key="depcode" :props="{label: 'depname',children: 'children'}"
                        @node-click="nowClick"
                    >
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { getAllDepartment } from '@/api/department'

export default {
    name: 'department',
    data() {
        return {
            departmentList: null
        }
    },
    async created() {
        this.departmentList = (await getAllDepartment(this.$route.params.id)).data
    },
    methods: {
        nowClick(a, b, c) {
            console.log(a)
            console.log(b)
            console.log(c)
        }
    }
}
</script>

<style scoped>

</style>
<!--94-->
