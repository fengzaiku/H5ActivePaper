//柱图表组件对象
var H5ComponentPolyline=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);
    //绘制网格线
    var w=cfg.width;
    var h=cfg.height;
    //假如一个画布（网格线背景）-背景层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);
    //水平网格线100份-》10份
    var step=10;
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle='#ccc';
    window.ctx=ctx;
    for(var i=0;i<step+1;i++){
        var y= (h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    //垂直网格线(根据项目个数去分)
    step=cfg.data.length+1;
    var text_w=w/step>>0;
    for(var i=0;i<step+1;i++){
        var x=(w/(step))*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        //项目名称
        if(cfg.data[i]) {
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width',text_w/2);
            text.css('left',(x/2+text_w/4));
            component.append(text);
        }
    }
    ctx.stroke();

    //绘制折线点，加入一个canvas画布，是因为这个画布中的折线是要动的-数据层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);
    /**
     * 绘制折线图以及对应的阴影和数据
     * 参数per 0-1间的数据，灰根据这个值绘制对应的最终数据对应的中间状态
     * **/
    var draw=function(per) {
        ctx.clearRect(0,0,w,h);
        //绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FF8878';

        var x = 0;
        var y = 0;
        var row_w = w / (cfg.data.length + 1);
        var point = [];

        //画点
        for (i in cfg.data) {
            var value = cfg.data[i];
            x = row_w * (i) + row_w;
            y = h -( value[1])*per*h;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }

        //连线
        ctx.moveTo(row_w, h -( cfg.data[0][1])*per*h);
        for (i in cfg.data) {
            var value = cfg.data[i];
            x = row_w * (i) + row_w;
            y = h -( value[1])*per*h;
            ctx.lineTo(x, y);
        }

        //绘制阴影
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,136,120,0)';
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255,136,120,0.2)';
        ctx.fill();

        //写数据
        for (i in cfg.data) {
            var value = cfg.data[i];
            x = row_w * (i) + row_w;
            y = h -( value[1])*per*h;
            ctx.moveTo(x, y);
            if (value[2]) {
                ctx.fillStyle = value[2];
            } else {
                ctx.fillStyle = '#595959';
            }
            ctx.fillText((value[1] * 100) + '%', x - 10, y - 10);
        }
        ctx.stroke();
    }
    component.on('onLoad',function(){
        //折线图生长动画
        var s=0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=0.01;
                draw(s);
            },i*10+500);
        }

    })
    component.on('onLeave',function(){
        //折线图回退动画
        var s=1;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=0.01;
                draw(s);
            },i*10);
        }

    })

    return component;
}