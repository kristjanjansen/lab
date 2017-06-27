<template>
    
    <div class="Parameters">
        <div
            v-for="(parameter, key) in parameters"
            :style="{ color: colors.yellow }"
        >
            --{{ key }}={{ parameter }}
        </div>
    </div>  

</template>

<script>

    import colors from '../../lib/utils/colors'

    export default {
        props: {},
        data: () => ({
            colors,
            parameters: {
                key: 123,
                key2: 123
            }
        }),
        computed: {}
    }

</script>
