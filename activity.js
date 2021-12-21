const keyword = document.querySelector('.keyword');
const send = document.querySelector('.send');
const list = document.querySelector('.list');

let thisData=[];

keyword.addEventListener("keyup",function(e){
  if(e.key==="Enter"){
    console.log("按到了");
    const keywordTxt = keyword.value; 
  axios.get(
   `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=contains(Name,'${keywordTxt}')&$format=JSON`,
   {
      headers: getAuthorizationHeader()
   }
  )
  .then(function (response) {
    thisData = response.data;
    let str="";
    thisData.forEach((item,index)=>{
      console.log(item)
      if(index<=7){
        str+=`<li><div class="image"><img src="${item.Picture.PictureUrl1}" alt="沒有提供圖片" height="250px" width="300px" /></div><br>
        <h3>${item.Name.substring(0, 10)}</h3></li>`
      }
      
    })
    list.innerHTML = str;

    pagination();
  })
  .catch(function (error) {
    console.log(error);
  }); 
  keyword.value="";
  }
})
send.addEventListener('click',function(e){
  const keywordTxt = keyword.value; 
  axios.get(
   `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=contains(Name,'${keywordTxt}')&$format=JSON`,
   {
      headers: getAuthorizationHeader()
   }
  )
  .then(function (response) {
    thisData = response.data;
    let str="";
    thisData.forEach((item,index)=>{
      console.log(item)
      if(index<=7){
        str+=`<li><div class="image"><img src="${item.Picture.PictureUrl1}" alt="沒有提供圖片" height="250px" width="300px" /></div><br>
        <h3>${item.Name.substring(0, 10)}</h3></li>`
      }
      
    })
    list.innerHTML = str;

    pagination();
  })
  .catch(function (error) {
    console.log(error);
  }); 
  keyword.value="";
})

function pagination(){
        // 取得撈到資料的總筆數
let total= thisData.length;
// console.log(total);

// 設定一頁呈現幾筆資料
const perPage= 8;

// 計算總頁數
let totalPage= Math.ceil(total/perPage);
console.log(totalPage);

// 結合總頁數用for迴圈寫按鈕，應該要有三個按鈕
str="";
for(let i=1;i<totalPage+1;i++){
  str+=`<input class="button" type="button" value="${i}">`
  console.log(str);
}
const btn2 = document.querySelector(".btn2");
console.log(btn2);
btn2.innerHTML=str;

// 渲染分頁畫面
// 依照目前點取到的分頁取得分頁的值



btn2.addEventListener("click",(e)=>{
  let pageNumber=0;
  let filterData =[];
  if(e.target.nodeName==="INPUT"){
    // console.log("點到按鈕了!");
    // console.log(e.target.value);
    pageNumber= parseInt(e.target.value);
    console.log(pageNumber);
  }
  // 用取得分頁的值計算起始得索引(開始第幾筆)
  let start= (pageNumber-1)*perPage;
    // 用取得分頁的值加上一頁呈現幾筆計算出終末的索引(結束第幾筆) 
    let end = start+perPage-1;
    console.log(start,end);
    // console.log(111,thisData);
 filterData= thisData.filter((item,index)=>{
      return start <=index & index <=end ;
    })
  console.log(filterData);
  
  // 串str用forEach渲染指定的分頁畫面資料(第幾筆到第幾筆) 
  
  let str="";
  filterData.forEach((item)=>{
    str+=`<li><div class="image"><img src="${item.Picture.PictureUrl1}" alt="沒有提供圖片" height="250px" width="300px" /></div><br>
    <h3>${item.Name.substring(0, 10)}</h3></li>`
  })
  
  const list = document.querySelector(".list");
  list.innerHTML=str;
});

}


function getAuthorizationHeader() {
//  填入自己 ID、KEY 開始
    let AppID = '80b5822486ee40eda16c71780e928267';
    let AppKey = 'IdBCh1m0DQYXcPldZxJfv01ODtQ';
//  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}