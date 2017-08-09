<template>
    
    <div class="Runtitle">
        
        <div class="Runtitle__left">

        <router-link v-if="link" :to="link">
            <span :style="{color: colors.green}">lab</span> 
            <span :style="{color: colors.white}">{{ run.id }}</span>
        </router-link>
        <span v-else>
            <span :style="{color: colors.green}">lab</span> 
            <span :style="{color: colors.white}">{{ run.id }}</span>
        </span>
        <parameters :parameters="run.parameters"></parameters>
        
        </div>

        <div class="Runtitle__right">

        <span
            @mouseover="hovered = !hovered" 
            @mouseout="hovered = !hovered"
            v-clipboard:copy="copy"
            v-clipboard:success="copied"
            :style="{color: colors.gray }"
        >{{ help }}
        </span>

        <span
            :style="{color: colors.gray, cursor: 'pointer'}"
            @click="$socket.emit('runWeb', run.id)"
        >Run
        </span>

        </div>
    </div>

</template>

<script>

    import VueClipboard from 'vue-clipboard2'
    import Parameters from './Parameters.vue'

    import colors from '../../lib/utils/colors'

    export default {
        components: { Parameters },
        props: {
            run: { default: null },
            link: { default: null }
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
                return 'lab ' + this.run.id
            }
        },
        methods: {
            copied() {
                this.help = 'Copied'
                setTimeout(() => {
                    this.help = ''
                    setTimeout(() => this.help = 'Copy', 1000)
                }, 2000)
            }
        }
    }

</script>

<style>
    .Runtitle {
        margin-bottom: 1rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .Runtitle__left, .Runtitle__right > * {
        margin-right: 0.25rem;
    }
</style>
