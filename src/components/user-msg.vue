<template>
    <section v-if="alive" class="user-msg">
        <div v-if="mode==='add'" class="user-message-box">
            <img class="sign" src="/img/user-msg/check-include.svg" alt="">
            <span>User Added</span>
            <img class="x" src="/img/contact-list/close-remove-md.svg" alt="">
        </div>
        <div v-if="mode==='delete' " class="user-message-box">
            <img class="sign " src="/img/user-msg/exclude-sm.svg" alt="">
            <span>User Deleted</span>
            <img class="x" src="/img/contact-list/close-remove-md.svg" alt="">
        </div>


    </section>
</template>

<script>
    import EventBusService, {SHOW_MSG} from '../services/EventBusService.js'

    export default {


        name: "user-msg",
        data() {
            return {
                alive: false,
                // msg: null,
                mode: null,
            }
        },

        created() {
            EventBusService.$on(SHOW_MSG, msg=>{
                this.mode = msg;
                var delay = msg.delay || 5000;
                this.alive = true;
                setTimeout(() => {
                    this.alive = false;
                }, delay)
            })
        },
        components: {
            EventBusService,
            SHOW_MSG

        }
    }
</script>

<style lang="scss" scoped>
    .user-msg {
        position: absolute;
        z-index: 2;
        top: 30px;
        right: 0;
        margin-right: 30px;

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
        .sign{
            margin-left: 12px;
            margin-right: 7px;
        }
        span {
            color: #535a5f;
            font-size: 13px;
            margin-right: 23px;
        }

    }
</style>