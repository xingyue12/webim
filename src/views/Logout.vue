<template>
  <div class="logout">
    <div class="Contactperson">
      <span>聯絡人</span>
      <button id="rightIcon" @click="clean">
        <svg
          width="2em"
          height="2em"
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
    </div>

    <div class="person" @click="hello">
      <span id="name"></span>
    </div>
    <table border="1" id="personTable" v-for="(item,key) in BuddyData" :key="item.SayPhone">
      <tr>
        <td @click="hello(key)">{{item.SayPhone}}</td>
      </tr>
    </table>
  </div>
</template>

<style>
.logout {
  width: 100%;
  height: 550px;
}
.Contactperson {
  width: 50%;
  height: 40px;
  margin-left: 25%;
  -moz-box-shadow: inset -9px 8px 15px #000000;
  -webkit-box-shadow: inset -9px 8px 15px #000000;
  box-shadow: inset -9px 8px 15px #000000;
}
.Contactperson span{
  margin-left: 6%;
}
#rightIcon {
  float: right;
  background-color: #ffffff;
}
#personTable{
  width: 50%;
  margin-left: 25%;
  display: flex;
  justify-content: center;
}
</style>
<script>
export default {
  name: "Logout",
  data: () => ({
    BuddyData: []
  }),

  methods: {
    clean() {
      const that = this;
      this.axios.post("https:itriptaiwan.megatime.com.tw/string/CustMsgService/Logout",
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
    hello(key) {
      const that = this;
      console.log(key);
      this.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/GetNewMsgBuddy",
        {
          AppId: "StringDemo_Web",
          Phone: localStorage.getItem("Account"),
          Guid: localStorage.getItem("Guid"),
        }
      )
      .then(function (GetMsgBuddyData) {
        console.log(GetMsgBuddyData);
        localStorage.setItem('ChatID',GetMsgBuddyData.data.ChatBuddys[key].LatestChatId);
        localStorage.setItem('SayPhone',GetMsgBuddyData.data.ChatBuddys[key].SayPhone);
        that.$router.push({ name: "Chatroom" });
      })
      .catch(function (error) {
        console.log(error);
      });
      
    },
  },
  
  mounted() {
    document.getElementById("name").innerText = localStorage.getItem("Account");

    const BData = this;
    console.log("now chat");
    this.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/GetNewMsgBuddy",
        {
          AppId: "StringDemo_Web",
          Phone: localStorage.getItem("Account"),
          Guid: localStorage.getItem("Guid"),
        }
      )
      .then(function (GetMsgBuddyData) {
        console.log(GetMsgBuddyData);
        BData.BuddyData = GetMsgBuddyData.data.ChatBuddys;
        console.log(GetMsgBuddyData.data.ChatBuddys);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>