
//施設名
var input_message = document.getElementById("input_message_name");
//都道府県
var pref_select = document.getElementById("pref_select");
//市町村
var prefName_select = document.getElementById("prefName");
//種別
var facility_select = document.getElementById("facility_select");
//状態
var ansType = document.getElementById("ansType");

//結果テキスト
var resulttext = document.getElementById("resulttext");
//リクエスト中フラグ
var isRecest = false;
//ローディング画面
var loader = document.getElementById("loader");

window.onload = function(){
    loader.style.display ="none";
    readJson();
}

pref_select.onchange = event => { 
  getCitySearch(pref_select.value);
}

/*
*都道府県データ読み込み
*/
function readJson(){
  for(var i = 0; i < preJson.length; i++) {
    // optionタグを作成する
    var option = document.createElement("option");
    option.text = preJson[i].prefName;
    option.value = preJson[i].prefName;
    // selectタグの子要素にoptionタグを追加する
    pref_select.appendChild(option);
  }
}

/*
*市町村情報の取得
*/
async function getCitySearch(prefName){
  
    //要素を一度削除
    while(prefName_select.lastChild)
    {
        prefName_select.removeChild(prefName_select.lastChild);
    }

    // optionタグを作成する
    var option = document.createElement("option");
    option.text = "選択しない";
    option.value = "";
    // selectタグの子要素にoptionタグを追加する
    prefName_select.appendChild(option);

    if(prefName == "")return;
      
    //N0取得
    var preno;
    for(var i = 0; i < preJson.length ;i++){
        if(preJson[i].prefName == prefName){
            preno = preJson[i].prefCode;
        }
    }

    var url = "https://www.land.mlit.go.jp/webland/api/CitySearch?area=";
    fetch(url +( '00' + preno ).slice( -2 ))
    .then(function (data) {
        return data.json(); // 読み込むデータをJSONに設定
    })
    .then(function (json) {
        for (var i = 0; i < json.data.length; i++) {
            var Name = json.data[i].name;
            // optionタグを作成する
            var option = document.createElement("option");
            option.text = Name;
            option.value = Name;
            // selectタグの子要素にoptionタグを追加する
            prefName_select.appendChild(option);
        }
    });
}

/*
*施設情報の取得
*/
async function getDailySurvey(){
    
    //すでにリクエストを投げている場合
    if(isRecest){
        alert("現在リクエスト中です。");
        return;
    }

    //要素を一度削除
    var table = document.getElementById('hospital-list');
    while( table.rows[0] ) table.deleteRow(0);
    resulttext.innerHTML = "";


    const params = { // 渡したいパラメータをJSON形式で書く
        facilityName: input_message.value,
        prefName: pref_select.value,
        cityName: prefName.value,
        facilityType: facility_select.value,
        ansType: ansType.value
    };

    const query_params = new URLSearchParams(params); 
    var url = "https://サーバドメイン/hospital";
    isRecest = true;
    loader.style.display ="block";
    fetch(url + "?" + query_params )
    .then(function (data) {
            return data.json(); // 読み込むデータをJSONに設定
    })
    .then(function (json) {
        if(json.length != 0){
            for (var i = 0; i < json.length; i++) {
                var facilityName = json[i].facilityName;
                var prefName = json[i].prefName;
                var cityName = json[i].cityName;
                var facilityType = json[i].facilityType;
                var ansType = json[i].ansType;
    
                var row = document.getElementById('hospital-list').insertRow();
                row.insertCell().textContent = facilityName;
                row.insertCell().textContent = prefName;
                row.insertCell().textContent = cityName;
                row.insertCell().textContent = ansType;
                row.insertCell().textContent = facilityType;
            }
        }else{
            resulttext.innerHTML = "条件と一致する医療機関は見つかりませんでした。<br>条件を変えて再度実行してください。";
        }
        isRecest = false;
        loader.style.display ="none";
    });
}

//都道府県データ
let preJson = [
  {
      "prefCode": 1,
      "prefName": "北海道"
  }, {
      "prefCode": 2,
      "prefName": "青森県"
  }, {
      "prefCode": 3,
      "prefName": "岩手県"
  }, {
      "prefCode": 4,
      "prefName": "宮城県"
  }, {
      "prefCode": 5,
      "prefName": "秋田県"
  }, {
      "prefCode": 6,
      "prefName": "山形県"
  }, {
      "prefCode": 7,
      "prefName": "福島県"
  }, {
      "prefCode": 8,
      "prefName": "茨城県"
  }, {
      "prefCode": 9,
      "prefName": "栃木県"
  }, {
      "prefCode": 10,
      "prefName": "群馬県"
  }, {
      "prefCode": 11,
      "prefName": "埼玉県"
  }, {
      "prefCode": 12,
      "prefName": "千葉県"
  }, {
      "prefCode": 13,
      "prefName": "東京都"
  }, {
      "prefCode": 14,
      "prefName": "神奈川県"
  }, {
      "prefCode": 15,
      "prefName": "新潟県"
  }, {
      "prefCode": 16,
      "prefName": "富山県"
  }, {
      "prefCode": 17,
      "prefName": "石川県"
  }, {
      "prefCode": 18,
      "prefName": "福井県"
  }, {
      "prefCode": 19,
      "prefName": "山梨県"
  }, {
      "prefCode": 20,
      "prefName": "長野県"
  }, {
      "prefCode": 21,
      "prefName": "岐阜県"
  }, {
      "prefCode": 22,
      "prefName": "静岡県"
  }, {
      "prefCode": 23,
      "prefName": "愛知県"
  }, {
      "prefCode": 24,
      "prefName": "三重県"
  }, {
      "prefCode": 25,
      "prefName": "滋賀県"
  }, {
      "prefCode": 26,
      "prefName": "京都府"
  }, {
      "prefCode": 27,
      "prefName": "大阪府"
  }, {
      "prefCode": 28,
      "prefName": "兵庫県"
  }, {
      "prefCode": 29,
      "prefName": "奈良県"
  }, {
      "prefCode": 30,
      "prefName": "和歌山県"
  }, {
      "prefCode": 31,
      "prefName": "鳥取県"
  }, {
      "prefCode": 32,
      "prefName": "島根県"
  }, {
      "prefCode": 33,
      "prefName": "岡山県"
  }, {
      "prefCode": 34,
      "prefName": "広島県"
  }, {
      "prefCode": 35,
      "prefName": "山口県"
  }, {
      "prefCode": 36,
      "prefName": "徳島県"
  }, {
      "prefCode": 37,
      "prefName": "香川県"
  }, {
      "prefCode": 38,
      "prefName": "愛媛県"
  }, {
      "prefCode": 39,
      "prefName": "高知県"
  }, {
      "prefCode": 40,
      "prefName": "福岡県"
  }, {
      "prefCode": 41,
      "prefName": "佐賀県"
  }, {
      "prefCode": 42,
      "prefName": "長崎県"
  }, {
      "prefCode": 43,
      "prefName": "熊本県"
  }, {
      "prefCode": 44,
      "prefName": "大分県"
  }, {
      "prefCode": 45,
      "prefName": "宮崎県"
  }, {
      "prefCode": 46,
      "prefName": "鹿児島県"
  }, {
      "prefCode": 47,
      "prefName": "沖縄県"
  }];