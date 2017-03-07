//柱图表组件对象
var H5ComponentBar=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);
    $.each(cfg.data,function(index,value){
        var line=$('<div class="line">');
        var name=$('<div class="name">');
        var rate=$('<div class="rate">');
        var per=$('<div class="per">');
        var bg=$('<div class="bg"></div>');
        rate.append(bg);
        var width=value[1]*100+'%';
        if(value[2]){
            bg.css('backgroundColor',value[2]);
        }
        rate.css('width',width);
        name.text(value[0]);
        per.text(width);
        line.append(name).append(rate).append(per);
        component.append(line);
    })

    return component;
}