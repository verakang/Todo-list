//指定DOM
var addItemBtn = document.querySelector(".btn");
var addItemInput = document.querySelector(".text");
var showList = document.querySelector(".list");
var data = JSON.parse(localStorage.getItem("list")) || [];

//監聽
addItemBtn.addEventListener("click",addList);
addItemInput.addEventListener("keydown",keyAddList);
showList.addEventListener("click",removeList);
showList.addEventListener("click",doneList);
updateList(data);
    
    var item;
    var todo;

//新增、紀錄備忘
function addList(e){
  
    item = document.querySelector(".text");
    todo = {
  //移除<>符號  replace(/[<>]/g,"")
    todoTitle:item.value.replace(/[<>]/g,""),
    done: false
  };
  //驗證空白內容及<>符號  replace(/[<>\s]+/g,"")
  if(item.value.replace(/[<>\s]+/g,"") == ""){alert("請輸入內容")}   
  else{
    data.push(todo);  
    updateList(data);  
    var dataString = JSON.stringify(data);
    localStorage.setItem("list",dataString);
  //清空input內容
    item.value = "";
  }

};

function keyAddList(e){
  
    item = document.querySelector(".text");
    todo = {
  //移除<>符號  replace(/[<>]/g,"")
    todoTitle:item.value.replace(/[<>]/g,""),
    done: false
  };
  //驗證空白內容及<>符號  replace(/[<>\s]+/g,"")
  if(event.keyCode !==13){return}
  else{
      if(item.value.replace(/[<>\s]+/g,"") == ""){alert("請輸入內容")}   
      else{
        data.push(todo);  
        updateList(data);  
        var dataString = JSON.stringify(data);
        localStorage.setItem("list",dataString);
      //清空input內容
        item.value = "";
      }
  }

};

//更新備忘
function updateList(data){
  var len = data.length;
  var str = "";
  for(var i = 0;i < len;i++){
    if(data[i].done == true){
      str += "<li class='done' data-donenum="+i+">"+(i+1)+". "+data[i].todoTitle+"<a data-listnum="+i+">刪除</a></li>";
    }else{
      str += "<li data-donenum="+i+">"+(i+1)+". "+data[i].todoTitle+"<a data-listnum="+i+">刪除</a></li>";
    } 
  }
  showList.innerHTML = str;
  
}

//刪除備忘錄
function removeList(e){
  if(e.target.nodeName !== "A"){return};
  var listnum = e.target.dataset.listnum;
  data.splice(listnum,1);
  var dataString = JSON.stringify(data);
  localStorage.setItem("list",dataString);
  updateList(data); 
};

//完成標注
function doneList(e){
  // console.log(e.target)
  if(e.target.nodeName === "LI"){
    var donenum = e.target.dataset.donenum;
    data[donenum].done = !data[donenum].done;
       
    var dataString = JSON.stringify(data);
    localStorage.setItem("list",dataString);
    updateList(data);  
  }      
};