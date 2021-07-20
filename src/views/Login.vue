<template>
  <div>
    <div class="titleDiv">
      <h2>智能管家</h2>
    </div>
    <div class="chatlogoDiv">
      <img alt="Vue logo" src="../assets/chat.png">
    </div>
    <div class="inputDiv">
      <input v-model="username" type="text" placeholder="帳號" autofocus />
      <br />
      <input v-model="password" type="text" placeholder="密碼" />
      <br />
      <button id="login" @click="save" :disabled="isdisable">登入</button>
      <br />
      <button id="guest" @click="guest">訪客</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data:()=>({
    username: '',
    password: '',
    isdisable: true,
  }),

  methods: {
    save() {
      const that = this;
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      console.log("now save");
      this.axios.post("https://itriptaiwan.megatime.com.tw/string/CustMsgService/ValidByAdapter",
        {
            AppId: 'StringDemo_Web',
            Password: this.password,
            Phone: this.username,
        })
        .then(function (response) {
            console.log(response);
            localStorage.setItem('AppId','StringDemo_Web');
            localStorage.setItem('Guid',response.data.Guid);
            localStorage.setItem('Account',response.data.Phone);
            that.$router.push({ name: 'Logout'});
        })
        .catch(function (error) {
            console.log(error);
        });
      
    },
    guest() {
      // this.axios.post('	https://itriptaiwan.megatime.com.tw/string/CustMsgService/DeviceGetMsgList', {
      //       AppId: 'StringDemo_Web',
      //       Password: '1',
      //       Phone: '1',
      //   })
      //   .then(function (response) {
      //       console.log(response);
      //       localStorage.setItem('AppId','StringDemo_Web');
      //       localStorage.setItem('Member','test');
      //       localStorage.setItem('GuestAccount','test');
      //       localStorage.setItem('Guid',response.data.Guid);
            
      //   })
      //   .catch(function (error) {
      //       console.log(error);
      //   });
      this.$router.push({ name: 'Guest'});
    },
  },
  watch: {
    username:{
      immediate: false,
      handler() {
        if((this.username.length > 0 && this.password.length > 0)) {
          return this.isdisable = false;
        }else {
          return this.isdisable = true;
        }
      }
    },
    password:{
      immediate: false,
      handler() {
        if((this.username.length > 0 && this.password.length > 0)) {
          return this.isdisable = false;
        }else {
          return this.isdisable = true;
        }
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titleDiv {
  width: 65%;
  height: 80px;
  margin-left: 17.5%;
  box-shadow: 0px 0px 1em #887788;
}
.titleDiv h2 {
  padding-top: 20px;
}
.chatlogoDiv {
  width: 200px;
  height: 200px;
  margin-left: 43%;
  margin-top: 40px;
}
.chatlogoDiv img {
  max-height: 100%;  
  max-width: 100%; 
  width: auto;
  height: auto; 
}
.inputDiv {
  margin-top: 20px;
  text-align: center;
}
.inputDiv input{
  width: 60%;
  padding-top: 15px;
  font-size: 20px;
  margin-top: 10px;
}
#login {
  width: 60%;
  font-size: 20px;
  margin-top: 10px;
}
#guest {
  width: 60%;
  font-size: 20px;
  margin-top: 10px;
  background-color: #add8e6;
}
</style>