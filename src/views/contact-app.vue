<template>
    <section class="contact-app">
        <nav-bar></nav-bar>
        <contact-list></contact-list>
        <contact-add></contact-add>
        <contact-exhibition></contact-exhibition>

    </section>
</template>

<script>
    import navBar from '../components/nav/nav';
    import contactList from '../components/contact-list';
    import contactAdd from '../components/contact-add';
    import contactExhibition from '../components/contact-exhibition';

    export default {
        name: "contact-app",
        methods: {},
        components: {
            navBar,
            contactList,
            contactAdd,
            contactExhibition,

        }

    }
</script>

<style lang="scss" scoped>
    .contact-app{
        display: flex;
    }

</style>
