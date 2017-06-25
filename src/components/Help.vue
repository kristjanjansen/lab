<template>
    <div class="Help" v-html="html"></div>
</template>

<script>
    
    import marked from 'marked'
    import { toHtml } from '../../lib/utils/formatMarkdown'

    import readme from '../../README.md'

    export default {
        data: () => ({}),
        computed: {
            html() {
                return toHtml(readme.split('---')[1])
            }
        }
    }

</script>

<style>
    .Help {
        color: white;
    }
    .Help h4 {
        font-weight: normal;
    }
    .Help pre {
        margin-left: 2rem;
        color: #777;
    }
    .Help .lab {
        color: lime;
    }
    .Help .id {
        color: cyan;
    }
</style>