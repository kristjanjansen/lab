<template>
    
    <div class="Logs">
        <div
            v-for="log in logs"
            class="Logs__log"
            :style="{
                color: log.format !== 'string' ? colors.blue : 'gray',
            }"
        >
            {{ log.raw }}
        </div>
    </div>  

</template>

<script>

    import colors from '../../lib/utils/colors'

    export default {
        props: {
            logs: { default: [] }
        },
        data: () => ({ colors })
    }

</script>

<style>
    .Logs__log {
        margin-bottom: 0.1rem;
    }
</style>
