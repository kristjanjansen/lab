<template>
    
    <div>
        
        <markdown v-if="!runsWithLogs.length" :markdown="help"></markdown>
        
        <div v-for="run in runsWithLogs" style="margin-bottom: 25px">
            
            <runtitle :run="run"></runtitle>
            
            <!--number
                v-if="run.logs.filter(l => l.format === 'number').length === 1"
                :value="run.logs.filter(l => l.format === 'number')[0].data.metric"
                :color="colors.blue"
            >
            </number-->
            
            <graph
                v-if="run.logs.length > 1"
                style="margin-bottom: 20px"
                :logs="run.logs"
                :color="colors.blue">
            </graph>

            <div
                v-for="log in run.logs"
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

    import Markdown from '../components/Markdown.vue'
    import Graph from '../components/Graph.vue'
    import Number from '../components/Number.vue'
    import Runtitle from '../components/Runtitle.vue'

    import colors from '../../lib/utils/colors'
    import readme from '../../README.md'

    export default {
        components: { Markdown, Graph, Number, Runtitle },
        data: () => ({
            logs: [],
            activeId: null,
            colors,
            help: readme.split('---')[1],
            runs: []
        }),
        computed: {
            runsWithLogs() {
                return this.runs.map(run => {
                    run.logs = this.logs
                        .filter(log => log.id === run.id)
                        .slice(-5)
                    return run
                })
            }
        },
        mounted() {
            this.$socket.on('start', run => this.runs.push(run))
            this.$socket.on('log', payload => this.logs.push(payload))
            this.$events.$on('run', id => this.$socket.emit('run', id))
        }
    }

</script>