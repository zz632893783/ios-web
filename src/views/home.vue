<template>
    <div class="home">
        <div class="header-bar">
            <div class="left">
                <span class="time">2:10</span>
            </div>
            <div class="right">
                <span class="signal"><i></i><i></i><i></i><i></i></span>
                <span class="wifi"><i></i><i></i><i></i></span>
                <span class="battery"><i></i></span>
            </div>
        </div>
        <div class="app-tab" v-if="ready" ref="appTab">
            <div class="tab-container" ref="tabContainer" v-on:touchstart.stop="dragPageTouchStart($event)" v-on:touchmove.stop="dragPageTouchMove($event)" v-on:touchend="dragPageTouchEnd($event)">
                <div class="app-page" v-for="pageItem in appTab" v-bind:key="pageItem.renderKey">
                    <div :class="['app-item', edit && 'shake', appItem === activeApp && 'active']" v-for="appItem in pageItem.apps" v-bind:key="appItem.renderKey" v-bind:style="computeAppStyle(appItem)" v-on:touchstart.stop="touchstartFunc($event, pageItem, appItem)" v-on:touchend.stop="touchendFunc($event, pageItem, appItem)" v-on:touchmove.stop="touchmoveFunc($event)">
                        <!-- <template v-if="appItem.app">
                            <clock></clock>
                        </template>
                        <template v-else> -->
                        <span class="logo" v-bind:style="`background-image: url(${ appItem.logo });`">
                            <i :class="['msg-count']" v-if="appItem.msgCount">{{ appItem.msgCount }}</i>
                            <i :class="['remove-btn', edit && 'enable']"></i>
                        </span>
                        <h4 class="app-name">
                            <span class="text">{{ appItem.name }}</span>
                        </h4>
                        <!-- </template> -->
                    </div>
                </div>
            </div>
            <div class="pagination">
                <i v-for="(pageItem, pageIndex) in appTab" v-bind:key="pageIndex" v-bind:class="[pageItem === activePage ? 'active' : '']" v-on:click="changePage(pageItem, pageIndex)"></i>
            </div>
        </div>
        <div class="footer-bar">
            <div class="container">
                <div :class="['app-item', edit && 'shake']" v-for="appItem in footerApp" v-bind:key="appItem.renderKey" v-bind:style="computeFooterAppStyle(appItem)" v-on:touchstart.stop="touchstartFunc($event, pageItem, appItem)" v-on:touchend.stop="touchendFunc($event)">
                    <span class="logo" v-bind:style="`background-image: url(${ appItem.logo });`">
                        <i :class="['msg-count']" v-if="appItem.msgCount">{{ appItem.msgCount }}</i>
                    </span>
                </div>
            </div>
        </div>
        <div class="app-router-view" ref="appRouterView" v-bind:style="`opacity: ${ $route.path === '/' ? 0 : 1 }; pointer-events: ${ $route.path === '/' ? 'none' : 'auto' };`">
            <router-view />
        </div>
    </div>
