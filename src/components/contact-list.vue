<template>
    <section class="contact-list">
        <div class="contact-list-content">
            <div class="contact-box">
                <h2 class="list-headline">Gofer Users</h2>

            </div>
            <div class="seperator"></div>
            <ul>

                <li v-for="contact in contacts" :key="contact.id" @click="updateCurrentContact(contact.id)">
                    <div class="contact-box">
                        <div class="half-box">
                            <img class="contact-img" :src="contact.photo" alt="">
                            <h2 class="contact-full-name">{{contact.firstName}} {{contact.lastName}}</h2>

                        </div>
                        <img v-if="currentContact&& contact.id===currentContact.id" @click.stop="closeDetails" src="/img/contact-list/close-remove-md.svg" alt="">
                    </div>
                    <div class="seperator"></div>
                    <contact-details v-if="currentContact && contact.id===currentContact.id" :contact="currentContact"
                                     class="contact-details"></contact-details>
                </li>
            </ul>

        </div>
    </section>


</template>

<script>
    import contactDetails from './contact-details'

    export default {
        name: 'contact-list',
        data() {
            return {
                selectedContact: false,
                currentContact: null
            }
        },
        methods: {
            updateCurrentContact(id) {
                this.$store.commit({type: 'setSelectedContact', id: id});
                this.currentContact = this.$store.state.currentContact;
                this.selectedContact = !this.selectedContact;
            },
            closeDetails() {
                this.currentContact = ''
            }
        },
        created() {
            this.$store.dispatch({type: 'getContacts'})
        },


        computed: {
            contacts() {
                return this.$store.getters.contactsForDisplay;
            }
        },
        filters: {},

        components: {
            contactDetails
        }
    }
</script>

<style lang="scss" scoped>

    .contact-list {
        border-right: 1px solid #d0d4e4;
        width: 280px;
        height: 800px;
        background-color: #ffffff;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.09);
        .contact-list-content {
            margin-left: 20px;
            text-align: left;
            .seperator {
                border: solid 1px #e6e9f2;
                width: 280px;
                height: 2px;
                margin-left: - 20px;
            }
            .list-headline {
                margin: 20px 0 22px;
                width: 94px;
                height: 22px;
                font-size: 16px;
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #131b3c;

            }
            li {
                position: relative;
                .contact-details {
                    /*background-color: #0a0a0a;*/
                    position: relative;
                    margin-top: 5px;
                    margin-left: 43px;
                    /*clip-path: polygon(29% 0, 35% 8%, 100% 8%, 100% 70%, 74% 70%, 0% 70%, 0 8%, 23% 8%);*/
                    /*border: 2px solid black;*/

                }
            }

            .contact-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 280px;
                height: 66px;
                .half-box{
                    display: flex;
                }
                .contact-img {
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                    border-radius: 50%;

                }
                .contact-full-name {
                    height: 18px;
                    font-weight: normal;
                    font-style: normal;
                    font-stretch: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #131b3c;
                    margin-left: 12px;
                }
            }

        }

    }
</style>



