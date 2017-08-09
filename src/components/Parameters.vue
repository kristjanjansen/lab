<template>
    
    <div class="Parameters">
        <div
            class="Parameters__parameter"
            v-for="(parameter, key) in parameters"
            :style="{ color: colors.yellow }"
        >
            --{{ key }}=<span contenteditable style="outline:none">{{ parameter }}</span>
        </div>
    </div>  

</template>

<script>

    import colors from '../../lib/utils/colors'

    export default {
        props: { parameters: {}},
        data: () => ({ colors }),
        computed: {}
    }

</script>

<style>
    
    .Parameters {
        display: flex;
    }

    .Parameters__parameter {
        margin-right: 1rem;
    }


