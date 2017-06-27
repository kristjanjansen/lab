<template>
    <div style="padding: 2rem">
        <number
            value="lab"
            :color="colors.green"
        ></number>
        <markdown :markdown="about"></markdown>

    </div>
</template>
<script>
    
    import Number from '../components/Number.vue'
    import Markdown from '../components/Markdown.vue'
    import colors from '../../lib/utils/colors'


    export default {
        components: { Number, Markdown },
        data: () => ({ colors, about: `

A Swiss Army Knife in data scientist toolbelt.

    npm i lab -g

# Principles

## One line installation

    * Current: a global NPM package
    * Next: compiling to binary, no NodeJS dependency
    * Next: apt-get / chocolatey packages

## Fits into existing workflows
    * Follow Unix philosophy: fit into chainable flow
    * Multi-use: run from CLI,local server,remote server,notebooks,via API

## Focus on Developer / Data Scientist experience 
    * Equal focus on CLI and GUI design
    * Seamless transitions between work environments (CLI/web/notebooks)
    * Autodetect everything
    * Minimum configutation

## Focus on natural language
    * Product as a noun/verb
    * Chat / voice user interfaces
    * Find right tone of voice/humor

## Focus on community
    * Find integration with similar tools like Dat
    * Join together communities: js <> python/r <> spark/hadoop

## Deploy anywhere

    npm install now -g
    now 
    lab server https://lab-21dae4.now.sh

        ` })
    }
</script>