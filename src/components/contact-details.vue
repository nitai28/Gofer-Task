<template>
    <section class="contact-details">
        <div class="profile">
            <img class="profile-pic" :src="contact.photo" alt="">
            <h3>{{contact.accountName}}</h3>
        </div>
        <div class="line"></div>
        <div class="details">
            <h2></h2>
            <span>{{contact.firstName}} {{contact.lastName}}</span>
            <span>{{contact.emailAddress}}</span>
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
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .profile-pic{
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 40px ;
            }
        }

        .details {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

    }


</style>



