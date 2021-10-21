const PLUS = 1;
const MINUS = 2;
const MULTIPULL = 3;
const DEVIDE = 4;

let MONDAI_MAX = 100;

let startTime = new Date();
let calcPos = -1;
let seikaiCnt = 0;

function init(){
  $("#kaitouBtn").click(function(){
    kaito();
  });
  $("#restartBtn").click(function(){
    reStart();
  });
  
  start();
}

function syutudai(){
  calcPos++;
  let enzanVal = getRansu(1, 4);
  let enzanTxt;
  let val1;
  let val2;
  let kaito;
  if (enzanVal === PLUS){
    enzanTxt = "＋";
    val1 = getRansu(0, 20);
    val2 = getRansu(0, 20);
    kaito = val1 + val2;
  } else if (enzanVal === MINUS){
    enzanTxt = "－";
    let tmpVal1 = getRansu(0, 20);
    let tmpVal2 = getRansu(0, 20);
    if (tmpVal1 > tmpVal2){
      val1 = tmpVal1;
      val2 = tmpVal2;
    } else {
      val1 = tmpVal2;
      val2 = tmpVal1;
    }
    kaito = val1 - val2;
  } else if (enzanVal === MULTIPULL){
    enzanTxt = "×";
    val1 = getRansu(1, 9);
    val2 = getRansu(1, 9);
    kaito = val1 * val2;
  } else if (enzanVal === DEVIDE){
    enzanTxt = "÷";
    let tmpVal1 = getRansu(1, 9);
    let tmpVal2 = getRansu(1, 9);
    val1 = tmpVal1 * tmpVal2;
    val2 = tmpVal2;
    kaito = tmpVal1;
  }
  
  $("#val1").text(val1);
  $("#enzan").text(enzanTxt);
  $("#val2").text(val2);
  $("#seikai").text(kaito);
  $("#kotae").val("");
}

function kaito(){
  let kaitoVal = $("#kotae").val();
  if (kaitoVal.length === 0){
    alert("入力して");
    return;
  }
  
  let seikai = $("#seikai").text();
  let progressCells = $("#progressBox").children();
  let progressCell = progressCells.eq(calcPos);
  progressCell.removeClass("mada");
  if (kaitoVal == seikai){
    seikaiCnt++;
    progressCell.addClass("seikai");
    //alert("正解！！次！");
    //syutudai();
  } else {
    progressCell.addClass("matigai");
    //alert("はずれ・・・もう一回");
  }
  
  if (calcPos + 1 === MONDAI_MAX){
    let endTime = new Date();
    let passedSec = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    let seikaiRitu = Math.floor((seikaiCnt * 100) / MONDAI_MAX);
    alert("お疲れ様です！\n正解率：" + seikaiRitu + "%\nかかった時間：" + passedSec + "秒");
  } else {
    syutudai();
  }
}

function reStart(){
  let inputMaxCnt = window.prompt("何問やる？", "100");
  if (inputMaxCnt.length === 0){
    inputMaxCnt = "100";
  }
  
  MONDAI_MAX = Number(inputMaxCnt);
  
  start();
}
  
function start(){
  startTime = new Date();
  calcPos = -1;
  seikaiCnt = 0;
  
  $("#progressBox").empty();
  for (let i = 0; i < MONDAI_MAX; i++){
    $("#progressBox").append("<label class='mada'>■</label>");
  }
  
  syutudai();
}

function getRansu(minVal, maxVal){
  let ran = Math.floor( Math.random() * (maxVal + 1 - minVal) ) + minVal;
  return ran;
}
