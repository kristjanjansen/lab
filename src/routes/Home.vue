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
            
            {{ run.timestamp }}

            <graph
                v-if="run.logs.length > 1"
                style="margin-bottom: 20px"
                :logs="run.logs"
                :color="colors.blue">
            </graph>

            <logs :logs="run.logs"></logs>

        </div>

    </div>

</template>

<script>

    import Markdown from '../components/Markdown.vue'
    import Graph from '../components/Graph.vue'
    import Number from '../components/Number.vue'
    import Runtitle from '../components/Runtitle.vue'
    import Logs from '../components/Logs.vue'

    import colors from '../../lib/utils/colors'
    import readme from '../../README.md'

    export default {
        components: { Markdown, Graph, Number, Runtitle, Logs },
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
            this.$socket.on('run', run => this.runs.push(run))
            this.$socket.on('log', log => this.logs.push(log))
            // this.$events.$on('run', id => this.$socket.emit('run', id))
        }
    }

</script>