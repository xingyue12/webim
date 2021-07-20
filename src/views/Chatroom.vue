<template>
  <div class="chatroom">
    <header class="chatroomTestIcon">
      <router-link to="/logout" id="leftIcon">
        <svg
          width="3em"
          height="3em"
          viewBox="0 0 16 16"
          class="bi bi-arrow-left-square-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.5 8.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"
          />
        </svg>
      </router-link>

      <span id="name"></span>

      <button id="rightIcon" @click="clean">
        <svg
          width="3em"
          height="3em"
          viewBox="0 0 16 16"
          class="bi bi-arrow-bar-right"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
          />
        </svg>
      </button>
    </header>

    <div id="noneDiv">
      <div id="Record" v-for="item in ContentTypeData" :key="item.id">
        <div v-if="item.me == item.sayphone">
          <div class="rightRecord" v-if="item.contenttype == '6'" v-html="item.content">
            <p></p>
          </div>

          <div class="rightRecord" v-else-if="item.contenttype == '0'">
            <p>{{ item.content }}</p>
          </div>

          <div class="rightRecord" v-else-if="item.contenttype == '1'">
            <img :src="item.content" id="image" width="200" />
          </div>

          <div class="rightDateTime">
            {{ item.datetime }}
          </div>

        </div>

        <div v-else-if="item.me != item.sayphone">
          <div class="leftRecord" v-if="item.contenttype == '6'">
            <p v-html="item.content"></p>
          </div>
          <div class="leftRecord" v-else-if="item.contenttype == '0'">
            <p>{{ item.content }}</p>
          </div>
          <div class="leftRecord" v-else-if="item.contenttype == '1'">
            <img :src="item.content" id="image" width="200" />
          </div>

          <div class="leftDateTime">
            {{ item.datetime }}
          </div>
        </div>
      </div>
    </div>

    <footer class="inputMessage">
      <input id="mes" v-model="message" type="text" placeholder="請輸入訊息" />
      <label class="inputFileLable">
        <input id="uploadFile" style="display: none" type="file" @change="handleFiles"/>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          class="bi bi-file-earmark"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
          />
          <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
        </svg>
      </label>
      <button class="btn btn-secondary" @click="send">送出</button>
    </footer>
  </div>
</template>

<style>
.chatroom {
  width: 100%;
  height: 100%;
}
.chatroomTestIcon {
  width: 50%;
  height: 55px;
  margin-left: 25%;
  -moz-box-shadow: inset -9px 8px 15px #000000;
  -webkit-box-shadow: inset -9px 8px 15px #000000;
  box-shadow: inset -9px 8px 15px #000000;
}
#leftIcon {
  float: left;
}
#rightIcon {
  float: right;
}
#noneDiv {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 600px;
  margin-left: 25%;
  overflow-y: scroll;
}
#Record {
  display: flex;
  width: 95%;
  flex-wrap: wrap;
  flex-direction: column;
}
.rightRecord {
  display: flex;
  margin: 5px;
  width: 100%;
  justify-content: flex-end;
  background-color: cornflowerblue;
}
.rightDateTime {
  display: flex;
  margin: 5px;
  width: 100%;
  justify-content: flex-end;
}
.leftRecord {
  display: flex;
  margin: 5px;
  width: 100%;
  justify-content: flex-start;
  background-color: greenyellow;
}
.leftDateTime {
  display: flex;
  margin: 5px;
  width: 100%;
  justify-content: flex-start;
}
.inputMessage {
  width: 50%;
  height: 60px;
  margin-left: 25%;
}
.inputMessage input {
  margin-top: 15px;
}
.inputFileLable {
  position: relative;
  display: inline-block;
}
.inputFileLable svg {
  position: absolute;
  right: 4px;
  transform: translateY(-50%);
}
</style>

