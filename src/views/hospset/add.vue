<template>
  <div class="app-container">
    <el-form label-width="120px" :inline="true">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <br>
      <el-form-item :style="{display: 'block', textAlign: 'center'}">
        <el-button type="primary" @click="addOrUpdateHospital">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { addHospital, updateHospital, getHospital } from '@/api/hospset'

export default {
  name: 'Empty',
  data() {
    return {
      hospitalSet: {
        'apiUrl': '',
        'contactsName': '',
        'contactsPhone': '',
        'hoscode': '',
        'hosname': ''
      },
      update: false,
      id: 0
    }
  },
  async created() {
    this.id = this.$route.params.id
    this.update = this.$route.params.id !== undefined
    if (this.update) {
      const { data } = await getHospital(this.id)
      console.log(data)
      this.hospitalSet = data
      delete data.createTime
      delete data.updateTime
      delete data.status
      delete data.param
      delete data.isDeleted
      delete data.signKey
    }
  },
  methods: {
    async addOrUpdateHospital() {
      if (!this.update) {
        const res = await addHospital(this.hospitalSet)
        if (res.code !== 200) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
          this.$router.push('/hospSet/list')
        }
      } else {
        this.updateHospital()
      }
    },
    async updateHospital() {
      const res = await updateHospital(this.hospitalSet)
      if (res.code !== 200) {
        this.$message.error('更新失败')
      } else {
        this.$message.success('更新成功')
        this.$router.push('/hospSet/list')
      }
    }
  }
}
</script>

<style scoped>

</style>
