var H5=function(){
    this.id=('h5_'+Math.random()).replace('.','_');
    this.el=$('<div class="h5" id="'+this.id+'">').hide();
    this.page=[];
    $('body').append(this.el);
    //新增一个页
    /**
     * 参数name：page的名称，会假如到classname中
     * 参数text，默认文本
     * **/
    this.addPage=function(name,text){
        var page=$('<div class="section h5_page">');
        if(name!=undefined){
            page.addClass('h5_page_'+name);
        }
        if(text!=undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        if(typeof this.whenAddPage==='function'){
            this.whenAddPage();
        }
        return this;
    }
    //新增一个组件
    this.addComponent=function(name,cfg){
        var cfg=cfg||{};
        //如果你的cfg中没有type，会添加一个tpye:base到cfg中
        cfg= $.extend({
            type:'base'
        },cfg);
        var component;
        var page=this.page.slice(-1)[0];
        switch(cfg.type){
            case 'base':
                component=new H5ComponentBase(name,cfg);
                break;
            case 'polyline':
                component=new H5ComponentPolyline(name,cfg);
                break;
            case 'pai':
                component=new H5ComponentPai(name,cfg);
                break;
            case 'bar':
                component=new H5ComponentBar(name,cfg);
                break;
            case 'bar_v':
                component=new H5ComponentBar_v(name,cfg);
                break;
            case 'radar':
                component=new H5ComponentRadar(name,cfg);
                break;
            case 'point':
                component=new H5ComponentPoint(name,cfg);
                break;
            default:
        }
        page.append(component);
        return this;
    }
    //H5对象初始化呈现
    this.loader=function(firstPage){
        this.el.fullpage({
            onLeave:function(index,nextIndex,direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(link,index){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage);
        }
    }
    this.loader=typeof H5_loading=='function'?H5_loading:this.loader;
    return this;
}