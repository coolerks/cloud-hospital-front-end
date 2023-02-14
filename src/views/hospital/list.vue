<template>
    <div class="app-container">
        <!--        {{result}}-->
        <el-table
            ref="list"
            :data="result.content"
            style="width: 100%"
        >
            <el-table-column
                prop="id"
                label="编号"
                width="180"
            />
            <el-table-column
                prop="status"
                label="logo"
            >
                <template slot-scope="scope">
                    <img :src="'data:image/jpeg;base64,' + scope.row.logoData" alt=""/>
                </template>
            </el-table-column>
            <el-table-column
                prop="hosname"
                label="医院名称"
                width="180"
            />
            <!--            <el-table-column-->
            <!--                prop="intro"-->
            <!--                label="介绍"-->
            <!--            />-->
            <el-table-column
                prop="param.hostypeString"
                label="等级"
            />
            <el-table-column
                prop="createTime"
                label="创建时间"
            />
            <el-table-column
                prop="updateTime"
                label="修改时间"
            />
            <el-table-column
                label="状态"
            >
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '上线' : '未上线' }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === 1 ? 'danger' : 'primary'" @click="changeStatus(scope.row)">
                        {{ scope.row.status === 1 ? '下线' : '上线' }}
                    </el-button>
                    <br>
                    <br>
                    <el-button type="primary" @click="$router.push(`/hospital/detail/${scope.row.id}`)">查看</el-button>
                    <br>
                    <br>
                    <el-button type="primary" @click="$router.push(`/hospital/department/${scope.row.hoscode}`)">排班</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="result.pageable.pageNumber"
            :page-size="result.pageable.pageSize"
            :total="result.totalPages"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="fetchData"
        />
    </div>
</template>

<script>
import { getAllHospital, changeHospitalStatus } from '@/api/hospital'

export default {
    name: 'list',
    data() {
        return {
            result: null
        }
    },
    async created() {
        this.result = (await getAllHospital(1, 10)).data
    },
    methods: {
        async fetchData(e) {
            this.result = (await getAllHospital(e - 1, 10)).data
        },
        async changeStatus(row) {
            if (row.status === 1) {
                let result = await changeHospitalStatus(row.id, 0)
                // console.log(result)
                row.status = 0
            } else {
                let result = await changeHospitalStatus(row.id, 1)
                // console.log(result)
                row.status = 1
            }
        }
    }
}
</script>

<style scoped>

</style>
