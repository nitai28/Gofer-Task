<template>
    <section class="contact-list">
        <div class="contact-list-content">
            <div class="contact-box">
                <h2 class="list-headline">Gofer Users</h2>

            </div>
            <div class="seperator"></div>
            <ul>

                <li v-for="contact in contacts" :style="{position:posdefine}" :key="contact.id"
                    @mouseover="updateCurrentContact(contact.id)"
                    @mouseleave="closeDetails">
                    <div class="contact-box">
                        <div class="half-box">
                            <img v-if="contact.photo" class="contact-img" :src="contact.photo" alt="">
                            <avatar v-else class="avatar-img" :fullname="contact.firstName +' '+ contact.lastName" :size="30"></avatar>
                            <h2 class="contact-full-name">{{contact.firstName|NameToUpperCase}} {{contact.lastName|NameToUpperCase}}</h2>
                            <img class="x" v-if="currentContact&& contact.id===currentContact.id"
                                 @click.stop="removeContact(contact.id)"
                                 src="/img/contact-list/close-remove-md.svg" alt="">

                        </div>
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
    import Avatar from 'vue-avatar-component'

    export default {
        name: 'contact-list',
        data() {
            return {
                currentContact: null,
                posdefine: 'static'
            }
        },
        methods: {
            updateCurrentContact(id) {
                this.$store.commit({type: 'setSelectedContact', id: id});
                this.currentContact = this.$store.state.currentContact;
                this.posdefine = 'relative';
            },
            closeDetails() {
                this.currentContact = ''
                this.posdefine = 'static';
            },
            removeContact(id) {
                this.$store.dispatch({type: 'deletedContact', id: id});
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
        filters: {
            NameToUpperCase(name) {
                return name.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            },
        },
        components: {
            contactDetails,
            Avatar
        }
    }
</script>

<style lang="scss" scoped>

    .contact-list {
        border-right: 1px solid #d0d4e4;
        width: 280px;
        background-color: #ffffff;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.09);
        .contact-list-content {
            text-align: left;
            .seperator {
                border: solid 1px #e6e9f2;
                width: 280px;
                height: 2px;
            }
            .list-headline {
                margin: 20px 0 22px 20px;
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

                font-size: 13px;
                color: #131b3c;
                .x {
                    position: absolute;
                    top: 28px;
                    right: 18px;
                    cursor: pointer;
                }
                &:hover {
                    background-color: #f5f7fa;

                }

                .contact-details {
                    position: absolute;
                    margin-top: 5px;
                    margin-left: 43px;
                    top: 61px;
                    z-index: 1;
                    width: 282px;
                    height: 130px;
                    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                    background-color: #ffffff;
                    font-size: 12px;

                    &:after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 20%;
                        width: 0;
                        height: 0;
                        border: 0.563em solid transparent;
                        border-bottom-color: #e6e9f2;
                        border-top: 0;
                        margin-left: -0.562em;
                        margin-top: -0.562em;
                    }

                }
            }

            .contact-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 280px;
                height: 66px;
                .half-box {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                }
                .contact-img {
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                    border-radius: 50%;

                }
                .avatar-img{
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }
                .contact-full-name {
                    height: 18px;
                    color: #131b3c;
                    margin-left: 12px;
                }
            }

        }

    }
</style>



