<template>
  <div class="container">
    <el-dialog
      title="添加用户"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓">
              <el-input
                v-model="userForm.firstName"
                autocomplete="off"
                placeholder="请输入姓氏"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名">
              <el-input
                v-model="userForm.lastName"
                autocomplete="off"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="userForm.username"
            autocomplete="off"
            placeholder="请输入账号，支持手机号或邮箱"
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="区号">
              <el-select v-model="userForm.areaCode" placeholder="请选择区号">
                <el-option
                  v-for="item in areaData"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="手机号">
              <el-input
                v-model="userForm.phone"
                autocomplete="off"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱">
          <el-input
            v-model="userForm.email"
            autocomplete="off"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属组织" prop="siteVal">
          <el-select
            v-model="userForm.siteVal"
            placeholder="请选择组织"
            ref="siteSelect"
          >
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              style="padding: 0 6px"
            ></el-input>
            <el-option
              :label="userForm.siteName"
              :value="userForm.siteVal"
              hidden
            ></el-option>

            <el-tree
              :data="newSiteData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              ref="tree"
              :default-expand-all="true"
              :filter-node-method="filterNode"
            ></el-tree>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleVal">
          <el-select
            v-model="userForm.roleVal"
            placeholder="请选择角色"
            multiple
            filterable
          >
            <el-option
              v-for="item in roleData"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="userForm.note"
            autocomplete="off"
            placeholder="请输入描述内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userForm.status"
            :active-text="userForm.status ? '启用' : '停用'"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      userForm: {
        firstName: "",
        lastName: "",
        username: "",
        areaCode: 0,
        phone: "",
        email: "",
        siteVal: "",
        siteName: "",
        roleVal: [],
        note: "",
        status: true,
      },
      areaData: [
        { label: "中国（+86）", value: 0 },
        { label: "美国（+1）", value: 1 },
      ],
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        siteVal: [{ required: true, message: "请选择组织", trigger: "change" }],
        roleVal: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      defaultProps: {
        children: "children",
        label: "name",
      },
      filterText: "",
    };
  },
  props: ["visible", "row"],
  computed: {
    ...mapState("global", ["roleData", "siteData"]),
    newSiteData() {
      return [{ ...this.siteData, name: "总部" }];
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    row(v) {
      console.log(v);
      this.userForm = {
        ...v,
        areaCode: v.phone ? (v.phone.slice(0, -11) === "+86" ? 0 : 1) : 0,
        phone: v.phone.slice(-11),
        siteVal: v.siteIds[0],
        roleVal: v.groups.map((item) => item.id),
      };
    },
  },
  created() {},
  methods: {
    ...mapActions("users", ["getUserData"]),
    handleClose() {
      this.$emit("update:visible", false);
      this.userForm = {
        firstName: "",
        lastName: "",
        username: "",
        areaCode: 0,
        phone: "",
        email: "",
        siteVal: "",
        siteName: "",
        roleVal: [],
        note: "",
        status: true,
      };
    },
    handleNodeClick(data) {
      this.userForm.siteVal = data.id;
      this.userForm.siteName = data.name;
      this.$refs.siteSelect.blur();
      this.filterText = "";
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleAdd() {
      this.$confirm("确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const {
              firstName,
              lastName,
              username,
              areaCode,
              phone,
              email,
              siteVal,
              siteName,
              roleVal,
              note,
              status,
            } = this.userForm;
            const params = {
              first_name: firstName,
              last_name: lastName,
              username: username,
              phone: phone
                ? areaCode === 0
                  ? "+86" + "-" + phone
                  : "+1" + "-" + phone
                : "",
              email: email,
              site_ids: [siteVal],
              group_ids: roleVal,
              note: note,
              is_active: status,
            };
            if (this.row) {
              await api.update(this.row.id, params);
            } else {
              await api.add(params);
            }

            this.$message({
              type: "success",
              message: "提交成功!",
            });
            this.getUserData();
            this.handleClose();
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
  /deep/.el-dialog {
    width: 660px;
  }
}
/deep/ .el-select {
  width: 100%;
}
</style>
