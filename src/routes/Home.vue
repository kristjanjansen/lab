<template>
    
    <div>
        
        <markdown v-if="!logs.length" :markdown="help"></markdown>
        
        <div v-for="id in scriptIds" style="margin-bottom: 25px">
            
            <runtitle :run-id="id"></runtitle>
            
            <number
                v-if="filteredLogs(id).filter(l => l.format === 'number').length === 1"
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
            help: readme.split('---')[1]
        }),
        methods: {
            filteredLogs(id) {
                return this.logs
                    .filter(log => log.id === id)
                    .slice(-5)
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