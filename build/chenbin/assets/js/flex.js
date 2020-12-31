function fontSize() {
  var deviceWidth = document.documentElement.clientWidth > 375 ? 375 : document.documentElement.clientWidth;
  document.documentElement.style.fontSize = (deviceWidth / 37.5) + "px";
}
fontSize();
window.onresize = fontSize;
