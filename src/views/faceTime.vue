<template>
    <div class="face-time" v-bind:style="`opacity: ${ ready ? 1 : 0 }; transform: scale(${ ready ? 1 : 0 }); transform-origin: ${ centerLeft }px ${ centerTop }px;`">
        <!-- face-time -->
        <h4 class="exit-btn" v-on:click="exitApp">退出 APP</h4>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            ready: false,
            centerTop: 0,
            centerLeft: 0
        }
    },
    methods: {
        exitApp: function () {
            this.ready = false
            setTimeout(() => {
                this.$router.back()
            }, 250)
        }
    },
    mounted: function () {
        this.centerTop = this.$route.query.centerTop
        this.centerLeft = this.$route.query.centerLeft
        setTimeout(() => {
            this.ready = true
        }, 0)
    }
}
</script>
<style lang="stylus" scoped>
.face-time {
    width: rem(1125);
    height: rem(2436);
    transform: scale(0);
    opacity: 0;
    background-color: white;
    transition: .25s linear;
    .exit-btn {
        font-size: rem(140);
        display: inline-block;
        border: rem(2) solid red;
    }
}
</style>
