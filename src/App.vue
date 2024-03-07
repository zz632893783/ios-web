<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    data: function () {
        return {}
    },
    methods: {
        setRem: function () {
            document.documentElement.style.fontSize = `${window.innerWidth / 20 / window.devicePixelRatio}px`
            // document.documentElement.style.fontSize = `${window.innerWidth / 20 / window.devicePixelRatio / 1.5}px`
            // document.documentElement.style.fontSize = `${7}px`
        }
    },
    mounted: function () {
        this.setRem()
    }
}
</script>
<style lang="stylus">
html, body {
    width: 100%;
    height: 100%;
}
#app {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
