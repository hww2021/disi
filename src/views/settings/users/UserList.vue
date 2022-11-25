<template>
  <div class="container">
    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width=""> </el-table-column>
      <el-table-column prop="username" label="账号" width=""> </el-table-column>
      <el-table-column prop="phone" label="手机号" width=""> </el-table-column>
      <el-table-column prop="email" label="邮箱" width=""> </el-table-column>
      <el-table-column prop="site" label="所属站点" width=""> </el-table-column>
      <el-table-column prop="roles" label="角色" width=""> </el-table-column>
      <el-table-column prop="status" label="状态" width=""> </el-table-column>
      <el-table-column prop="action" label="操作项" width="">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            circle
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: { userData: [] },
  data() {
    return {
      userData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    edit(row) {},
    del(row) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
