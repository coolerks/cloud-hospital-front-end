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
            <el-col :span="18">
                <!--                {{schedule}}-->
                <div class="grid-content bg-purple-light schedule-father">
                    <el-tag @click="switchDay(idx, item)" :type="index === idx ? '' : 'info' "
                            v-for="(item, idx) in schedule.bookingScheduleRuleList" class="schedule"
                    >
                        <p>{{ item.workDate }}-{{ item.dayOfWeek }}</p>
                        <p>{{ item.availableNumber }} / {{ item.reservedNumber }}</p>
                    </el-tag>

                </div>
                <br>
                <el-pagination
                    v-if="schedule.total > limit"
                    :current-page="page"
                    :total="schedule.total"
                    :page-size="limit"
                    class="pagination"
                    layout="prev, pager, next"
                    @current-change="loadDays"
                >
                </el-pagination>
                <el-table
                    border
                    :data="scheduleList"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="docname"
                        label="姓名"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="职称"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="reservedNumber"
                        label="总数"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="availableNumber"
                        label="剩余"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="挂号费"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="skill"
                        label="描述"
                    >
                    </el-table-column>
                </el-table>
<!--                {{ this.scheduleList }}-->

            </el-col>
        </el-row>

    </div>
</template>

<script>
import { getAllDepartment, getSchedule, getScheduleByDate } from '@/api/department'

export default {
    name: 'department',
    data() {
        return {
            departmentList: null,
            schedule: { 'total': 0, 'baseMap': {}, 'bookingScheduleRuleList': [] },
            index: 0,
            page: 1,
            limit: 4,
            depcode: 0,
            scheduleList: []
        }
    },
    async created() {
        this.departmentList = (await getAllDepartment(this.$route.params.id)).data
    },
    methods: {
        async nowClick(a, b, c) {
            if (b.isLeaf) {
                this.schedule = (await getSchedule(this.$route.params.id, b.data.depcode, 1, this.limit)).data
                this.index = 0
                this.page = 0
                this.depcode = b.data.depcode
                this.scheduleList = []
            }
        },
        async switchDay(idx, item) {
            this.index = idx
            this.scheduleList = (await getScheduleByDate(this.$route.params.id, this.depcode, item.workDate)).data

        },
        async loadDays(a) {
            console.log(a)
            this.page = a
            this.schedule = (await getSchedule(this.$route.params.id, this.depcode, a, this.limit)).data
            this.index = 0
        }
    }
}
</script>

<style scoped>
.schedule {
    height: 100px;
    cursor: pointer;
    text-align: center;
    user-select: none;
}

.schedule-father {
    display: flex;
    justify-content: space-around;
}
</style>
<!--94-->
