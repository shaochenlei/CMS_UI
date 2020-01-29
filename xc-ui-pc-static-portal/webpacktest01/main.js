/** Created by Chenlei on 2020/01/26 **/

    //导入model01.js
var {add} = require("./model01");
var Vue = require("./vue.min")

var VM = new Vue({
    el:"#app",//相当于vm接管了app区域的管理
    data:{//model数据
        name:'教学空间_陈蕾',
        num1:1,
        num2:1,
        result:0
    },
    methods:{
        change:function () {
            this.result = add(Number.parseInt(this.num1),Number.parseInt(this.num2))
            // this.result = Number.parseInt(this.num1)+Number.parseInt(this.num2)
            // alert("计算结果为"+this.result)

        }
    }
});
