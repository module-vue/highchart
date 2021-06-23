<template>
    <div id="app">
        <v-header></v-header>
        <router-view :key="key"></router-view>
        <v-footer></v-footer>
    </div>
</template>

<script>
import header from './page/components/header/header';
import footer from './page/components/footer/footer';

export default {
    name: 'app',
    components: {
        'v-header': header,
        'v-footer': footer
    },
    data () {
        return {
            msg: ''
        }
    },
    computed:{
        key() {
            return this.$route.path + Math.random()
        }
    }
}
</script>

<style lang="scss">
</style>