<template>
    <section class="contact-exhibition">
        <div class="recent-user">
            <h2>Recent Users</h2>
            <ul>
                <li v-for="(contact,idx) in contacts" :key="contact.id" class="circle-photos-content">
                    <img v-if="idx<12" class="circle-photo" :src="contact.photo" alt="contact">
                    <div v-if="idx===12" class="circle-photo" >
                        <span>+{{contacts.length-11}}</span>
                    </div>

                </li>
            </ul>

        </div>

        <div class="recent-photos">
            <h2>Recent Photos</h2>
            <ul>
                <li></li>
            </ul>

        </div>
    </section>
</template>

<script>
    export default {
        name: "contact-exhibition",
        computed: {
            contacts() {
                return this.$store.getters.contactsForDisplay;
            }
        },
    }
</script>

<style lang="scss" scoped>

    .contact-exhibition {
        height: auto;
        min-width: 271px;
        max-width: 271px;
        background-color: #f5f7fa;
        border-left: 1px solid #d0d4e4;
        .recent-user {
            height: 50%;
            text-align: left;
            margin: 30px 30px 51px;
            h2{
                font-weight: bold;
                margin-bottom:30px ;
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

    }

</style>