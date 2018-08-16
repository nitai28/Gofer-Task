<template>
    <section class="contact-add">
        <div class="contact-add-container">
            <img class="app-logo" src="/img/gofer-logo.png" alt="logo">

            <h2>User details</h2>
            <form @submit.prevent="validateBeforeSubmit">

                <div class="user-details">
                    <input type="text" name="first name" placeholder="First Name" v-model="contactToAdd.firstName" v-validate="'required'">
                    <!--<p class="error-message">{{ errors.first('first name') }}</p>-->

                    <input type="text" placeholder="Last Name" v-model="contactToAdd.lastName" v-validate.immediate="'required'">
                    <input type="date" placeholder="Birth Date" v-model="contactToAdd.birthDay">
                    <input type="text" placeholder="Phone Number" v-model="contactToAdd.phoneNumber">
                    <input type="email" placeholder="Email Address" v-model="contactToAdd.emailAddress" v-validate.immediate="'required'">
                </div>
                <h2>Account details</h2>
                <div class="account-details">
                    <div class="account-details-content">
                        <input type="text" placeholder="User Name" v-model="contactToAdd.accountName" v-validate.immediate="'required'">
                        <input type="password" placeholder="Password" v-model="contactToAdd.password" v-validate.immediate="'required'">
                        <input type="password" placeholder="Repeat Password" v-model="passwordToConfirm" v-validate.immediate="'required'" >
                    </div>
                    <div class="pic-container">
                        <img src="/img/add.svg" alt="plus">
                        <span>Add photo</span>
                        <img class="avatar-pic" src="/img/contacts/avatar.png" alt="">

                    </div>
                </div>
                <div class="button-details">
                    <input @click="clearInput" type="button"  class="red button" value="Clear" >
                    <input  type="submit" class="blue button" value="Add">

                </div>
            </form>

        </div>


    </section>
</template>

<script>
    import {Validator} from 'vee-validate';
    import contactService from '../services/contact.service.js'

    export default {
        name: "contact-add",
        data() {
            return {
                contactToAdd: contactService.getEmptyObj(),
                passwordToConfirm:''
            }
        },

        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.dispatch({type: 'saveContact', contact: this.contactToAdd})
                            .then(() => {
                                this.contactToAdd=contactService.getEmptyObj();
                            })
                        return;
                    }

                })
            },
            clearInput(){
                this.contactToAdd=contactService.getEmptyObj();

            }
        },

        components: {
            Validator,
            contactService
        }
    }
</script>


<style lang="scss" scoped>
    .contact-add {
        background-color: #f5f7fa;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        text-align: center;
        .contact-add-container {
            width: 520px;
            margin-top: 98px;
            h2 {
                height: 22px;
                font-family: OpenSans;
                font-size: 16px;
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #131b3c;
                margin-bottom: 20px;
            }
            .app-logo {
                margin-bottom: 74px;
            }
            .user-details {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                margin: 0;
                input {
                    margin-bottom: 20px;
                    height: 34px;
                    padding: 5px;
                    border-radius: 5px;
                    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                    background-color: #ffffff;
                    border: solid 1px #e6e9f2;
                    &:not(:last-child) {
                        width: 250px;
                    }
                    &:last-child {
                        width: 100%;
                    }
                    &:nth-child(odd):not(:last-child) {
                        margin-right: 20px;
                    }

                }

            }
            .account-details {
                display: flex;
                width: 100%;
                justify-content: left;
                .account-details-content {
                    display: flex;
                    flex-direction: column;

                }
                input {
                    width: 358px;
                    height: 34px;
                    border-radius: 5px;
                    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                    background-color: #ffffff;
                    border: solid 1px #e6e9f2;
                    margin-right: 20px;
                    margin-bottom: 19px;
                    padding: 5px;
                }
                .pic-container {
                    position: relative;
                    width: 142px;
                    height: 142px;
                    border-radius: 5px;
                    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                    background-color: #ffffff;
                    border: solid 1px #e6e9f2;
                    .avatar-pic {
                        position: absolute;
                        width: 100px;
                        z-index: 1;
                        bottom: -1px;
                        left: 19px;
                    }
                }

            }
            .button-details {
                display: flex;
                justify-content: flex-end;
                .button {
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 13px;
                    height: 30px;
                    width: 94px;
                    border-radius: 4px;

                }
                .blue {
                    background-color: #5891e2;

                }
                .red {
                    margin-right: 20px;
                    background-color: #ff5575;

                }

            }

        }
    }

</style>