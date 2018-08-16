<template>
    <section class="contact-details">
        <div class="profile">
            <img class="profile-pic" :src="contact.photo" alt="">
            <h3>{{contact.accountName}}</h3>
        </div>
        <!--<div class="line"></div>-->
        <div class="details">
            <h2></h2>
            <span class="full-name">{{contact.firstName}} {{contact.lastName}}</span>
            <span>{{contact.emailAddress}}</span>
            <span>{{contact.birthDay}}</span>
            <span>{{contact.phoneNumber}}</span>
        </div>

    </section>


</template>

<script>

    export default {
        name: "contact-details",
        props: {contact: {type: Object, required: true}},
        filters: {},

    }
</script>

<style lang="scss" scoped>
    .contact-details {
        display: flex;
        align-content: space-around;
        width: 282px;
        height: 150px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        border: solid 1px #e6e9f2;

        .line {
            width: 2px;
            height: 100%;
            border: solid 1px #e6e9f2;
            margin: 0 20px 0;

        }
        .profile {
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            border-right: solid 1px #e6e9f2;
            h3 {
                color: #131b3c;
                font-weight: bold;

            }

            .profile-pic {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 40px;
            }
        }

        .details {
            color: #a5a8b5;
            width: 100%;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin: 0 20px 5px;
            .full-name {
                font-weight: bold;
                color: #131b3c;
            }
        }

    }


</style>



