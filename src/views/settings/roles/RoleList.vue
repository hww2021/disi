<template>
  <div class="container">
    <el-table
      :data="roleData"
      style="width: 100%"
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="name" label="角色名称" width="">
        <template slot-scope="scope">
          <div>
            <div>{{ scope.row.name }}</div>
            <div class="note">{{ scope.row.note }}</div>
          </div>
        </template>
      </el-table-column>
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
      :current-page="params.currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px; text-align: right"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/roles.js";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {
    ...mapState("roles", ["roleData", "total", "params"]),
  },
  watch: {},
  created() {
    this.getRoleData();
  },
  methods: {
    ...mapMutations("roles", ["setParams"]),
    ...mapActions("roles", ["getRoleData"]),
    handleSizeChange(val) {
      this.setParams({ pageSize: val });
      this.getRoleData();
    },
    handleCurrentChange(val) {
      this.setParams({ currentPage: val });
      this.getRoleData();
    },
    headerStyle() {
      return "background-color:#fafafa";
    },
    edit(row) {
      this.$router.push({ name: "AddRole", params: { id: row.id } });
    },
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await api.del(row.id);
            this.getRoleData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
  .note {
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }
}
</style>
