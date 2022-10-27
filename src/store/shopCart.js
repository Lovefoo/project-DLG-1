import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
//shopCart模块的小仓库
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    //回去购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code === 200) {
            return "ok"
        } else {
            //删除失败
            return Promise.reject(new Error('fail'));
        }
    },
    //修改购物车某一个产品选中的状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code === 200) {
            return "ok"
        } else {
            //修改失败
            return Promise.reject(new Error('fail'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库 (提交mutations修改state) getters(计算属性) dispatch(派发action) state(当前仓库数据)
        let promiseAll = [];
        let cartInfoList = getters.cartList.cartInfoList || [];
        cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : null;
            promiseAll.push(promise);
        });
        //只要 p1 | p2 |...都成功，返回的结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(promiseAll);
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            if (isChecked != item.isChecked) {
                let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
                promiseAll.push(promise);
            }
        });
        //最终返回的结果
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
    //计算出来购物出数据
    /*    cartInfoList(state) {
           return state.
       } */
};

export default {
    state,
    mutations,
    actions,
    getters
}