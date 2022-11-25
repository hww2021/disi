<template>
  <div class="container">
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="name" label="角色名称" width=""> </el-table-column>
      <el-table-column prop="userCount" label="分配用户数" width="">
      </el-table-column>
      <el-table-column prop="modifier" label="修改人" width="">
      </el-table-column>
      <el-table-column prop="lastUpdatedTime" label="更新时间" width="">
      </el-table-column>
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
  components: {},
  data() {
    return {
      data: [],
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
<style scoped lang="less">
.container {
  margin-top: 20px;
  .el-table__row:hover button {
    background-color: #f5f7fa;
    color: #000;
  }
  .el-table__cell {
    button {
      border: 0;
    }
    button:hover {
      background-color: #ebeef5;
    }
  }
}
</style>
