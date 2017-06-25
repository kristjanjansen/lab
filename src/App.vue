<template>

    <div id="app">
        
        <div v-if="!logs.length">
            <div style="color: #555;">
                Run an script in the command line
            </div>
            <div style="margin: 20px 0 0 20px;">
                <span style="color: #00cc00;">lab</span>
                scriptfile
            </div>
        </div>
        
        <div v-for="id in scriptIds" style="margin-bottom: 25px">
            <div style="margin-bottom: 20px">
                <span :style="{color: colors.green}">lab</span> 
                <span :style="{color: colors.cyan}">{{ id }}</span>
            </div>
            <graph style="margin-bottom: 20px" :logs="filteredLogs(id)" :color="colors.blue"></graph>
            <div
                v-for="log in filteredLogs(id).slice(-5)"
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

    import Graph from './components/Graph.vue'

    export default {
        name: 'App',
        components: { Graph },
        data: () => ({
            logs: [],
            activeId: null,
            colors: {
                red: 'rgb(204,0,0)',
                green: 'rgb(58,187,49)',
                yellow: 'rgb(204,102,0)',
                blue: 'rgb(83,58,221)',
                magenta: 'rgb(204,0,)',
                cyan: 'rgb(51,174,193)'
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
        }
    }

</script>

<style>

    body {
        font-family: monospace;
        color: #777;
        background: #222;
        margin: 0;
        padding: 2rem;
    }

</style>
