<template>
    
    <div class="Logs">
        <div
            v-for="log in logs"
            class="Logs__log"
            :style="{ color: color(log) }"
            @mouseover="onMouseover(log)"
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
        data: () => ({
            colors,
            currentTimestamp: false
        }),
        methods: {
            onMouseover(log) {
                this.currentTimestamp = log.timestamp
                this.$events.$emit('logitem', log)
            },
            color(log) {
                if (log.timestamp === this.currentTimestamp) {
                    return colors.white
                }
                if (log.format !== 'string') {
                    return colors.blue
                }
                return colors.gray
            }
        }
    }

</script>

<style>
    .Logs__log {
        margin-bottom: 0.1rem;
    }
</style>
