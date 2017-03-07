var H5ComponentBase=function(name,cfg){
    var cfg=cfg || {};
    var id=('h5_c_'+Math.random()).replace('.','_');
    //把当前的组件类型添加到样式中进行标记
    var cls=' h5_component_'+cfg.type;
    var component=$('<div class="h5_component '+cls+' h5_component_name_'+name+'" id='+id+'>');
    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
    if(cfg.center===true){
        component.css({
            marginLeft:(cfg.width/4 * -1)+'px',
            left:'50%'
        })
    }
    //...很多自定义参数
    if(typeof cfg.onclick==='function'){
        component.on('click',cfg.onclick);
    }
    component.on('onLoad',function(){
        setTimeout(function(){
            component.addClass(cls+'_Load').removeClass(cls+'_Leave');
            cfg.animateIn && component.animate(cfg.animateIn);
        },cfg.delay||0)
        return false;
    });
    component.on('onLeave',function(){
        component.addClass(cls+'_Leave').removeClass(cls+'_Load');
        cfg.animateOut && component.animate(cfg.animateOut);
        return false;
    });
    return component;
}