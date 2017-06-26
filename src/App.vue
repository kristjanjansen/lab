<template>

    <div id="app">
        
        <help v-if="!logs.length"></help>
        
        <div v-for="id in scriptIds" style="margin-bottom: 25px">
            <div style="margin-bottom: 20px">
                <span :style="{color: colors.green}">lab</span> 
                <span :style="{color: colors.cyan}">{{ id }}</span> 
                <!--span
                    :style="{color: colors.gray, cursor: 'pointer'}"
                    @click="$events.$emit('run', id)"
                >▸</span-->
            </div>

            <number
                v-if="filteredLogs(id).filter(l => l.format === 'number').length === 1"
                label="Hmm"
                :value="filteredLogs(id).filter(l => l.format === 'number')[0].data.metric"
                :color="colors.blue"
            >
            </number>

            <graph
                v-if="filteredLogs(id).length > 1"
                style="margin-bottom: 20px"
                :logs="filteredLogs(id)"
                :color="colors.blue">
            </graph>

            <div
                v-for="log in filteredLogs(id)"
                :style="{
                    color: log.format !== 'string' ? colors.blue : 'gray',
                    marginBottom: '3px'
                }"
            >
                {{ log.raw }}
            </div>
        </div>

    </div>

</template>

<script>

    import uniq from 'lodash/uniq'
    import takeRight from 'lodash/takeright'

    import Help from './components/Help.vue'
    import Graph from './components/Graph.vue'
    import Number from './components/Number.vue'

    export default {
        name: 'App',
        components: { Help, Graph, Number },
        data: () => ({
            logs: [],
            activeId: null,
            colors: {
                red: 'rgb(204,0,0)',
                green: 'rgb(58,187,49)',
                yellow: 'rgb(204,102,0)',
                blue: 'rgb(83,58,221)',
                magenta: 'rgb(204,0,)',
                cyan: 'rgb(51,174,193)',
                gray: 'rgba(255,255,255,0.5)'
            }
        }),
        methods: {
            filteredLogs(id) {
                return this.logs.filter(log => log.id === id)
            }
        },
        computed: {
            scriptIds() {
                return uniq(this.logs.map(l => l.id))
            }
        },
        mounted() {
            this.$socket.on('log', payload => {
                this.logs.push(payload)
            })
            this.$events.$on('run', id => this.$socket.emit('run', id))
        }
    }

</script>

<style>

    body {
        font-family: Roboto Mono, monospace;
        background: #222;
        margin: 0;
        padding: 2rem;
        font-size: 0.9rem;
    }

</style>
