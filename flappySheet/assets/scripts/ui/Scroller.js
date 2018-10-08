/**
 * 背景滚蛋
 */

cc.Class({
    extends: cc.Component,

    properties: {
        speed : 0,
        resetX : 0,
    },

    update (dt) {
        this.node.x += dt * this.speed;
        if(this.node.x <= this.resetX){
            this.node.x -= this.resetX;
        }
    },
});
