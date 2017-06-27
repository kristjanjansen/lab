<template>
    
    <div class="Runtitle">
        <span
            @mouseover="hovered = !hovered" 
            @mouseout="hovered = !hovered"
            v-clipboard:copy="copy"
            v-clipboard:success="copied"
        >
            <span :style="{color: colors.green}">lab</span> 
            <span :style="{color: colors.white}">{{ run.id }}</span>
            <span
                v-for="(parameter, key) in run.parameters"
                :style="{ color: colors.yellow }"
            >
                --{{ key }}={{ parameter }}
            </span>
        </span>
        <span v-show="hovered" :style="{color: colors.darkgray}">{{ help }}</span>
        <!--span
            :style="{color: colors.gray, cursor: 'pointer'}"
            @click="$events.$emit('run', id)"
        >▸</span-->
    </div>

</template>

<script>

    import VueClipboard from 'vue-clipboard2'

    import colors from '../../lib/utils/colors'

    export default {
        props: {
            run: { default: null },
        },
        data: () => ({
            colors,
            hovered: false,
            help: 'Copy',
            parameters: {
                key: 123,
                key2: 123
            }
        }),
        computed: {
            copy() {
                return 'lab ' + this.run.runId
            }
        },
        methods: {
            copied() {
                this.help = 'Copied'
                setTimeout(() => {
                    this.help = ''
                    setTimeout(() => this.help = 'Copy', 5000)
                }, 2000)
            }
        }
    }

</script>

<style>
    .Runtitle {
        margin-bottom: 1rem;
        cursor: pointer;
    }
</style>
