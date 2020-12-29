function fontSize() {
  var deviceWidth = document.documentElement.clientWidth > 1080 ? 1080 : document.documentElement.clientWidth;
  document.documentElement.style.fontSize = (deviceWidth / 108) + "px";
}
fontSize();
window.onresize = fontSize;
