const keyword = document.querySelector('.keyword');
const send = document.querySelector('.send');
const list = document.querySelector('.list');
send.addEventListener('click',function(e){
  const keywordTxt = keyword.value; 
  axios.get(
   `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(Name,'${keywordTxt}')&$format=JSON`,
   {
      headers: getAuthorizationHeader()
   }
  )
  .then(function (response) {
    const thisData = response.data;
    let str="";
    thisData.forEach(item=>{
      console.log(item)
      str+=`<li><img src="${item.Picture.PictureUrl1}" alt="api沒有提供圖片" height="250px" width="300px" /><br>
      <h3>${item.Name.substring(0, 10)}</h3></li>`;
    })
    list.innerHTML = str;
  })
  .catch(function (error) {
    console.log(error);
  }); 
})




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