<script>
export default {
  name: "Guest",
  data: () => ({
    message: "",
    ChatData: [],
    ContentTypeData: [],
    ChatsData: [],
    imgBase: "",
  }),
  
  methods: {
    clean() {
      const that = this;
      this.axios
        .post(
          "https:itriptaiwan.megatime.com.tw/string/CustMsgService/Logout",
          {
            AppId: "StringDemo_Web",
            Account: localStorage.getItem("Account"),
            Guid: localStorage.getItem("Guid"),
          }
        )
        .then(function (response) {
          console.log(response);
          localStorage.clear();
          that.$router.push({ name: "Login" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    send() {
      const that = this;

      var type;
      if ((that.message.indexOf("http") || that.message.indexOf("https")) != -1) {
        type = "6";
      } else {
        type = "0";
      }
      this.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/SendMsg",{
        Content: that.message,
        SayPhone: localStorage.getItem("Account"),
        ToPhone: localStorage.getItem("SayPhone"),
        Guid: localStorage.getItem("Guid"),
        ContentType: type,
      })
      .then(function (response) {
        var today = new Date();
        var currentDateTime = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() +
        " " + "PM" + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var i = response.data.Chats.length;

        var obj = {
          id: i,
          me: "",
          content: "",
          sayphone: "",
          datetime: "",
          contenttype: "",
        };
        obj.me = localStorage.Account;
        obj.content = that.message;
        obj.sayphone = localStorage.Account;
        obj.datetime = currentDateTime;
        obj.contenttype = type;
        for (let index = 0; index < that.ContentTypeData.length; index++) {
          const element = that.ContentTypeData.length;
          console.log(element);
          obj.id = element;
        }
        console.log(obj);
        if (obj.contenttype == "6") {
          obj.content = that.message.link(that.message);
        }
        that.ContentTypeData.push(obj);
        that.message = "";
        // file.outerHTML = file.outerHTML;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    handleFiles(files) {
      const that = this;
      var today = new Date();
      var currentDateTime = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() +
      " " + "PM" + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      let file;
      let reader;
      // var readerResult;
      file = files.target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        
        var readerResult = reader.result;
        // console.log(readerResult);

        that.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/SendMsg",{
          Content: readerResult,
          SayPhone: localStorage.getItem("Account"),
          ToPhone: localStorage.getItem("SayPhone"),
          Guid: localStorage.getItem("Guid"),
          // ContentType: "1",
          // Funkey: "png",
        })
        .then(function (response) {
          var obj = {
            id: that.ContentTypeData.length,
            me: localStorage.Account,
            content: reader.result,
            sayphone: localStorage.Account,
            datetime: currentDateTime,
            contenttype: "1",
          };
          
          that.ContentTypeData.push(obj);
          console.log(obj);
          window.onload = function(){
            var imgReader = document.getElementById('image');
            imgReader.src = readerResult;
          }
          console.log(response);
          console.log(that.ContentTypeData);
        })
        .catch(function (error) {
          console.log(error);
        });
        
      };
      
      // that.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/SendMsg",{
      //   Content: reader.result,
      //   SayPhone: localStorage.getItem("Account"),
      //   ToPhone: localStorage.getItem("SayPhone"),
      //   Guid: localStorage.getItem("Guid"),
      //   ContentType: "1",
      //   Funkey: "png",
      // })
      // .then(function (response) {
      //   var obj = {
      //     id: that.ContentTypeData.length,
      //     me: localStorage.Account,
      //     content: reader.result,
      //     sayphone: localStorage.Account,
      //     datetime: currentDateTime,
      //     contenttype: "1",
      //   };
        
      //   that.ContentTypeData.push(obj);
      //   console.log(obj);
      //   window.onload = function(){
      //     var imgReader = document.getElementById('image');
      //     imgReader.src = reader.result;
      //   }
      //   console.log(response);
      //   console.log(that.ContentTypeData);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    },
  },
  updated() {
    var objDiv = document.getElementById("noneDiv");
    objDiv.scrollTop = objDiv.scrollHeight;
  },
  mounted() {
    document.getElementById("name").innerText = localStorage.getItem("SayPhone");
    
    const CData = this;

    this.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/GetMsg",{
      Dir: -1,
      ChatID: localStorage.getItem("ChatID") + 3,
      ToPhone: localStorage.getItem("Account"),
      Guid: localStorage.getItem("Guid"),
      SayPhone: localStorage.getItem("SayPhone"),
    })
    .then(function (GetMsg) {

      CData.ChatData = GetMsg.data.Chats;

      var len = CData.ChatData.length;

      for (let index = 0; index < len; index++) {
        var obj = {
          id: index,
          me: "",
          content: "",
          sayphone: "",
          datetime: "",
          contenttype: "",
        };
        obj.me = localStorage.Account;
        obj.content = CData.ChatData[index].Content;
        obj.sayphone = CData.ChatData[index].SayPhone;
        obj.datetime = CData.ChatData[index].DataTime;
        if ((obj.content.indexOf("http") || obj.content.indexOf("https")) != -1) {
          obj.contenttype = "6";
          obj.content = obj.content.link(CData.ChatData[index].Content);
        } 
        else if (obj.content.indexOf("image") != -1) {
          obj.contenttype = "1";
        } 
        else {
          obj.contenttype = "0";
        }
        CData.ContentTypeData.push(obj);
      }
        // fetch("https://itriptaiwan.megatime.com.tw/string/CustMsgService/GetMsg")
        //   .then(response => response.json())
        //   .then(json => {
        //     CData.ContentTypeData = json.ContentTypeData;
        //  })
    })
    .catch(function (error) {
      console.log(error);
    });

    let websocket = new WebSocket("wss://itriptaiwan.megatime.com.tw/string/SocketHandler/AppHandler.ashx");
    websocket.onopen = function (evt) {
      onOpen(evt);
    };
    websocket.onclose = function (evt) {
      onClose(evt);
    };
    websocket.onmessage = function (evt) {
      onMessage(evt);
    };
    websocket.onerror = function (evt) {
      onError(evt);
    };
    // 完成連線
    function onOpen(evt) {
      console.log("ws::open : connection established connected", evt);
      writeToScreen("CONNECTED");
      var inArg = {
        Account: localStorage.getItem("Account"),
        Guid: localStorage.getItem("Guid"),
        AppId: "StringDemo_Web",
      };
      doSend(buildRequest("ValidGuid", inArg));
    }
    // 建立 request 字串
    function buildRequest(methodName, inArg) {
      var inPack = {
        Method: methodName,
        Request: JSON.stringify(inArg),
      };
      return JSON.stringify(inPack);
    }
    // 關閉連線
    function onClose(evt) {
      writeToScreen("DISCONNECTED");
      console.log(evt);
    }
    // 接收到訊息
    function onMessage(evt) {
      //當自己在聯絡人介面時，若有人傳訊息給你，則會顯示未讀標示
      var objEve = JSON.parse(evt.data);

      var res = JSON.parse(objEve.Response);

      var Account = res.Account;

      var viaAccount;
      var Alert;

      if (Account == localStorage.Account) {
        console.log(res);
        viaAccount = res.viaAccount;
        Alert = res.Alert;

        CData.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/GetMsg",{
          Dir: -1,
          ChatID: localStorage.getItem("ChatID") + 3,
          ToPhone: localStorage.getItem("Account"),
          Guid: localStorage.getItem("Guid"),
          SayPhone: localStorage.getItem("SayPhone"),
        })
        .then(function (response) {
          console.log(response);
          var obj = {
            me: "",
            content: "",
            sayphone: "",
            datetime: "",
          };
          obj.me = localStorage.Account;
          obj.content = Alert;
          obj.sayphone = viaAccount;
          obj.datetime = response.data.Chats[response.data.Chats.length - 1].DataTime;
          CData.ContentTypeData.push(obj);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
    // 發生錯誤
    function onError(evt) {
      writeToScreen("ERROR: " + evt.data);
    }
    // 傳送資料給 server
    function doSend(message) {
      websocket.send(message);
    }
    // 將資料顯示在畫面上
    function writeToScreen(msg) {
      console.log(msg);
    }

    CData.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/GetMsg",{
      Dir: -1,
      ChatID: localStorage.getItem("ChatID") + 3,
      ToPhone: localStorage.getItem("Account"),
      Guid: localStorage.getItem("Guid"),
      // MaxCount: 20,
      SayPhone: localStorage.getItem("SayPhone"),
    })
    .then(function (response) {
      let Chats = response.data.Chats;
      // console.log(response);
      let func = function () {
        var indexof;
        for (let index = 0; index < CData.ContentTypeData.length; index++) {
          indexof = CData.ContentTypeData[index].datetime.indexOf("已讀");
          if (indexof == -1 && Chats[index].ReadCount > 0 && Chats[index].SayPhone == localStorage.getItem("Account")) {
            CData.ContentTypeData[index].datetime = "已讀" + CData.ContentTypeData[index].datetime;
          }
        }
        // for (let i = Chats.length; i >= 0; i--) {
        //  if (Chats[i - 1].ReadCount > 0 && (Chats[i - 1].SayPhone == localStorage.getItem("Account"))) {
        //   for (let index = 0;index < CData.ContentTypeData.length;index++) {
        //     let indexof = CData.ContentTypeData[index].datetime.indexOf("已讀");

        //     if ((CData.ContentTypeData[index].me == CData.ContentTypeData[index].sayphone) && indexof == -1) {
        //       CData.ContentTypeData[index].datetime = "已讀" + CData.ContentTypeData[index].datetime;
        //     }
        //   }
        // }
        // else {
        //   i = i-1;
        //   console.log(i);
        // }
        //}
      };
      setInterval(func, 1000);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
};
</script>