<template>
    <div class="app-container">
        <!--        <p>医院设置列表</p>-->
        <el-form :inline="true">
            <el-form-item label="医院编号">
                <el-input v-model="data.hoscode"/>
            </el-form-item>
            <el-form-item label="医院名称">
                <el-input v-model="data.hosname"/>
            </el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="$router.push('/hospSet/add')">添加</el-button>
            <el-button type="danger" @click="deleteBatch">批量删除</el-button>

        </el-form>
        <!--        <p>{{ list }}</p>-->
        <el-table
            ref="list"
            :data="list"
            style="width: 100%"
        >
            <el-table-column
                type="selection"
            />
            <el-table-column
                prop="id"
                label="编号"
                width="180"
            />
            <el-table-column
                prop="hosname"
                label="医院名称"
                width="180"
            />
            <el-table-column
                prop="hoscode"
                label="医院编码"
            />
            <el-table-column
                prop="apiUrl"
                label="api地址"
            />
            <el-table-column
                prop="signKey"
                label="签名"
            />
            <el-table-column
                prop="contactsName"
                label="联系人名称"
            />
            <el-table-column
                prop="contactsPhone"
                label="联系人电话"
            />
            <el-table-column
                prop="status"
                label="状态"
            >
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '冻结' }}
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
            />
            <el-table-column
                prop="updateTime"
                label="修改时间"
            />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button slot="reference" type="text" size="small" @click="deleteTip(scope.row.id)">删除
                    </el-button>
                    <br>
                    <el-button type="text" size="small" @click="$router.push(`/hospSet/update/${scope.row.id}`)">编辑
                    </el-button>
                    <br>
                    <el-button
                        v-if="scope.row.status === 1"
                        type="text"
                        size="small"
                        @click="lockOrUnlock(scope.row.id, 0, scope.row)"
                    >冻结
                    </el-button>
                    <el-button v-else type="text" size="small" @click="lockOrUnlock(scope.row.id, 1, scope.row)">激活
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="pages.page"
            :page-size="pages.pageSize"
            :total="pages.total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="fetchData"
        />

    </div>
</template>

<script>
import { getList, deleteHospital, deleteBatch, lockOrUnlock } from '@/api/hospset'
import { getDictById } from '@/api/dict'

export default {
    name: 'Index',
    data() {
        return {
            list: null,
            data: {
                'hoscode': '',
                'hosname': ''
            },
            pages: {
                page: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    async created() {
        await this.load(1, this.pages.pageSize, this.data)
        // console.log(await getDictById(86))
    },
    methods: {
        async load(now, size, data) {
            const res = await getList(now, size, data)
            this.list = res.data.records
            this.pages.total = res.data.total
        },
        async fetchData(e) {
            await this.load(e, this.pages.pageSize, this.data)
        },
        async search() {
            this.pages.page = 1
            await this.load(1, this.pages.pageSize, this.data)
        },
        async deleteTip(id) {
            this.$confirm('此操作将永久删除该医院, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await deleteHospital(id)
                this.pages.page = 1
                this.$message({
                    type: 'success',
                    message: res.message
                })
                await this.load(1, this.pages.pageSize, this.data)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        getSelection() {
            const arr = []
            for (let i = 0; i < this.$refs.list.selection.length; i++) {
                arr.push(this.$refs.list.selection[i].id)
            }
            if (arr.length === 0) {
                this.$message({
                    type: 'info',
                    message: '未选择任何医院'
                })
            }
            return arr
        },
        async deleteBatch() {
            const arr = this.getSelection()
            if (arr.length > 0) {
                this.$confirm('此操作将永久删除选中的医院, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    const res = await deleteBatch(arr)
                    this.pages.page = 1
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    await this.load(1, this.pages.pageSize, this.data)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        },
        async lockOrUnlock(id, status, row) {
            const res = await lockOrUnlock(id, status)
            this.$message({
                type: 'info',
                message: res.message
            })
            // console.log(row)
            row.status = status
        }
    }
}
</script>

<style scoped>

</style>
