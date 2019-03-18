// components/list/list.js
Component({
    options: {
        addGlobalClass: true,
    },
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        },
        goDetail: {
            type: null,
            value: ()=>{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goDetail(e) {
            console.log('e...', e);
            this.triggerEvent('GoDetail', e)
        },
    },
   
    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            console.log('this..', this.data, this.data.goDetail);
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
            console.log('组件list被销毁了...');
        }
    }
})
