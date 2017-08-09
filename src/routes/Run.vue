<template>
    <div class="Run">

        <div class="Run__header">

            <router-link to="/">›</router-link> <runtitle :run="run"></runtitle>
        
        </div>

        <div class="Run__content">

            <highlight-code
                class="Run__code"
                v-if="run.code"
                :lang="run.lang"
                :code="run.code"
            >
            </highlight-code>

        </div>

    </div>

</template>

<script>

    import Runtitle from '../components/Runtitle.vue'

    export default {
        components: { Runtitle },
        props: ['id'],
        data: () => ({ run: {} }),
        mounted() {
            this.$socket.on('run', run => this.run = run)
        }
    }

</script>

<style>
    
    .Run__header {
        display: flex;
    }

    .Run__header > * {
        margin-right: 0.5rem;
    }

    .Run__content {
        display: flex;
    }

    .Run__parameters {
        width: 30%;
    }

    .Run__code {
        width: 70%;
    }

    .hljs {
        font-family: Roboto Mono, monospace;
        padding: 1.5rem;
        line-height: 1.5rem;
    }

</style>