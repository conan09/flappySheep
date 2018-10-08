/**
 * 障碍物
 */

cc.Class({
    extends: cc.Component,

    properties: {
        upPipe : cc.Sprite,
        downPipe : cc.Sprite,
        speed : 0,
    },

    onLoad () {
        this.pipeInterval = null;       // 上下管道之间的间距
        this.downPipePosY = null;       // 下管道的Y轴坐标
    },
    
    Init : function(){
        this.pipeInterval = Utils.getRandomArbitrary(150, 300) + 110;
        let h = this.downPipe.node.height;
        let posY = -1 * Utils.getRandomArbitrary(0, h/2);
        this.downPipe.node.y = posY;
        this.upPipe.node.y = posY + this.pipeInterval + h;
    },
    
    update (dt) {
        if(this.node.x < 0){
            Global.PipeGroupManager.getComponent("PipeGroupPool").Return(this.node);
        }else{
            this.node.x -= dt * this.speed;
        }
    }
});
