<template>
    <div class="mContainer">
        <Header :myParam="isLogin" :blogId="blogId"></Header>
        <div class="mblog">
            <h1>{{blog.title}}</h1>
            <el-divider></el-divider>
            <div class="mDescription">
                <b>摘要：</b>
                {{blog.description}}
            </div>
            <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>

</template>

<script>
    import Header from '../components/Header'
    import 'github-markdown-css/github-markdown.css'
    export default {
        name: "BlogDetail",
        data() {
            return {
                blog: {
                    title: '',
                    description: '',
                    content: ''
                },
                isLogin: '',
                blogId: ''
            }
        },
        components: {Header},
        created() {
            this.isLogin = true
            console.log(this.isTrue)
            const _this = this
            this.blogId = this.$route.params.blogId
            this.$axios.get('/blog/'+this.blogId).then( res => {
                console.log(res)
                const blog = res.data.data
                _this.blog.title = blog.title
                _this.blog.description = blog.description

                //对内容的Markdown格式的文档进行渲染，需要用到MarkdownIT的工具
                var MarkdownIt = require("markdown-it")
                var md = new MarkdownIt()

                var result = md.render(blog.content)
                _this.blog.content = result
            })
        }
    }
</script>

<style scoped>
    .mblog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 960px;
        min-height: 700px;
        padding: 20px 15px;
    }
    .mContainer {
        max-width: 960px;
        margin: 0 auto;
    }

    .markdown-body {
        text-align: left;
    }

    .mDescription {
        text-align: left;
    }

    .button {
        text-align: right;
        padding: 5px;
    }

</style>
