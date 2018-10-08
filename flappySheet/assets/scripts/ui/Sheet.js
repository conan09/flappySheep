/**
 * 羊类
 */

 let State = cc.Enum({
     None   : -1,
     Run    : -1,
     Jump   : -1,
     Drop   : -1,
     DropEnd: -1,
     Dead   : -1
 });

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight : 0,
        jumpSpeed : 0,
        gravity : 0,
        groudY : 0,
        jumpAudio : {
            default : null,
            type : cc.AudioClip,
        },
        _state : {
            default : State.None,
            visible : true,
            type : State,
        },
        state : {
            set : function(val){
                if(val !== this._state){
                    this._state = val;
                    if(this._state !== State.None){
                    }
                }
            },
            get : function(){
                return this._state;
            },
            type : State,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.RegisterInput();
        this.StartRun();
    },

    RegisterInput : function(){
        this.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
            this.Jump(); 
        })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event)=>{
            switch(event.keyCode){
                case cc.macro.KEY.pageup:
                    this.Jump();
                    break;
            }
        }, this);
    },

    StartRun : function(){
        this.node.getComponent(cc.Animation).play("Run");
    },

    start () {
    },

    update (dt) {
        switch(this.state){
            case State.Jump:
                if(this.currentSpeed < 0){
                    this.state = State.Drop
                }
                cc.audioEngine.play(this.jumpAudio);
                break;
            case State.Drop:
                if(this.node.y < this.groudY){
                    this.node.y = this.groudY;
                }
                this.node.getComponent(cc.Animation).play("Drop");
                break;
            case State.None:
            case State.Dead:
                break;
        }
        let isfly = this.node.y > this.groudY || this.state === State.Jump
        if(isfly){
            this.currentSpeed -= dt * this.gravity;
            this.node.y += this.currentSpeed * dt;
        }
    },

    Jump : function(){
        this.state = State.Jump;
        this.currentSpeed = this.jumpSpeed;
        this.node.getComponent(cc.Animation).play("Jump");
    },
});
