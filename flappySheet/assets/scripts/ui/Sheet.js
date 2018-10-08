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

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END,)
    },

    RegisterInput : function(){
        this.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
            this.Jump(); 
        })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);
    },

    OnKeyDown : function(event){
        switch(event.keyCode){
            case cc.macro.KEY.up:
                this.Jump();
                break;
        }
    },

    StartRun : function(){
        this.node.getComponent(cc.Animation).play("Run");
    },

    start () {
    },

    GetSheetPos : function(){
        return this.node.position;
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
        /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        console.log('on collision enter');

        if(other.node.group == "Obstacle"){
            Global.GameManager.OverGame();
        }else if(other.node.group == "NextPipe"){
            Global.GameManager.GainScore();
        }
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        console.log('on collision stay');
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        console.log('on collision exit');
    }
});
