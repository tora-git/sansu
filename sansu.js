const PLUS = 1;
const MINUS = 2;
const MULTIPULL = 3;
const DEVIDE = 4;

let MONDAI_MAX = 50;

let startTime = new Date();

function init(){
  for (let i = 1; i <= 9; i++){
    $("#tenValBtnBox").append("<button class='input-btn' value='" + (i * 10) + "'>" + (i * 10) + "</button>");
    $("#oneValBtnBox").append("<button class='input-btn' value='" + i + "'>" + i + "</button>");
  }
  
  $(".input-btn").click(function(){
    let value = Number($(this).val());
    inputValue(value);
  });
  $("#clearBtn").click(function(){
    $("#kaitoVal").text("0");
  });
  $("#decideBtn").click(function(){
    decide();
  });
  $("#restartBtn").click(function(){
    reStart();
  });
  
  start();
}

function syutudai(){
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
  $("#kaitoVal").text("0");
  let targetCnt = Number($("#targetCnt").text());
  targetCnt++;
  $("#targetCnt").text(String(targetCnt));
  $("#progressBar").attr("value", String(targetCnt));
}

function inputValue(value){
  let baseVal = Number($("#kaitoVal").text());
  let newVal = baseVal + value;
  $("#kaitoVal").text(newVal);
  
  if (value < 10){
    decide();
  }
}


function decide(){
  let kaitoVal = Number($("#kaitoVal").text());
  
  
  let seikai = Number($("#seikai").text());
  if (kaitoVal !== seikai){
    alert("ち");
    alert("が");
    alert("う！");
    $("#kaitoVal").text("0");
    return;
  }
  
  let targetCnt = Number($("#targetCnt").text());
  if (targetCnt === MONDAI_MAX){
    let endTime = new Date();
    let passedAllSec = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    let passedSec = passedAllSec % 60;
    let passedMin = (passedAllSec - passedSec) / 60;
    alert("お疲れ様です！\nかかった時間：" + passedMin + "分" + passedSec + "秒");
  } else {
    syutudai();
  }
}

function reStart(){
  let inputMaxCnt = window.prompt("何問やる？", String(MONDAI_MAX));
  if (inputMaxCnt.length === 0){
    inputMaxCnt = "50";
  }
  
  MONDAI_MAX = Number(inputMaxCnt);
  
  start();
}
  
function start(){
  startTime = new Date();
  
  $("#targetCnt").text(String(0));
  $("#maxCnt").text(String(MONDAI_MAX));
  $("#progressBar").attr("max", String(MONDAI_MAX));
  $("#progressBar").attr("value", String(0));
  
  syutudai();
}

function getRansu(minVal, maxVal){
  let ran = Math.floor( Math.random() * (maxVal + 1 - minVal) ) + minVal;
  return ran;
}
