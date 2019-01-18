<template>
  <div id="layout_1494037671822" class="layout  none" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
    <div class="view_contents">
      <div id="banner_style_03_1494040171964" class="view style_03 banner  none" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
        <div names="banner" class="view_contents">
          <!---Banner区域---->
          <div id="banner" class="bannerStyle_4">
            <div class="main_visual">
              <div class="main_image">
                <ul>
                  <li><a href="" class="picSet"><span class="img_0"></span></a></li>
                  <li><a href="" class="picSet"><span class="img_1"></span></a></li>
                  <li><a href="" class="picSet"><span class="img_2"></span></a></li>
                </ul>
                <a href="javascript:;" id="btn_prev"></a>
                <a href="javascript:;" id="btn_next"></a>
              </div>
            </div>
            <div class="main_control" style="display: none;">
              <a class="pause" href="javascript:void(0);"></a>
              <a class="play" href="javascript:void(0);"></a>
            </div>
            <div class="flicking_con"></div>
          </div>
          <!---Banner区域 end---->
        </div>
      </div>
    </div>
  </div>
</template>
<script src="res\banner\style_03\jquery.event.drag-1.5.min.js"></script>
<script src="res\banner\style_03\jquery.touchSlider.js"></script>
<script>
export default {
  name: 'index-banner'
}
$(document).ready(function(){
  var dateSet=parseFloat('3')*1000;//定义多少秒滚动，默认3秒
  var index = 0;
  var picTimer;
//自动添加小点
  var Ulen = $(".bannerStyle_4 .main_image ul li").length;
  for(var i=0; i<Ulen; i++){
    $(".bannerStyle_4 .flicking_con").append("<a href='#'></a>");
  }
  $(".bannerStyle_4 div.flicking_con a").eq(0).addClass("on");
//小点按钮切换页面
  $(".bannerStyle_4 .flicking_con a").stop().mouseover(function(){
    index = $(".bannerStyle_4 .flicking_con a").index(this);
    showPics(index);
  }).eq(0).trigger("mouseover");
//切换图片的方法
  function showPics(index){
    $(".bannerStyle_4 .main_image ul li").hide();
    $(".bannerStyle_4 .main_image ul li").eq(index).fadeIn().siblings().hide();
    $(".bannerStyle_4 .flicking_con a").removeClass("on").eq(index).addClass("on");
  }
//左右两个按钮
  $(".bannerStyle_4 #btn_next").stop(true,true).click(function(){
    index += 1;
    if(index == Ulen){index = 0}
    showPics(index)
  })
  $(".bannerStyle_4 #btn_prev").stop(true,true).click(function(){
    index -= 1;
    if(index == -1){index = Ulen-1 }
    showPics(index)
  })
//计时器
  var timer = setInterval(function(){
    $(".bannerStyle_4 #btn_next").click();
    if(index == Ulen){index = 0}
  }, dateSet);
//鼠标经过小圆点清除定时器
  $(".flicking_con a").mouseover(function () {
    clearInterval(timer);
  });
  $(".flicking_con a").mouseout(function () {
    timer = setInterval(function(){
      $(".bannerStyle_4 #btn_next").click();
      if(index == Ulen){index = 0}
    }, dateSet);
  });
  $(".flicking_con a").click(function () {
    return false;
  });
});
</script>
