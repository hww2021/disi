<template>
  <div class="container">
    <el-table
      ref="multipleTable"
      :data="newUserData"
      style="width: 100%"
      height="720px"
      :header-cell-style="headerStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
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
            @click.native.prevent="changeStatus(scope.row)"
            disabled
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
        <el-button @click="batchChangeStatus('activate')">批量启用</el-button>
        <el-button @click="batchChangeStatus('deactivate')">批量停用</el-button>
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
    <add-user :visible.sync="isShow" :row="row" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
import AddUser from "@/views/settings/users/AddUser.vue";
export default {
  name: "",
  components: { AddUser },
  data() {
    return {
      multipleSelection: [],
      isShow: false,
      row: {},
    };
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
    ...mapActions("users", [
      "getUserData",
      "handleIsActive",
      "handleIsBatchActive",
    ]),
    handleSizeChange(val) {
      this.setParams({ pageSize: val });
      this.getUserData();
    },
    handleCurrentChange(val) {
      this.setParams({ currentPage: val });
      this.getUserData();
    },
    changeStatus(row) {
      if (!row.name) {
        this.$message.error("请补充姓名后再操作！");
        return;
      }
      this.$confirm(`确定${row.status ? "停用" : "启用"}该用户？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.handleIsActive(row);
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    batchChangeStatus(type) {
      const names = this.multipleSelection.map((item) => item.name);
      if (names.includes("")) {
        this.$message.error("请补充姓名后再操作！");
        return;
      }
      this.$confirm(
        `确定${type === "activate" ? "启用" : "停用"}选中的用户？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const ids = this.multipleSelection.map((item) => item.id);
          const params = { type: type, id: ids };
          console.log("params", params);
          this.handleIsBatchActive(params);
        })
        .catch(() => {});
    },
    edit(row) {
      this.isShow = true;
      this.row = { ...row };
    },
    del(row) {
      this.$confirm("确认删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await api.del(row.id);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUserData();
          } catch (err) {
            this.$message.error(err.message);
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
  .el-switch.is-disabled {
    opacity: 1;
  }
  .el-switch.is-disabled {
    /deep/ .el-switch__core {
      cursor: pointer !important;
    }
  }
  .el-switch.is-disabled {
    /deep/.el-switch__label {
      cursor: pointer !important;
    }
  }
}
</style>
