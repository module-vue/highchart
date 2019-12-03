<template>
    <div>
        <div class="footer">{{ footerName }}</div>
    </div>
</template>

<script>
import { footerName } from '../../../config/env';

export default {
    data () {
        return {
            footerName: footerName
        }
    }
}
</script>
