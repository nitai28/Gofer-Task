<template>
    <section class="Rectangle-2 ">
        <ul>
            <li v-for="i in 8">
                <img  :src="'img/nav/nav-'+i+ '.svg'" alt="">
            </li>
        </ul>

    </section>
</template>

<script>
    export default {
        name: "navbar",


    }
</script>

<style lang="scss" scoped>

    .Rectangle-2 {
        width: 70px;
        height: 800px;
        background-color: #454c68;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
        display: flex;
        ul {
            width: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            li {
                margin-bottom: 25px;
                &:first-child {
                    margin-top: 20px;
                }

            }
        }
    }


</style>