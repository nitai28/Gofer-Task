<template>
    <section class="contact-exhibition">
        <div class="recent-user">
            <h2>Recent Users</h2>
            <ul>
                <li v-for="(contact,idx) in contacts" :key="contact.id" class="circle-photos-content">
                    <img v-if="idx<11&&contact.photo" class="circle-photo" :src="contact.photo" alt="contact">
                    <avatar v-if="!contact.photo"
                            :fullname="contact.firstName +' '+ contact.lastName" size="50"></avatar>

                    <div v-if="idx===11" class="circle-photo">
                        <span>+{{contacts.length-11}}</span>
                    </div>

                </li>
            </ul>

        </div>

        <div class="recent-photos">
            <h2>Recent Photos</h2>
            <ul class="recent-photos-content">
                <li v-for="(contact,idx) in contacts" :key="contact.id" class="recent-photos-list">

                    <div v-if="idx===0" class="pic large">
                        <img v-if="contact.photo" :src="contact.photo" alt="" class="img ">
                        <avatar v-else class="pic large" :fullname="contact.firstName +' '+ contact.lastName"
                                size="50"></avatar>

                    </div>
                    <div v-if="idx===1" class="pic medium">
                        <img v-if="contact.photo" :src="contact.photo" alt="" class="img ">
                        <avatar v-else class="pic medium" :fullname="contact.firstName +' '+ contact.lastName"
                                size="50"></avatar>

                    </div>
                    <div v-if="idx>=2 && idx<5" class="pic small">
                        <img v-if="contact.photo" :src="contact.photo" alt="" class="img">
                        <avatar v-else class="pic small" :fullname="contact.firstName +' '+ contact.lastName"
                                size="50"></avatar>

                        <div v-if="idx===4" class="counter-pic">+{{contacts.length-5}}</div>
                    </div>

                </li>
            </ul>

        </div>
    </section>
</template>

<script>
    import Avatar from 'vue-avatar-component'

    export default {
        name: "contact-exhibition",
        computed: {
            contacts() {
                return this.$store.getters.contactsForDisplay;
            }
        },
        components: {
            Avatar
        }
    }
</script>

<style lang="scss" scoped>

    .contact-exhibition {
        height: auto;
        min-width: 271px;
        max-width: 271px;
        background-color: #f5f7fa;
        border-left: 1px solid #d0d4e4;
        text-align: left;
        .recent-user {
            max-height: 400px;
            text-align: left;
            margin: 30px 30px 51px;

            h2 {
                font-weight: bold;
                margin-bottom: 30px;
                font-size: 16px;
                color: #131b3c;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                .circle-photos-content {
                    margin-bottom: 30px;
                    &:not(:nth-child(3n)) {
                        margin-right: 30px;

                    }

                    .circle-photo {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 40px;
                        object-fit: cover;
                        background-color: #8b8b8b;
                        color: white;
                        font-size: 16px;
                    }

                }

            }
        }
        .recent-photos {
            height: 400px;
            margin: 0 34px 34px;
            h2 {
                margin-bottom: 34px;
                font-size: 16px;
                color: #131b3c;
                font-weight: bold;

            }
            .recent-photos-content {
                display: grid;
                grid-template-columns: repeat(3, 50px);
                grid-template-rows: repeat(3, 77px);
                grid-gap: 24px;
                li {
                    &:nth-child(1) {
                        grid-area: 1/1/span 2/span 2;

                    }
                    &:nth-child(2) {
                        grid-area: 3/1/span 1/span 2;
                    }
                    &:nth-child(5) {
                        position: relative;
                    }
                    .pic {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .img {
                            height: 96%;
                            width: 96%;
                            object-fit: cover;
                        }
                    }
                    .small, .large, .medium {
                        object-fit: contain;
                        background-color: #ffffff;
                        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                    }
                    .counter-pic {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        color: white;
                        font-size: 18px;
                        background-color: rgba(0, 0, 0, 0.5);
                        font-weight: bold;
                    }

                }

            }
        }

    }

</style>