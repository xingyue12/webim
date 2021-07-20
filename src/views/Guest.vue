<template>
<div class="guest">
    <div class="guestTestIcon">
        <router-link to="/logout" id="leftIcon">
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-left-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.5 8.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"/>
            </svg>
        </router-link>
         test
        <router-link to="/login" id="rightIcon">
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
            </svg>
        </router-link>
    </div>
    <div class="noneDiv"></div>
    <div class="inputMessage">
        <input v-model="message" type="text" placeholder="請輸入訊息"/>
        <label class="inputFileLable">
            <input id="uploadFile" style="display:none;" type="file"/>
            <svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-file-earmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
            </svg>
        </label>
        <button class="btn btn-secondary">送出</button>
    </div> 
</div>
</template>

<style>
.guest{
    width: 100%;
    height: 100%;
}
.guestTestIcon{
    width: 50%;
    height: 55px;
    margin-left: 25%;
    -moz-box-shadow:inset -9px 8px 15px #000000;
    -webkit-box-shadow:inset -9px 8px 15px #000000;
    box-shadow:inset -9px 8px 15px #000000;
}
#leftIcon{
    float: left;
}
#rightIcon{
    float: right;
}
.noneDiv{
    width: 100%;
    height:400px;
}
.inputMessage{
    width: 50%;
    height: 60px;
    margin-left: 25%;
    background-color: #e7faf2;
}
.inputMessage input{
    margin-top: 15px;
}
.inputFileLable{
    position: relative;
    display:inline-block;
}
.inputFileLable svg{
    position: absolute;
    right: 4px;
    transform: translateY(-50%);
}
</style>

<script>
export default {
  name: "Guest",
  data:()=>({
      message:'',
  }),

  methods: {
  },
};
</script>