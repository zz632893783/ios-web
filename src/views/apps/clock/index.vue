<template>
    <div class="clock" v-bind:style="`opacity: ${ ready ? 1 : 0 }; transform: scale(${ ready ? 1 : 0 }); transform-origin: ${ centerLeft }px ${ centerTop }px;`">
        <span class="logo">
            <!-- <i :class="['msg-count']" v-if="appItem.msgCount">{{ appItem.msgCount }}</i> -->
            <!-- <i :class="['remove-btn', edit && 'enable']"></i> -->
            <i class="hour hand" v-bind:style="`transform: rotate(${ (hour % 12) / 12 * 360 + (minute / 60 * 30) - 90 }deg);`"></i>
            <i class="minute hand" v-bind:style="`transform: rotate(${ minute / 60 * 360 + (second / 60 * 6) - 90 }deg);`"></i>
            <i class="second hand" v-bind:style="`transform: rotate(${ second / 60 * 360 - 90 }deg);`"></i>
        </span>
        <h4 class="app-name">
            <span class="text">{{ name }}</span>
        </h4>
        <div class="app-content">
            <h4 class="exit-btn" v-on:click="exitApp">退出 APP</h4>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            ready: false,
            centerTop: 0,
            centerLeft: 0,
            name: '时钟',
            now: new Date(),
            timer: null,
            second: 0,
            minute: 0,
            hour: 0
        }
    },
    methods: {
        exitApp: function () {}
    },
    mounted: function () {
        this.timer = setInterval(() => {
            this.now = new Date()
            this.second = this.now.getSeconds()
            this.minute = this.now.getMinutes()
            this.hour = this.now.getHours()
        }, 1000)
    }
}
</script>
<style lang="stylus" scoped>
.clock {
    width: rem(1125);
    height: rem(2436);
    transform: scale(0);
    opacity: 0;
    background-color: white;
    transition: .25s linear;
    .logo {
        background-image: url('~@/assets/appClock.png');
        position: relative;
        .hand {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            &:after {
                content: ''
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
            }
            &.second {
                &:after {
                    width: rem(80);
                    height: rem(3);
                    background-color: red;
                    left: rem(-10);
                }
            }
            &.minute {
                &:after {
                    width: rem(50);
                    height: rem(5);
                    background-color: black;
                    left: rem(0);
                    border-radius: rem(3);
                }
            }
            &.hour {
                &:after {
                    width: rem(40);
                    height: rem(7);
                    background-color: black;
                    left: rem(0);
                    border-radius: rem(5)
                }
            }
        }
    }
}
</style>