</template>
<script>
import faceTime from '@/assets/faceTime.png'
import rl from '@/assets/rl.png'
import zp from '@/assets/zp.png'
import xj from '@/assets/xj.png'
import yj from '@/assets/yj.png'
import sz from '@/assets/sz.png'
import dt from '@/assets/dt.png'
import tq from '@/assets/tq.png'
import txsx from '@/assets/txsx.png'
import bwl from '@/assets/bwl.png'
import gs from '@/assets/gs.png'
import ts from '@/assets/ts.png'
import appStore from '@/assets/appStore.png'
import bk from '@/assets/bk.png'
import sp from '@/assets/sp.png'
import jk from '@/assets/jk.png'
// import jt from '@/assets/jt.png'
import qb from '@/assets/qb.png'
import setting from '@/assets/setting.png'
import dh from '@/assets/dh.png'
import llq from '@/assets/llq.png'
import dx from '@/assets/dx.png'
import yy from '@/assets/yy.png'
import aqy from '@/assets/aqy.png'
import bdtb from '@/assets/bdtb.png'
import gddt from '@/assets/gddt.png'
import gsz from '@/assets/gsz.png'
import iCloud from '@/assets/iCloud.png'
import jnbg from '@/assets/jnbg.png'
import kgyy from '@/assets/kgyy.png'
import kyd from '@/assets/kyd.png'
import qq from '@/assets/qq.png'
import qqyy from '@/assets/qqyy.png'
import sgrz from '@/assets/sgrz.png'
import tb from '@/assets/tb.png'
import tm from '@/assets/tm.png'
import wb from '@/assets/wb.png'
import wx from '@/assets/wx.png'
import ydfyg from '@/assets/ydfyg.png'
import zfb from '@/assets/zfb.png'
// import zgtl from '@/assets/zgtl.png'
import zsyh from '@/assets/zsyh.png'
import wj from '@/assets/wj.png'
import cz from '@/assets/cz.png'
import kjzl from '@/assets/kjzl.png'
import iTunesStore from '@/assets/iTunesStore.png'
import fy from '@/assets/fy.png'
import txl from '@/assets/txl.png'
import watch from '@/assets/watch.png'
import tishi from '@/assets/tishi.png'
import iMovie from '@/assets/iMovie.png'
import iTunesU from '@/assets/iTunesU.png'
import keynote from '@/assets/keynote.png'
import numbers from '@/assets/numbers.png'
import pages from '@/assets/pages.png'
import jd from '@/assets/jd.png'
import kk from '@/assets/kk.png'
import mt from '@/assets/mt.png'
import mtwm from '@/assets/mtwm.png'
import elm from '@/assets/elm.png'
import dzdp from '@/assets/dzdp.png'
import dd from '@/assets/dd.png'
import blbl from '@/assets/blbl.png'
import wyyyy from '@/assets/wyyyy.png'
import lscs from '@/assets/lscs.png'
import hyld from '@/assets/hyld.png'
import angryBirds from '@/assets/angryBirds.png'
import kingdomRush from '@/assets/kingdomRush.png'
import klocki from '@/assets/klocki.png'
import zipZap from '@/assets/zipZap.png'
import merged from '@/assets/merged.png'
import chameleon from '@/assets/chameleon.png'
import paper from '@/assets/paper.png'
import dwct from '@/assets/dwct.png'
import orbit from '@/assets/orbit.png'
import wrapShift from '@/assets/wrapShift.png'
// import clock from '@/views/apps/clock/index'
export default {
    components: {
        // clock
    },
    data: function () {
        return {
            ready: false,
            edit: false,
            footerApp: [
                {
                    name: '电话',
                    logo: dh
                }, {
                    name: 'Safari 浏览器',
                    logo: llq
                }, {
                    name: '信息',
                    logo: dx,
                    msgCount: 99
                }, {
                    name: '音乐',
                    logo: yy
                }
            ],
            appTab: [
                {
                    apps: [
                        {
                            name: 'FaceTime 通话',
                            logo: faceTime,
                            path: '/faceTime'
                        }, {
                            name: '日历',
                            logo: rl,
                            path: '/faceTime'
                        }, {
                            name: '照片',
                            logo: zp,
                            path: '/faceTime'
                        }, {
                            name: '相机',
                            logo: xj,
                            path: '/faceTime'
                        }, {
                            name: '邮件',
                            logo: yj,
                            msgCount: 16,
                            path: '/faceTime'
                        }, {
                            name: '时钟',
                            logo: sz,
                            // path: '/clock',
                            // app: 'clock'
                            path: '/faceTime'
                        }, {
                            name: '地图',
                            logo: dt,
                            path: '/faceTime'
                        }, {
                            name: '天气',
                            logo: tq,
                            path: '/faceTime'
                        }, {
                            name: '提醒事项',
                            logo: txsx,
                            msgCount: 1,
                            path: '/faceTime'
                        }, {
                            name: '备忘录',
                            logo: bwl,
                            path: '/faceTime'
                        }, {
                            name: '股市',
                            logo: gs,
                            path: '/faceTime'
                        }, {
                            name: '图书',
                            logo: ts,
                            path: '/faceTime'
                        }, {
                            name: 'App Store',
                            logo: appStore,
                            path: '/faceTime'
                        }, {
                            name: '播客',
                            logo: bk,
                            path: '/faceTime'
                        }, {
                            name: '视频',
                            logo: sp,
                            path: '/faceTime'
                        }, {
                            name: '健康',
                            logo: jk,
                            path: '/faceTime'
                        // }, {
                        //     name: '家庭',
                        //     logo: jt
                        }, {
                            name: '钱包',
                            logo: qb,
                            path: '/faceTime'
                        }, {
                            name: '设置',
                            logo: setting,
                            path: '/faceTime'
                        }
                    ]
                },
                {
                    apps: [
                        {
                            name: '库乐队',
                            logo: kyd,
                            path: '/faceTime'
                        },
                        {
                            name: '文件',
                            logo: wj,
                            path: '/faceTime'
                        },
                        {
                            name: '查找',
                            logo: cz,
                            path: '/faceTime'
                        },
                        {
                            name: '快捷指令',
                            logo: kjzl,
                            path: '/faceTime'
                        },
                        {
                            name: 'iTunes Store',
                            logo: iTunesStore,
                            path: '/faceTime'
                        },
                        {
                            name: '翻译',
                            logo: fy,
                            path: '/faceTime'
                        },
                        {
                            name: '通讯录',
                            logo: txl,
                            path: '/faceTime'
                        },
                        {
                            name: 'Watch',
                            logo: watch,
                            path: '/faceTime'
                        },
                        {
                            name: '提示',
                            logo: tishi,
                            path: '/faceTime'
                        },
                        {
                            name: 'iMovie 剪辑',
                            logo: iMovie,
                            path: '/faceTime'
                        },
                        {
                            name: 'iTunes U',
                            logo: iTunesU,
                            path: '/faceTime'
                        },
                        {
                            name: 'Keynote 演讲',
                            logo: keynote,
                            path: '/faceTime'
                        },
                        {
                            name: 'Numbers 表格',
                            logo: numbers,
                            path: '/faceTime'
                        },
                        {
                            name: 'Pages 文稿',
                            logo: pages,
                            path: '/faceTime'
                        }, {
                            name: 'iCloud',
                            logo: iCloud,
                            path: '/faceTime'
                        }
                    ]
                },
                {
                    apps: [
                        {
                            name: '京东',
                            logo: jd,
                            path: '/faceTime'
                        },
                        {
                            name: '夸克',
                            logo: kk,
                            path: '/faceTime'
                        },
                        {
                            name: '美团',
                            logo: mt,
                            path: '/faceTime'
                        },
                        {
                            name: '美团外卖',
                            logo: mtwm,
                            path: '/faceTime'
                        },
                        {
                            name: '饿了么',
                            logo: elm,
                            path: '/faceTime'
                        },
                        {
                            name: '大众点评',
                            logo: dzdp,
                            path: '/faceTime'
                        },
                        {
                            name: '钉钉',
                            logo: dd,
                            path: '/faceTime'
                        },
                        {
                            name: '哔哩哔哩',
                            logo: blbl,
                            path: '/faceTime'
                        },
                        {
                            name: '爱奇艺',
                            logo: aqy,
                            path: '/faceTime'
                        },
                        {
                            name: '百度贴吧',
                            logo: bdtb,
                            path: '/faceTime'
                        }, {
                            name: '高德地图',
                            logo: gddt,
                            path: '/faceTime'
                        }, {
                            name: '酷狗音乐',
                            logo: kgyy,
                            path: '/faceTime'
                        }, {
                            name: 'QQ',
                            logo: qq,
                            msgCount: 102,
                            path: '/faceTime'
                        }, {
                            name: 'QQ音乐',
                            logo: qqyy,
                            path: '/faceTime'
                        }, {
                            name: '淘宝',
                            logo: tb,
                            path: '/faceTime'
                        }, {
                            name: '天猫',
                            logo: tm,
                            path: '/faceTime'
                        }, {
                            name: '微博',
                            logo: wb,
                            path: '/faceTime'
                        }, {
                            name: '微信',
                            logo: wx,
                            msgCount: 28,
                            path: '/faceTime'
                        }, {
                            name: '招商银行',
                            logo: zsyh,
                            path: '/faceTime'
                        }, {
                            name: '支付宝',
                            logo: zfb,
                            path: '/faceTime'
                        }, {
                            name: '网易云音乐',
                            logo: wyyyy,
                            path: '/faceTime'
                        }, {
                            name: '有道翻译官',
                            logo: ydfyg,
                            path: '/faceTime'
                        }
                    ]
                },
                {
                    apps: [
                        {
                            name: '割绳子',
                            logo: gsz,
                            path: '/faceTime'
                        }, {
                            name: '纪念碑谷',
                            logo: jnbg,
                            path: '/faceTime'
                        }, {
                            name: '水果忍者',
                            logo: sgrz,
                            path: '/faceTime'
                        }, {
                            name: '炉石传说',
                            logo: lscs,
                            path: '/faceTime'
                        }, {
                            name: '荒野乱斗',
                            logo: hyld,
                            path: '/faceTime'
                        }, {
                            name: 'kingdomRush',
                            logo: kingdomRush,
                            path: '/faceTime'
                        }, {
                            name: 'Angry Birds 2',
                            logo: angryBirds,
                            path: '/faceTime'
                        }, {
                            name: 'Llocki',
                            logo: klocki,
                            path: '/faceTime'
                        }, {
                            name: 'Zip Zap',
                            logo: zipZap,
                            path: '/faceTime'
                        }, {
                            name: 'Merged!',
                            logo: merged,
                            path: '/faceTime'
                        }, {
                            name: 'Chameleon',
                            logo: chameleon,
                            path: '/faceTime'
                        }, {
                            name: 'Paper',
                            logo: paper,
                            path: '/faceTime'
                        }, {
                            name: '动物餐厅',
                            logo: dwct,
                            path: '/faceTime'
                        }, {
                            name: 'Wrap Shift',
                            logo: wrapShift,
                            path: '/faceTime'
                        }, {
                            name: 'Orbit',
                            logo: orbit,
                            path: '/faceTime'
                        }
                    ]
                }
            ],
            dragData: {
                clientX: 0,
                clientY: 0,
                prevClientX: 0,
                prevClientY: 0,
                prevTop: 0,
                prevLeft: 0,
                // touchstartTimestamp: 0,
                longPressTimer: null,
                timer: null
            },
            activePage: null,
            activeApp: null
        }
    },
    methods: {
        changePage: function (pageItem, pageIndex) {
            this.activePage = pageItem
            this.$refs.tabContainer.style.transition = '0.25s'
            this.$refs.tabContainer.style.left = `-${pageIndex * window.innerWidth}px`
        },
        dragPageTouchStart: function (event) {
            this.dragData.prevClientX = event.touches[0].clientX
            this.dragData.prevClientY = event.touches[0].clientY
            const style = window.getComputedStyle(this.$refs.tabContainer)
            this.dragData.prevLeft = parseInt(style.left)
            this.$refs.tabContainer.style.transition = 'none'
            this.dragPageFlag = false
        },
        dragPageTouchMove: function (event) {
            const left = this.dragData.prevLeft + event.touches[0].clientX - this.dragData.prevClientX
            this.$refs.tabContainer.style.left = `${left}px`
            this.dragPageFlag = true
        },
        dragPageTouchEnd: function (event) {
            this.$refs.tabContainer.style.transition = '0.25s'
            const style = window.getComputedStyle(this.$refs.tabContainer)
            const left = -parseInt(style.left)
            let index = Math.floor((left + window.innerWidth / 2) / window.innerWidth)
            index = index < 0 ? 0 : index
            index = index > this.appTab.length - 1 ? this.appTab.length - 1 : index
            this.activePage = this.appTab[index]
            this.$refs.tabContainer.style.left = `-${index * window.innerWidth}px`
            if (!this.dragPageFlag) {
                this.edit = false
            }
            this.dragPageFlag = false
        },
        touchendFunc: function (event, pageItem, appItem) {
            if (new Date().getTime() - this.dragData.touchstartTimestamp < 200 && !this.edit) {
                const left = (81 + this.activeApp.index % 4 * (180 + 81) + 180 / 2) * window.innerWidth / 1125
                const top = (Math.floor(this.activeApp.index / 4) * 285 + 231 + 180 / 2) * window.innerWidth / 1125
                this.$refs.appRouterView.style.width = 0
                this.$refs.appRouterView.style.height = 0
                this.$refs.appRouterView.style.left = `${left}px`
                this.$refs.appRouterView.style.top = `${top}px`
                clearTimeout(this.dragData.timer)
                Promise.resolve().then(() => {
                    this.$refs.appRouterView.style.transition = 'top 0.25s linear, left 0.25s linear'
                }).then(() => {
                    setTimeout(() => {
                        this.$refs.appRouterView.style.top = 0
                        this.$refs.appRouterView.style.left = 0
                        this.$refs.appRouterView.style.width = `${window.innerWidth}px`
                        this.$refs.appRouterView.style.height = `${window.innerHeight}px`
                    }, 0)
                    // this.$refs.appRouterView.style.backgroundColor = 'white'
                }).then(() => {
                    clearTimeout(this.dragData.timer)
                    this.dragData.timer = setTimeout(() => {
                        this.$refs.appRouterView.style.transition = 'none'
                    }, 250)
                    this.$router.push({
                        path: appItem.path,
                        query: {
                            centerLeft: left,
                            centerTop: top
                        }
                    })
                })
            }
            clearTimeout(this.dragData.longPressTimer)
            if (this.activeApp.index >= this.activePage.apps.length) {
                this.activeApp.index = this.activePage.apps.length - 1
            }
            this.activeApp = null
        },
        computeDragAppStyle: function () {
            return {
                left: `${this.dragData.prevLeft + this.dragData.clientX - this.dragData.prevClientX}px`,
                top: `${this.dragData.prevTop + this.dragData.clientY - this.dragData.prevClientY}px`,
                transition: 'none'
            }
        },
        touchmoveFunc: function (event) {
            if (!this.activeApp) {
                return false
            }
            const activePageIndex = this.appTab.findIndex(item => item === this.activePage)
            this.dragData.clientX = event.touches[0].clientX
            this.dragData.clientY = event.touches[0].clientY
            const left = this.dragData.prevLeft + this.dragData.clientX - this.dragData.prevClientX
            const top = this.dragData.prevTop + this.dragData.clientY - this.dragData.prevClientY
            const col = Math.floor((left - 81 * window.innerWidth / 1125 + (180 + 81) * window.innerWidth / 1125 / 2) / ((180 + 81) * window.innerWidth / 1125))
            const row = Math.floor((top + 285 * window.innerWidth / 1125 / 2) / (285 * window.innerWidth / 1125))
            const index = row * 4 + col
            if (col === 4) {
                clearTimeout(this.dragData.timer)
                this.dragData.timer = setTimeout(() => {
                    if (this.appTab[activePageIndex + 1]) {
                        const appIndex = this.activePage.apps.findIndex(item => item === this.activeApp)
                        this.activePage.apps.filter(item => item.index > this.activeApp.index && item !== this.activeApp).forEach(item => {
                            item.index = item.index - 1
                        })
                        this.activePage.apps.splice(appIndex, 1)
                        this.activePage = this.appTab[activePageIndex + 1]
                        this.activePage.apps.filter(item => item.index >= this.activeApp.index).forEach(item => {
                            item.index = item.index + 1
                        })
                        this.activePage.apps.push(this.activeApp)
                        this.$refs.tabContainer.style.left = `-${(activePageIndex + 1) * window.innerWidth}px`
                    }
                }, 500)
            } else if (col === -1) {
                clearTimeout(this.dragData.timer)
                this.dragData.timer = setTimeout(() => {
                    if (this.appTab[activePageIndex - 1]) {
                        const appIndex = this.activePage.apps.findIndex(item => item === this.activeApp)
                        this.activePage.apps.filter(item => item.index > this.activeApp.index && item !== this.activeApp).forEach(item => {
                            item.index = item.index - 1
                        })
                        this.activePage.apps.splice(appIndex, 1)
                        this.activePage = this.appTab[activePageIndex - 1]
                        this.activePage.apps.filter(item => item.index >= this.activeApp.index).forEach(item => {
                            item.index = item.index + 1
                        })
                        this.activePage.apps.push(this.activeApp)
                        this.$refs.tabContainer.style.left = `-${(activePageIndex - 1) * window.innerWidth}px`
                    }
                }, 500)
            } else if (index !== this.activeApp.index) {
                if (index > this.activeApp.index) {
                    const moveApps = this.activePage.apps.filter(item => {
                        return item.index <= index && item.index >= this.activeApp.index && item !== this.activeApp
                    })
                    moveApps.forEach(item => {
                        item.index = item.index - 1
                    })
                    this.activeApp.index = index
                } else {
                    const moveApps = this.activePage.apps.filter(item => {
                        return item.index >= index && item.index <= this.activeApp.index && item !== this.activeApp
                    })
                    moveApps.forEach(item => {
                        item.index = item.index + 1
                    })
                    this.activeApp.index = index
                }
                this.appTab.forEach(pageItem => {
                    const copyApps = [...pageItem.apps].sort((x, y) => x.index - y.index)
                    pageItem.apps.forEach(appItem => {
                        const index = copyApps.findIndex(item => item === appItem)
                        appItem.index = index
                    })
                })
            }
        },
        touchstartFunc: function (event, pageItem, appItem) {
            this.activeApp = appItem
            this.activePage = pageItem
            this.dragData.prevTop = Math.floor(appItem.index / 4) * 285 * window.innerWidth / 1125
            this.dragData.prevLeft = ((appItem.index % 4) * (180 + 81) + 81) * window.innerWidth / 1125
            this.dragData.prevClientX = event.touches[0].clientX
            this.dragData.prevClientY = event.touches[0].clientY
            this.dragData.clientX = event.touches[0].clientX
            this.dragData.clientY = event.touches[0].clientY
            clearTimeout(this.dragData.longPressTimer)
            this.dragData.touchstartTimestamp = new Date().getTime()
            this.dragData.longPressTimer = setTimeout(() => {
                this.activeApp && (this.edit = true)
            }, 500)
        },
        computeRenderKey: function () {
            this.appTab.forEach((pageItem, pageIndex) => {
                let str = (Math.random() * 0xffffffff).toString(16)
                let tempArr = str.split('.')
                pageItem.renderKey = tempArr[0].padEnd(8, '0')
                pageItem.index = pageIndex
                pageItem.apps.forEach((appItem, appIndex) => {
                    str = (Math.random() * 0xffffffff).toString(16)
                    tempArr = str.split('.')
                    appItem.renderKey = tempArr[0].padEnd(8, '0')
                    appItem.index = appIndex
                })
            })
            this.footerApp.forEach((appItem, appIndex) => {
                const str = (Math.random() * 0xffffffff).toString(16)
                const tempArr = str.split('.')
                appItem.index = appIndex
                appItem.renderKey = tempArr[0].padEnd(8, '0')
            })
            this.ready = true
        },
        computeAppStyle: function (appItem) {
            if (appItem !== this.activeApp) {
                const left = ((appItem.index % 4) * (180 + 81) + 81) * window.innerWidth / 1125
                const top = Math.floor(appItem.index / 4) * 285 * window.innerWidth / 1125
                return {
                    top: `${top}px`,
                    left: `${left}px`,
                    transition: 'top 0.25s, left 0.25s, transform 0.25s',
                    animationDelay: `${Math.random() * 0.5}s`,
                    transform: 'scale(1)'
                }
            }
            const left = this.dragData.prevLeft + this.dragData.clientX - this.dragData.prevClientX
            const top = this.dragData.prevTop + this.dragData.clientY - this.dragData.prevClientY
            return {
                top: `${top}px`,
                left: `${left}px`,
                transition: 'top 0s, left 0s, transform 0.25s',
                transform: 'scale(1.1)',
                // animation: '',
                zIndex: 1
            }
        },
        computeFooterAppStyle: function (appItem) {
            const left = (51 + (180 + 81) * appItem.index) * window.innerWidth / 1125
            const top = 51 * window.innerWidth / 1125
            return {
                top: `${top}px`,
                left: `${left}px`
            }
        }
    },
    mounted: function () {
        this.computeRenderKey()
        this.activePage = this.appTab[0]
    }
}
</script>
<style lang="stylus" scoped>
@keyframes shake {
    0% {
        transform: rotate(0);
    }
    25% {
        transform: rotate(5deg);
    }
    50% {
        transform: rotate(0);
    }
    75% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0);
    }
}
.home {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    // background-image: url('~@/assets/bg1.png');
    // background-image: url('~@/assets/bg2.jpg');
    // background-image: url('~@/assets/bg3.jpg');
    background-image: url('~@/assets/bg4.jpg');
    background-size: cover;
    background-position: 50% 50%;
    background-color: black;
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, rem(164)) minmax(0, auto) minmax(0, rem(312));
    grid-row-gap: rem(67);
    user-select: none;
    position: relative;
    .header-bar {
        position: relative;
        .left {
            padding-left: rem(82);
            font-size: rem(48);
            color: white;
            line-height: rem(164);
        }
        .right {
            position: absolute;
            right: 0;
            top: 0;
            line-height: rem(164);
            padding-right: rem(34);
            .signal {
                // display: inline-block;
                width: rem(51);
                height: rem(32);
                margin-right: rem(16);
                vertical-align: middle;
                display: inline-grid;
                grid-template-columns: repeat(4, 1fr);
                grid-column-gap: rem(5);
                align-items: end;
                i {
                    border-radius: rem(4);
                    &:nth-child(1) {
                        height: rem(11);
                        background-color: white;
                    }
                    &:nth-child(2) {
                        height: rem(16);
                        background-color: white;
                    }
                    &:nth-child(3) {
                        height: rem(24);
                        background-color: rgba(255, 255, 255, 0.4);
                    }
                    &:nth-child(4) {
                        height: rem(32);
                        background-color: rgba(255, 255, 255, 0.4);
                    }
                }
            }
            .wifi {
                display: inline-block;
                width: rem(46);
                height: rem(33);
                // border: 1px solid red;
                // background-color: green;
                margin-right: rem(16);
                vertical-align: middle;
                position: relative;
                clip-path: polygon(0% 20%, 0% 0%, 100% 0%, 100% 20%, 50% 100%);
                i {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translate(-50%, 50%);
                    border-radius: 50%;
                    &:nth-child(1) {
                        background-color: white;
                        width: rem(20);
                        height: @width;
                    }
                    &:nth-child(2) {
                        width: rem(42);
                        height: @width;
                        border: rem(6) solid white;
                    }
                    &:nth-child(3) {
                        width: rem(65);
                        height: @width;
                        border: rem(6) solid white;
                    }
                }
            }
            .battery {
                display: inline-block;
                width: rem(69);
                height: rem(34);
                // border: 1px solid red;
                vertical-align: middle;
                position: relative;
                i {
                    position: absolute;
                    top: 0;
                    right: rem(7);
                    bottom: 0;
                    left: 0;
                    border: rem(3) solid rgba(white, 0.5);
                    border-radius: rem(10);
                    &:before {
                        content: '';
                        position: absolute;
                        top: rem(3);
                        left: rem(3);
                        bottom: rem(3);
                        width: rem(40);
                        background-color: white;
                        border-radius: rem(6);
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        right: 0;
                        bottom: rem(3);
                        width: rem(4);
                        height: rem(12);
                        background-color: rgba(white, 0.5);
                        transform: translate(rem(8), -50%);
                        border-top-right-radius: rem(12);
                        border-bottom-right-radius: rem(12);
                    }
                }
            }
        }
    }
    .app-tab {
        position: relative;
        // padding: 0 rem(81);
        overflow: visible;
        position: relative;
        // overflow-x: auto;
        // white-space: nowrap;
        // scrollbar-width: none;
        // -webkit-overflow-scrolling: auto;
        // overflow-scrolling: auto;
        // -webkit-overflow-scrolling: none;
        .tab-container {
            display: inline-block;
            height: 100%;
            white-space: nowrap;
            position: absolute;
            left: 0;
            top: 0;
            transition: 0.25s;
            // border: 1px solid red;
        }
        .app-page {
            display: inline-block;
            // width: rem(180 * 4 + 81 * 3);
            width: rem(1125);
            height: 100%;
            // margin-right: rem(81 * 2);
            position: relative;
            // &:nth-last-child(1) {
            //     margin-right: 0;
            // }
        }
        .pagination {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0;
            line-height: rem(73);
            i {
                display: inline-block;
                width: rem(23);
                height: @width;
                border-radius: 50%;
                margin: 0 rem(15);
                background-color: rgba(255, 255, 255, 0.5);
                vertical-align: middle;
                &.active {
                    background-color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
    .app-item {
        width: rem(180);
        text-align: center;
        font-size: 0;
        display: inline-block;
        margin-right: rem(81);
        position: absolute;
        transition: 0.25s;
        &.shake {
            animation: shake 0.3s linear infinite;
        }
        &.active {
            animation: none;
        }
        &.drag {
            transition: none;
        }
        &:hover {
            // background-color: red;
        }
        .logo, >>>.logo {
            display: block;
            width: rem(180);
            height: rem(180);
            border-radius: rem(36);
            position: relative;
            background-size: 100% 100%;
            .msg-count {
                position: absolute;
                right: rem(-36);
                top: 0;
                transform: translate(0, -50%);
                height: rem(72);
                line-height: rem(72);
                font-size: rem(42);
                color: white;
                padding: 0 rem(22.2);
                border-radius: rem(36)
                background-color: rgba(255, 0, 0, 0.8);
                min-width: rem(72);
            }
            .remove-btn {
                position: absolute;
                top: 0;
                left: 0;
                width: rem(72);
                height: rem(72);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
                background-color: rgba(255, 255, 255, 0.65);
                transition: 0.25s;
                &:before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: rem(37);
                    height: rem(6);
                    border-radius: rem(3);
                    background-color: #357663;
                }
                &.enable {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
        }
        .app-name, >>>.app-name {
            display: block;
            font-size: rem(32);
            margin-top: rem(18);
            position: relative;
            .text {
                position: absolute;
                left: 50%;
                top: 0;
                transform: translate(-50%, 0);
                white-space: nowrap;
                color: white;
            }
        }
    }
    .footer-bar {
        .container {
            margin: 0 rem(30);
            height: rem(282);
            border-radius: rem(100);
            // border: 1px solid red;
            background-color: rgba(255, 255, 255, 0.3);
            position: relative;
            .app-item {
                position: absolute;
            }
        }
    }
    .app-router-view {
        position: absolute;
        z-index: 10;
        width: 0;
        height: 0;
        overflow: hidden;
    }
}
</style>
