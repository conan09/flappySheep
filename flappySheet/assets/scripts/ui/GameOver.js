/**
 * 游戏结束
 */

cc.Class({
    extends: cc.Component,

    properties: {
        lbl_score : cc.Label,
        btn_play  : cc.Button,
    },

    Show : function(score){
        cc.director.pause();
        this.lbl_score.string = score;
        this.node.active = true;
    },

    RestartGame : function(){
        this.node.active = false;
        // cc.director.loadScene("Game");
        cc.game.restart();
    },
});
