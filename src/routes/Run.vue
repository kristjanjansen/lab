<template>
    <div>
        <runtitle :run-id="$route.params.id"></runtitle>
    </div>
</template>

<script>

    import Runtitle from '../components/Runtitle.vue'

    export default {
        components: { Runtitle }
    }

</script>