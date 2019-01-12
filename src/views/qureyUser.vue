<template>
<div class="userList">
    <h3>已注册用户列表</h3>
     <el-table
    :data="tableData3"
    border
   
    style="width: 100%">
   
    <el-table-column
      prop="_id"
      label="ID"
      align="center"
      >
      </el-table-column>
    <el-table-column
      prop="userName"
      align="center"
      label="姓名"
       
      >
    </el-table-column>
    <el-table-column
      prop="pwd"
      align="center"
      label="密码">
    </el-table-column>
     <el-table-column
      prop="t"
      align="center"
      label="注册日期"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
        <el-button @click="handleClick(scope.row)"   type="text" size="small">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
export default {
    name:"queryUser",
    data(){
        return{
            tableData3:[]

        }
    },created(){
      this.getUserList()
    },
    methods:{
        handleClick(value){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {id:value._id}
            this.$axios.post('/api/users/userDel',data).then(res=>{
                if(res.data.code==="ok"){
                    this.$message({
                        message:res.data.message,
                        type:'success'
                    })
                    this.getUserList()
                }
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
           
        },
        getUserList(){
            this.$axios.get('/api/users/userList').then(res=>{
                this.tableData3=res.data.data
                console.log(this.tableData3)

            }).catch(err=>{

            })
        }
    }

}
</script>

<style>
.userList {
    width:80%;
    margin:0 auto;
}
</style>
