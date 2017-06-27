<template>
    <div>
        <runtitle v-if="id" :run-id="id"></runtitle>
        <highlight-code
            v-if="code"
            :lang="lang"
            :code="code"
        >
        </highlight-code>
    </div>
</template>

<script>

    import Runtitle from '../components/Runtitle.vue'

    export default {
        components: { Runtitle },
        data: () => ({ code: null, lang: null, id: null }),
        mounted() {
            this.$socket.on('start', payload => {
                this.id = payload.id
                this.code = payload.code
                this.lang = payload.lang
            })
        }
    }

</script>

<style>
    .hljs {
        font-family: Roboto Mono, monospace;
        padding: 1.5rem;
        line-height: 1.5rem;
    }
</style>