<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
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
        color: white;
    }
</style>