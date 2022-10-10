/**
 * Created by linxh on 2015/6/8.
 */
define('framework/message/GillionMessageServiceConstructor',[],function(){

    /**
     * 通过对dom节点改变的方法
     * @param element {obj} 需要创建message的dom元素
     * @param params.message {string}
     * @param params.title {string} title属性 用于做提示内容
     * @param params.gMessage {string} gMessage属性 用于做提示内容 （优先于title）
     * @param params.direction {string} direction属性 显示方位 默认 （right）
     * @constructor
     */
    function Messages(element, params){
        this.element = element;
        this.setParams(params);

    }

    Messages.prototype.setParams= function(params){
        if(params){
            this.title = params.title;
            this.gMessage = params.gMessage;
            this.direction = params.direction;
            this.fontColor = !!params.fontColor?params.fontColor:'#737373';
            this.iconType = !!params.iconType?params.iconType:'icon-que';
            this.iconColor = !!params.iconColor?params.iconColor:'#00b7ee';
            this.outterBox = !!params.outterBox?params.outterBox:false;//外框样式
            this.boxBorderColor =!!params.boxBorderColor?params.boxBorderColor:'#c8c8c8';
            this.className = params.className;
        }
    }

    Messages.prototype.getMessage = function(){
        if(this.gMessage){
            return this.gMessage;
        }else{
            return this.title;
        }
    };

    Messages.prototype.calculateDirection = function(me,next){
        if(next.offsetWidth+me.offsetWidth + me.offsetLeft+30<document.body.clientWidth){
            return 'right';
        }else if(next.offsetHeight<me.offsetTop){
            return 'top';
        }else if(next.offsetHeight +me.offsetHeight+me.offsetTop<document.body.clientHeight){
            return 'bottom';
        }else{
            return 'right';
        }
    };

    Messages.prototype.show = function () {
        if(!!this.timeout){
            clearTimeout(this.timeout);
        }
        this.timeout = undefined;
        var message = '';
        if(this.gMessage){
            message = this.gMessage;
        }else{
            message = this.title;
        }
        //this.relocate();
        this.element.next().css('display','block');
        //this.createMessageDom();
    };

    Messages.prototype.hide = function () {
        var next = this.element.next();
        this.timeout = setTimeout(function(){next.css('display','none');},300);
    };

    Messages.prototype.locate = function(element){
        var me = element[0];
        var parent = element.parent()[0];
        var box = element.next();
        var next = box[0];
        var em = box.find("em");
        this.direction = !!this.direction?this.direction:this.calculateDirection(me,next);
        box.removeClass('br-rul-right','br-rul-top','br-rul-bottom');
        switch(this.direction){
            case 'right':
                if(this.outterBox){
                    box.addClass('br-rul-right');
                    next.style.left=me.offsetLeft + me.offsetWidth+15;
                }else{
                    next.style.left=me.offsetLeft + me.offsetWidth+5;
                }
                next.style.top=me.offsetTop;
                break;
            case 'top':
                if(this.outterBox){
                    box.addClass('br-rul-top');
                    next.style.top=me.offsetTop-me.offsetHeight-15;
                }else{
                    next.style.top=me.offsetTop-me.offsetHeight-5;
                }
                next.style.left=me.offsetLeft;
                break;
            case 'left':
                break;
            case 'bottom':
                if(this.outterBox) {
                    box.addClass('br-rul-bottom');
                    next.style.top=me.offsetTop+me.offsetHeight+10;
                }else{
                    next.style.top=me.offsetTop+me.offsetHeight+5;
                }
                next.style.left=me.offsetLeft;
                break;
            default:

                ;
        }
    }

    Messages.prototype.createMessageDom = function(){
        var that = this;
        var message=this.getMessage();
        var spanHtml='<div class="hint-msgs msg-s0" style="display:block">'
            +'<i class="msg-icon iconfont"></i><em>'+message+'</em></div>';
        if(this.element.next(".hint-msgs")){
            this.element.next(".hint-msgs").remove();
        }
        this.element.after(spanHtml);
        var me = this.element[0];
        var parent = this.element.parent()[0];
        var box = this.element.next();
        var next = box[0];
        var em = box.find("em");
        var inext = box.find("i");
        inext.addClass(this.iconType);
        this.className?box.addClass(params.className):'';
        me.style.borderColor = this.boxBorderColor;
        inext[0].style.color=this.iconColor;
        em[0].style.color=this.fontColor;

        this.locate(this.element);


    };

    Messages.prototype.remove=function(){
        this.element.next(".hint-msgs").remove();
    }

    return function(){
        return {
            create: function (element,params) {
                return new Messages(element,params);
            }
        };
    };
})