/**
 * 障碍物缓存池
 */

cc.Class({
    extends: cc.Component,

    properties: {
        pipeGroup : cc.Prefab,
        pipeCnt : 0,
        pipeLayer : cc.Node,    
        initPipeX : 0,    
        spawnInterval : 0,
    },

    onLoad () {
        Global.PipeGroupManager = this;
        
        this.pipePool = new cc.NodePool();
        for (let i = 0; i < this.pipeCnt; ++i) {
            let pipe = cc.instantiate(this.pipeGroup);
            this.pipePool.put(pipe);
        }
    },

    onDestroy() {
        this.StopRun();
    },

    start() {
        this.Borrow();
        this.StartRun();
    },

    StartRun : function(){
        this.schedule(this.Borrow, this.spawnInterval);
    },

    StopRun : function(){
        this.unschedule(this.Borrow);
    },

    Borrow : function(){
        let pipe = null;
        if (this.pipePool.size() > 0) {
            pipe = this.pipePool.get();
        } else {
            pipe = cc.instantiate(this.pipeGroup);
        }
        pipe.parent = this.pipeLayer;
        pipe.active = true;
        pipe.x = this.initPipeX;
        pipe.y = 0;
        pipe.getComponent('PipeGroup').Init();
    },

    Return : function(pipe){
        pipe.parent = null;
        pipe.active = false;
        this.pipePool.put(pipe);
    },
});
