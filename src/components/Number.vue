<template>
    
    <div class="Number" :style="{
        fontSize: '4rem',
        fontWeight: 100,
        letterSpacing: '-0.2rem',
        color: color,
        textShadow: '0 0 2px ' + color
    }">
        {{ splitted[0] }}<span v-if="splitted.length > 1">.</span><span :style="{opacity: 2 / index}" v-for="(r, index) in reminder">{{ r }}</span>
    </div>  

</template>

<script>

    export default {
        props: {
            label: { default: null },
            value: { default: null },
            color: { default: 'white' },
        },
        computed: {
            splitted() {
                return String(this.value).split('.')
            },
            reminder() {
                if (this.splitted.length > 1) {
                    return this.splitted[1].split('')
                }
                return []
            }
        },
        data: () => ({ }),
    }

</script>
