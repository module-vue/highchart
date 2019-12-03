<template>
    <div>
        <div class="header">{{ headerName }}  <router-link to="/home">home 连接</router-link>  <router-link to="/list">list 连接</router-link></div>
    </div>
</template>

<script>
import { headerName } from '../../../config/env';

export default {
    data () {
        return {
            headerName: headerName
        }
    }
}
</script>

<style lang="scss">
</style>
