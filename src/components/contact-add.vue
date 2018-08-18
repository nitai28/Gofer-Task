<template>
    <section class="contact-add">
        <userMsg></userMsg>
        <div class="contact-add-container">
            <img class="app-logo" src="/img/gofer-logo.png" alt="logo">

            <h2>User details</h2>
            <form @submit.prevent="validateBeforeSubmit">
                <div class="user-details">
                    <div class="two-input">
                        <div class="input-box">
                            <input type="text" name="First Name" placeholder="First Name"
                                   v-model="contactToAdd.firstName"
                                   v-validate="'required'">
                            <p class="error-message">{{ errors.first('First Name') }}</p>

                        </div>

                        <div class="input-box">
                            <input type="text" name="Last Name" placeholder="Last Name" v-model="contactToAdd.lastName"
                                   v-validate="'required'">
                            <p class="error-message">{{ errors.first('Last Name') }}</p>
                        </div>

                    </div>
                    <div class="two-input">
                        <div class="input-box">

                            <input type="date" name="Birth Date" placeholder="Birth Date"
                                   v-model="contactToAdd.birthDay"
                                   v-validate="'required'">
                            <p class="error-message">{{ errors.first('Birth Date') }}</p>

                        </div>

                        <input type="text" placeholder="Phone Number" v-model="contactToAdd.phoneNumber">
                    </div>

                    <div class="input-box email">
                        <input type="text" name="email" placeholder="Email Address" v-model="contactToAdd.emailAddress"
                               v-validate="'required|email'">
                        <p class="error-message">{{ errors.first('email') }}</p>

                    </div>

                </div>
                <h2>Account details</h2>
                <div class="account-details">
                    <div class="account-details-content">

                        <div class="input-box">
                            <input type="text" name="User Name" placeholder="User Name"
                                   v-model="contactToAdd.accountName"
                                   v-validate="'required'">
                            <p class="error-message">{{ errors.first('User Name') }}</p>

                        </div>
                        <div class="input-box">
                            <input type="password" name="Password" placeholder="Password"
                                   v-model="contactToAdd.password"
                                   v-validate="'required|confirmed:pw_confirm'">
                            <p class="error-message">{{ errors.first('Password') }}</p>

                        </div>
                        <div class="input-box">
                            <input type="password" name="pw_confirm"
                                   ref="pw_confirm" placeholder="Repeat Password"
                                   v-model="passwordToConfirm"
                                   v-validate="'required'">
                            <p class="error-message">{{ errors.first('pw_confirm') }}</p>

                        </div>

                    </div>
                    <div class="pic-container">
                        <input style="display:none" ref="fileInput" type="file" @change=upload($event.target.files)
                               accept="image/*">
                        <div class="add-pic">
                            <img v-if="!selectedFile" @click="$refs.fileInput.click()" src="/img/add.svg" alt="plus">
                            <span v-if="!selectedFile">Add photo</span>
                        </div>
                        <img v-if="!selectedFile" class="avatar-pic" src="/img/contacts/avatar.png" alt="">
                        <img v-else class="pic-preview" :src="selectedFile" alt="">
                    </div>
                </div>
                <div class="button-details">
                    <input @click="clearInput" type="button" class="red button" value="Clear">
                    <input type="submit" class="blue button" value="Add">

                </div>
            </form>

        </div>


    </section>
</template>

<script>
    import {Validator} from 'vee-validate';
    import contactService from '../services/contact.service.js'
    import EventBusService, {SHOW_MSG} from '../services/EventBusService.js'

    import axios from 'axios';
    import  userMsg from './user-msg'

    export default {
        name: "contact-add",
        data() {
            return {
                contactToAdd: contactService.getEmptyObj(),
                passwordToConfirm: '',
                selectedFile: null,
                cloudinary: {
                    uploadPreset: 'rineqrjw',
                    apiKey: '911599245781842',
                    cloudName: 'nitai'
                },
                thumb: {
                    url: ''
                },
                thumbs: [],
            }
        },

        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    var that = this;
                    if (result) {
                        this.contactToAdd.photo = this.selectedFile;
                        this.$store.dispatch({type: 'saveContact', contact: this.contactToAdd})
                            .then(() => {
                                this.contactToAdd = contactService.getEmptyObj();
                                EventBusService.$emit(SHOW_MSG, 'add')
                                this.passwordToConfirm = '';
                                this.errors.clear();
                            })
                        return;
                    }
                    else setTimeout(() => {
                        that.errors.clear();
                    }, 6000);
                })
            },
            clearInput() {
                this.contactToAdd = contactService.getEmptyObj();
                this.passwordToConfirm = '';

            },
            upload: function (file) {
                const formData = new FormData()
                formData.append('file', file[0]);
                formData.append('upload_preset', this.cloudinary.uploadPreset);
                formData.append('tags', 'gs-vue,gs-vue-uploaded');
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                axios.post(this.clUrl, formData).then(res => {
                    this.selectedFile = res.data.url
                    console.log(this.selectedFile)
                    this.thumbs.unshift({
                        url: res.data.secure_url
                    })
                })
            }
        },
        computed: {
            clUrl: function () {
                return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
            },
        },

        components: {
            Validator,
            contactService,
            EventBusService,
            userMsg,
        }
    }
</script>


<style lang="scss" scoped>
    .contact-add {
        position: relative;
        background-color: #f5f7fa;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        text-align: center;
        .input-box {
            position: relative;
            p {
                position: absolute;
                top: 35px;
                left: 5px;
                font-size: 9px;
                color: red;
            }
        }
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
                .email {
                    width: 100%;
                    input {
                        width: 100%;
                        margin-right: 0;
                    }
                }
                .two-input {
                    width: 100%;
                    display: flex;
                }

            }
            .account-details {
                display: flex;
                width: 100%;
                justify-content: left;
                margin-bottom: 40px;
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
                    &:last-child {
                        margin-bottom: 0;
                    }
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
                    .pic-preview {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        object-fit: cover;
                    }
                    .add-pic {
                        color: #9ba0b2;
                        font-size: 12px;
                        margin-top: 17px;
                        img {
                            margin-right: 6px;
                        }
                    }
                }

            }
            .button-details {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 98px;
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