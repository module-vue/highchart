import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

// 数据存储
let state = {
    version: '1.0.0',
    allowStoreArr: [
        {
            itemName: '是',
            itemCode: '1'
        },
        {
            itemName: '否',
            itemCode: '0'
        }
    ]
};


// mutations
let mutations = {
    
};


const store = new Vuex.Store({
	state,
	mutations
});

export default store;
