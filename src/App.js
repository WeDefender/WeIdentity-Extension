import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card1 from './_component/Card';
import RegisterContent from './_page/home'
import AuthContent from './_page/auth'
import HomeContent from './_page/home'




/*
fetch("http://127.0.0.1:7777/postContent", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  mode: "cors",
  body: JSON.stringify({
      content: "留言内容"
  })
}).then(function(res) {
  if (res.status === 200) {
      return res.json()
  } else {
      return Promise.reject(res.json())
  }
}).then(function(data) {
  console.log(data);
}).catch(function(err) {
  console.log(err);
});
*/
function App() {
  useEffect(() => {
    fetch("http://192.168.1.180:8080/user/createWeId", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        "name":"Sher123",
        "type": 0
      })
    }).then(function(res) {
      if (res.status === 200) {
          return res.json()
      } else {
          return Promise.reject(res.json())
      }
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
  });

  return (

    <BrowserRouter>
        <Layout>
          <Switch>

            {/* 主页展示 */}
            <Route path="/home" component={HomeContent}></Route>

            {/* 注册 */}
            <Route path="/register" component={RegisterContent}></Route>

            {/* 授权 */}
            <Route path="/auth" component={AuthContent}></Route>


          </Switch >
        </Layout>
      </BrowserRouter >
  );
}

export default App;
