<template>
    <section class="user-msg">
        <div v-if="mode==='add'" class="user-message-box">
            <img class="sign" src="" alt="">
            <span>User Added</span>
            <img class="x" src="" alt="">
        </div>
        <div v-if="mode==='delete' " class="user-message-box">
            <img class="sign" src="" alt="">
            <span>User Deleted</span>
            <img class="x" src="" alt="">
        </div>


    </section>
</template>

<script>
    export default {
        name: "user-msg",
        // props: [mode],
        // data(){
        //     // return{
        //     //     mode:''
        //     // }
        // },
        // created() {
        //     setTimeout(() => {
        //         this.mode = '';
        //     }, 5000);
        // },
        computed:{
            mode(){
                return this.$store.getters.userMsgMode();
            }

        }
    }
</script>

<style lang="scss" scoped>
    .user-msg {
        position: absolute;
        z-index: 2;
        top: 30px;
        right: 30%;

    }

    .user-message-box {
        display: flex;
        align-items: center;
        position: relative;
        width: 156px;
        height: 36px;
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
        span {
            color: #535a5f;
            font-size: 13px;
        }
    }
</style>