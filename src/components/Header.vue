<template>
    <div class="block">
        <h3>欢迎来到Tanzhiyong的博客</h3>
        <el-avatar shape="square" :size="100" fit="fill" :src="user.avatar"></el-avatar>
        <div>{{user.username}}</div>

        <div class="maction">
            <el-link type="primary" href="/blogs">
                <span>主页</span>
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="success" href="/blog/add">
                <span>发表文章</span>
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <span  v-show="myParam">
                <el-link type="success"  :href="url">
                    <span>编辑文章</span>
                </el-link>
                <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="danger" @click="logout" v-show="isLogin">
                <span>退出</span>
            </el-link>
            <el-link type="danger" href="/login" v-show="!isLogin">
                <span>登录</span>
            </el-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                user: {
                    username: 'username',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
                isLogin: true,
                url: "/blog/"+this.blogId+"/edit"
            }
        },
        props: {
            myParam: false,
            blogId: ''
        },
        methods: {
            logout() {
                const _this = this
                // this.$router.push("/")
                this.isLogin = false
                _this.$axios.get('/logout', {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    _this.$store.commit("REMOVE_INFO")
                    _this.$router.push("/login")
                })
            }
        },
        created() {
            if(this.$store.getters.getUser.username) {
                this.user.username = this.$store.getters.getUser.username
            }
        },
    }
</script>

<style scoped>

    .block {
        max-width: 960px;
        margin: 0 auto;
    }
    .maction {
        padding: 10px;
        margin: 0 auto;
    }
</style>
