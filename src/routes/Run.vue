<template>
    <div class="Run">
        
        <runtitle v-if="run" :run="run"></runtitle>
        
        <div class="Run__content">
            
            <parameters class="Run__parameters"></parameters>

            <highlight-code
                class="Run__code"
                v-if="code"
                :lang="lang"
                :code="code"
            >
            </highlight-code>

        </div>

    </div>

</template>

<script>

    import Runtitle from '../components/Runtitle.vue'
    import Parameters from '../components/Parameters.vue'

    export default {
        components: { Runtitle, Parameters },
        data: () => ({ run: null }),
        mounted() {
            this.$socket.on('start', run => this.run = run)
        }
    }

</script>

<style>
    
    .Run__content {
        display: flex;
    }

    .Run__parameters {
        width: 25%;
    }

    .Run__code {
        width: 75%;
    }

    .hljs {
        font-family: Roboto Mono, monospace;
        padding: 1.5rem;
        line-height: 1.5rem;
    }

</style>