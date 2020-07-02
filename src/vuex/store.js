import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

// 数据存储
let state = {
    version: '0.0.1',
    PI: 3.14159265358979324,
};


// mutations
let mutations = {
    
};

let getters = {
    transformLat: state => (obj) => {
        var ret = -100.0 + 2.0 * obj.x + 3.0 * obj.y + 0.2 * obj.y * obj.y + 0.1 * obj.x * obj.y + 0.2 * Math.sqrt(Math.abs(obj.x))
        ret += (20.0 * Math.sin(6.0 * obj.x * state.PI) + 20.0 * Math.sin(2.0 * obj.x * state.PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(obj.y * state.PI) + 40.0 * Math.sin(obj.y / 3.0 * state.PI)) * 2.0 / 3.0
        ret += (160.0 * Math.sin(obj.y / 12.0 * state.PI) + 320 * Math.sin(obj.y * state.PI / 30.0)) * 2.0 / 3.0
        return ret
    },
    transformLon: state => (obj) => {
        var ret = 300.0 + obj.x + 2.0 * obj.y + 0.1 * obj.x * obj.x + 0.1 * obj.x * obj.y + 0.1 * Math.sqrt(Math.abs(obj.x))
        ret += (20.0 * Math.sin(6.0 * obj.x * state.PI) + 20.0 * Math.sin(2.0 * obj.x * state.PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(obj.x * state.PI) + 40.0 * Math.sin(obj.x / 3.0 * state.PI)) * 2.0 / 3.0
        ret += (150.0 * Math.sin(obj.x / 12.0 * state.PI) + 300.0 * Math.sin(obj.x / 30.0 * state.PI)) * 2.0 / 3.0
        return ret
    },
    locationDelta: state => (obj) => {
        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dLat = this.a.getters.transformLat({x: (obj.lon - 105.0), y: (obj.lat - 35.0)})
        var dLon = this.a.getters.transformLon({x: (obj.lon - 105.0), y: (obj.lat - 35.0)})
        var radLat = obj.lat / 180.0 * state.PI
        var magic = Math.sin(radLat)
        magic = 1 - ee * magic * magic
        var sqrtMagic = Math.sqrt(magic)
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * state.PI)
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * state.PI)
        return [dLon, dLat]
    },
    wgs84Togcj02: state => (obj) => {
        var lat = +obj.lat;
        var lon = +obj.lon;
        var d = this.a.getters.locationDelta({lon: lon, lat: lat});
        return [lon + d[0], lat + d[1]]
    },
    wgs84Togcj02s: state => (arrs) => {
        let newArrs = [];

        arrs.forEach((value, index) => {
            newArrs.push(this.a.getters.wgs84Togcj02({lon: value[0], lat: value[1]}));
        });

        return newArrs;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations
});

export default store;