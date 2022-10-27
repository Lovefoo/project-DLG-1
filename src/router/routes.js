/* //引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder'; */
/* 
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。 
*/

//路由配置信息
export default [{
        path: '/home',
        //使用路由懒加载
        component: () =>
            import ('@/pages/Home'),
        //路由元信息key不能瞎写，只能叫做meta
        meta: { show: true }
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }
    }, {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }
    }, {
        name: 'search',
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: { show: true },
        //路由组件能不能传递props数据
        //布尔值写法: params
        // props: true,
        //对象写法:额外的给路由组件传递一些props
        // props: { a: 1, b: 2 },
        // 函数写法: 可以params参数、query参数，通过props传递给路由组件
        props: ($route) => {
            return {
                keyword: $route.params.keyword,
                k: $route.query.k
            }
        }
    },
    {
        path: '/detail/:skuId',
        name: 'detail',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addCartSuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/shopcart',
        name: 'shopCart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true, flag: false }
    },
    {
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter(to, from, next) {
            //去交易页面，必须是从购物车而来
            if (from.path == '/shopcart' && from.meta.flag) {
                from.meta.flag = false;
                next();
            } else if (from.path == '/') {
                next();
            } else {
                //其它的路由组件而来，停留在当前
                //中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter(to, from, next) {
            //去交易页面，必须是从购物车而来
            if (from.path == '/trade' || from.path == '/' || from.path == '/center/myorder') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true },
    },
    {
        path: '/center',
        redirect: '/center/myorder',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        //二级路由
        children: [{
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/MyOrder'),
            },
            {
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/GroupOrder'),
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]