<template>
    <div class="Markdown" v-html="html"></div>
</template>

<script>
    
    import { toHtml } from '../../lib/utils/formatMarkdown'

    export default {
        props: {
            markdown: { default: '' }
        },
        computed: {
            html() {
                return toHtml(this.markdown)
            }
        }
    }

</script>

<style>
    .Markdown {
        color: white;
    }
    .Markdown h1 {
        margin-top: 3rem;
        font-size: inherit;
        text-transform: uppercase;
    }

    .Markdown h2 {
        margin-top: 1rem;
        font-size: inherit;
    }
    
    .Markdown h4 {
        font-weight: normal;
    }
    .Markdown pre {
        margin-left: 2rem;
        color: #777;
        font-family: Roboto Mono, monospace;
    }
    .Markdown .lab {
        color: lime;
    }
    .Markdown .id {
        color: cyan;
    }
</style>