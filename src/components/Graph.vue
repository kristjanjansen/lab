<template>
    
    <svg v-show="values.length" :width="width" :height="height">
        <filter id="blur">
            <feGaussianBlur in="SourceGraphic" :std-deviation.camel="2" />
        </filter>
        <path
            fill="none"
            stroke-width="1"
            :stroke="color"
            :d="line(values)"
            filter="url(#blur)"
        ></path>
        <path
            fill="none"
            stroke-width="1"
            :stroke="color"
            :d="line(values)"
        ></path>
        <!--rect
            v-for="value in values"
            :x="xScale(value.x - 0.5)"
            y="0"
            :width="xScale(1)"
            :height="height"
            fill="rgba(255,255,255,0.5)"
            stroke="red"
        ></rect-->
    </svg>    

</template>

<script>

    import { scaleLinear } from 'd3-scale'
    import { extent } from 'd3-array'
    import { line, curveBundle } from 'd3-shape'

    export default {
        props: {
            logs: { default: () => []},
            width: { default: 400 },
            height: { default: 50 },
            color: { default: 'white' }
        },
        
        data: () => ({ padding: 0 }),
        computed: {
            values() {
                return this.logs.map((log, index) => {
                    return {
                        x: index,
                        y: log.data.metric ? log.data.metric : false
                    }
                })
                .filter(value => value.y !== false)
            },
            paddedHeight() { return this.height - (2 * this.padding) },
            paddedWidth() { return this.width - (2 * this.padding) },
        },

        methods: {
            xScale(value) {
                return scaleLinear()
                    .domain(extent(this.values, d => d.x))
                    .rangeRound([this.padding, this.paddedWidth])
                    (value)
            },
            yScale(value) {
                return scaleLinear()
                    .domain(extent(this.values, d => d.y))
                    .rangeRound([this.paddedHeight, this.padding])
                    (value)
            },
            line(data) {
                return line()
                    //.curve(curveBundle.beta(1))
                    .x(d => this.xScale(d.x))
                    .y(d => this.yScale(d.y))
                    (data)
            },
        },

    }

</script>