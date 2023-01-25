<template>
    <div class="app-container">
        <el-button @click="exportData(`/dict/admin/cmn/dict/exportAll/`)" type="primary" size="small">导出所有 </el-button>
        <el-button @click="dialogImportVisible = true" type="primary" size="small">导入</el-button>
        <br>
        <br>


        <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
            <el-form label-position="right" label-width="170px">

                <el-form-item label="文件">
                    <el-upload
                        :multiple="false"
                        :on-success="onUploadSuccess"
                        :action="'/dict/admin/cmn/dict/import'"
                        class="upload-demo"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogImportVisible = false">
                    取消
                </el-button>
            </div>
        </el-dialog>


        <el-table
            :data="result"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            lazy
            :load="load"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            >
            <el-table-column
                prop="name"
                label="名称"
                sortable
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="dictCode"
                label="编码"
                sortable
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                label="值"
            >
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
            >
                <template slot-scope="scope">

                    <el-button @click="exportData(`/dict/admin/cmn/dict/export/${scope.row.parentId}`)" type="text"
                               size="small"
                    >导出父项
                    </el-button>
                    <br>
                    <el-button @click="exportData(`/dict/admin/cmn/dict/export/${scope.row.id}`)" type="text"
                               size="small"
                    >导出子项
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getDictById } from '@/api/dict'

export default {
    name: 'list',
    data() {
        return {
            result: null,
            dialogImportVisible: false
        }
    },
    methods: {
        async getList(id) {
            this.result = (await getDictById(id)).data
        },
        async load(tree, treeNode, resolve) {
            let id = tree.id
            let res = await getDictById(id)
            resolve(res.data)
        },
        exportData(url) {
            window.location.href = url
        },
        onUploadSuccess(response, file) {
            this.$message.info('上传成功')
            this.dialogImportVisible = false;
            this.$router.go(0);
        }

    },
    created() {
        this.getList(0)
    }
}
</script>

<style scoped>

</style>
