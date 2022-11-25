<template>
  <div class="container">
    <el-table
      :data="newUserData"
      style="width: 100%"
      height="720px"
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="name" label="姓名" width=""> </el-table-column>
      <el-table-column prop="username" label="账号" width=""> </el-table-column>
      <el-table-column prop="phone" label="手机号" width=""> </el-table-column>
      <el-table-column prop="email" label="邮箱" width=""> </el-table-column>
      <el-table-column prop="siteName" label="所属站点" width="">
      </el-table-column>
      <el-table-column prop="roles" label="角色" width=""> </el-table-column>
      <el-table-column prop="status" label="状态" width="">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-text="scope.row.status ? '启用' : '停用'"
          >
          </el-switch>
        </template>
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
    <div class="table-footer">
      <div>
        <el-button>批量启用</el-button>
        <el-button>批量停用</el-button>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: { userData: [] },
  data() {
    return {};
  },
  props: [],
  computed: {
    ...mapState("users", ["params", "total", "userData"]),
    ...mapState("global", ["siteData"]),
    newUserData() {
      return this.convert(this.userData, this.siteData);
    },
  },
  watch: {},
  created() {
    this.getUserData();
  },
  methods: {
    ...mapMutations("users", ["setParams"]),
    ...mapActions("users", ["getUserData"]),
    handleSizeChange(val) {
      this.setParams({ pageSize: val });
      this.getUserData();
    },
    handleCurrentChange(val) {
      this.setParams({ currentPage: val });
      this.getUserData();
    },
    edit(row) {},
    del(row) {},

    convert(userData, siteData) {
      const map = new Map(
        siteData.children && siteData.children.length
          ? siteData.children.map((item) => [item.id, item.name])
          : []
      );
      const newUserData =
        userData.length && map.size
          ? userData.map((item) => ({
              ...item,
              siteName: item.siteIds
                .map((item) => (map.has(item) ? map.get(item) : ""))
                .join("、"),
            }))
          : [];
      return newUserData;
    },
    headerStyle() {
      return "background-color:#fafafa";
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
  .table-footer {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
}
</style>
