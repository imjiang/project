<template>
  <div class="contact">
    <Header />
    <div id="layout_1492512732182" class="layout  none" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
      <div class="view_contents">
        <div id="image_style_01_1492512732185" class="view style_01 image  none" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
          <div names="image" class="view_contents">
            <div class="imgStyle CompatibleImg">
              <a href='javascript:;' target="">
                <img class="picSet link-type-" src="img\upimages\pkgimg\pkgimg\pkgimg\20170509111939891.jpg" title="" alt="描述" id="imageModeShow">
              </a>
            </div>
            <!-- 新加的js  -->
          </div>
        </div>
      </div>
    </div>
    <div id="layout_1494300629047" class="layout " data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
      <div class="view_contents">
        <div id="text_style_06_1494300629051" class="view style_06 text  none lockHeightView" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
          <div names="text" class="view_contents">
            联系我们
          </div>
        </div>
        <div id="text_style_06_1494300629065" class="view style_06 text  none lockHeightView" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
          <div names="text" class="view_contents">
            直接在下方留言，我们会第一时间给你答复
          </div>
        </div>
        <div id="map_style_01_1494300681542" class="view style_01 map " data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
          <div names="map" class="view_contents">

            <div style="width:100%;height:100%;border:#ccc solid 1px;font-size:12px" id="map_style_01_1494300681542_map"></div>
          </div>
        </div>
        <div id="liuyanban_style_01_1494300537390" class="view style_01 liuyanban  none lockHeightView" data-wow-duration='0s' data-wow-delay='0s' data-wow-offset='0' data-wow-iteration='1'>
          <div names="liuyanban" class="view_contents">
            <!---留言板区域---->
            <div id="gform" class="gformStyle_1 modSet">
              <form method="post" action="/gbook/guestbook_submit.php?id=1113&v=9" class="">
                <input type="hidden" name="showuser" value="">
                <input type="hidden" name="showuser_no" value="">
                <input type="hidden" name="gbooklan" value="">
                <div class="gformS gubookSet">
                  <div class="gf_title titSet">欢迎给我们留言</div>
                  <div class="gformList "><textarea name="message" cols="50" rows="5" id="message" class="gf_message inputSet" placeholder="填写留言信息"></textarea></div>
                  <div class="gformList"><input type="text" name="name" id="wordsname" class="gfInput gf_name inputSet" placeholder="请填写您的姓名"></div>
                  <div class="gformList"><input type="text" name="tel" class="gfInput gf_tel inputSet" placeholder="请填写您的电话"></div>
                  <div class="gformList" style="display:block"><input type="text" name="email" class="gfInput gf_email inputSet" placeholder="请填写您的邮箱地址"></div>
                  <div class="gformList" style="display:block"><input type="submit" name="add" value="提交留言" id="GBbt" class="gbt btnaSet"></div>
                  <input type="hidden" name="gbooklan" value="0">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'contact',
  components: {
    Header,
    Footer
  }
}
//function get_params_zoom() {
//  var zoom = parseInt(trim(''));
//  return isNaN(zoom) ? 13 : (zoom < 3 ? 3 : (zoom > 18 ? 18 : zoom));
//}
//// 获取设置参数: 坐标
//function get_params_coordinate() {
//  var latitude = parseFloat(trim('')), longitude = parseFloat(trim(''));
//  return {
//    longitude: isNaN(longitude) ? 116.413554 : longitude,       // 默认北京
//    latitude: isNaN(latitude) ? 39.911013 : latitude
//  };
//}
//// 获取设置参数: 添加标记时所选的图标的在整张图片中的位置
//function get_params_marker_icon(x, y) {     // x:横向第几个, y:纵向第几个
//  (x < 0 || x > 5) && (x = 0);
//  (y < 0 || y > 2) && (y = 0);
//  return {x:x*23, y:y*(y == 1 ? 21 : 23), width:23, height:(y == 1 ? 25 : 21)};
//}
//// 获取参数
//var coordinate = get_params_coordinate();
//var markers_data = [];
//// 显示地图
//$(function () {
//  setTimeout(initMap, 200);
//});
//function initMap(){
//  createMap();//创建地图
//  setMapEvent();//设置地图事件
//  addMapControl();//向地图添加控件
//  addMarker();//向地图中添加marker
//}
//function createMap(){
//  map = new BMap.Map("map_style_01_1494300681542_map");//在百度地图容器中创建一个地图
//  setMapCenter();
//  window.map = map;//将map变量存储在全局
//}
//function setMapCenter() {
//  var location_mode = '';
//  switch(location_mode) {
//    case 'point':
////根据坐标设置地图中心点
//      var point = new BMap.Point(coordinate.longitude, coordinate.latitude);//定义一个中心点坐标
//      map.centerAndZoom(point,get_params_zoom());//设定地图的中心点和坐标并将地图显示在地图容器中
//      break;
//    case 'word': default:
////根据字符串设置地图中心点
//    var address = trim(''), name = trim(''),
//            center = (address ? address : '北京') + (name ? ' ' + name : '');       // address 默认北京
//    map.centerAndZoom(center);
////检索区域
//    var local = new BMap.LocalSearch(map, {renderOptions:{map: map}});
//    local.search(center);
//    break;
//  }
//}
//function setMapEvent(){
//  map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
//  map.enableScrollWheelZoom();//启用地图滚轮放大缩小
//  map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
//  map.enableKeyboard();//启用键盘上下左右键移动地图
//}
////向地图添加控件
//function addMapControl(){
////向地图中添加缩放控件
//  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
//  map.addControl(ctrl_nav);
////向地图中添加缩略图控件
//  var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
//  map.addControl(ctrl_ove);
////向地图中添加比例尺控件
//  var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
//  map.addControl(ctrl_sca);
//}
//
////标注点数组
//var markerArr = [];
//for(var i = 0, len = markers_data.length; i < len; ++i) {
//  var data = markers_data[i], icon = data.icon, coord = data.coordinate;
//  markerArr.push({title:data.title,content:data.content,point:coord.longitude+"|"+coord.latitude,isOpen:1,icon:{w:icon.width,h:icon.height,l:icon.x,t:icon.y,x:6,lb:5}});
//}
////创建marker
//function addMarker(){
//  for(var i=0;i<markerArr.length;i++){
//    var json = markerArr[i];
//    var p0 = json.point.split("|")[0];
//    var p1 = json.point.split("|")[1];
//    var point = new BMap.Point(p0,p1);
//    var iconImg = createIcon(json.icon);
//    var marker = new BMap.Marker(point,{icon:iconImg});
//    var iw = createInfoWindow(i);
//    var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
//    marker.setLabel(label);
//    map.addOverlay(marker);
//    label.setStyle({
//      borderColor:"#808080",
//      color:"#333",
//      cursor:"pointer"
//    });
//
//    (function(){
//      var index = i;
//      var _iw = createInfoWindow(i);
//      var _marker = marker;
//      _marker.addEventListener("click",function(){
//        this.openInfoWindow(_iw);
//      });
//      _iw.addEventListener("open",function(){
//        _marker.getLabel().hide();
//      });
//      _iw.addEventListener("close",function(){
//        _marker.getLabel().show();
//      });
//      label.addEventListener("click",function(){
//        _marker.openInfoWindow(_iw);
//      });
//      if(!!json.isOpen){
//        label.hide();
//        _marker.openInfoWindow(_iw);
//      }
//    })()
//  }
//}
////创建InfoWindow
//function createInfoWindow(i){
//  var json = markerArr[i];
//  var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
//  return iw;
//}
////创建一个Icon
//function createIcon(json){
//  var icon = new BMap.Icon("img/map/style_01/us_cursor.gif", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)});
//  return icon;
//}
////辅助函数
//function trim(s){
//  return s.replace(/(^\s*)|(\s*$)/g,'');
//}
</script>
<style scoped>
  @import '/css/061844.css';
</style>