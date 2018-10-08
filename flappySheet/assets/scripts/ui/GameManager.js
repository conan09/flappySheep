/**
 * 主逻辑
 */
require("../Common/Common");
// require("./Global");
// let Sheet = require("./Sheet");

cc.Class({
    extends: cc.Component,

    properties: {
        lbl_score : cc.Label,
        sheet : cc.Sprite,
        pipeLayer : cc.Node,
        sky : cc.Sprite,
        ground : cc.Sprite,
        gameover : cc.Node,
    },

    ctor() {
        this.score = 0;
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        Global.GameManager = this;
    },

    GainScore : function(){
        this.score += 1
        this.lbl_score.string = this.score;
    },

    OverGame : function(){
        cc.log("Game Over");
        // this.sheet.spriteFrame = new cc.SpriteFrame("sheep_touch_01");
        this.gameover.getComponent("GameOver").Show(this.score);
    },
});
