import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react';
import logo from './logo.svg';
import Card1 from './_component/Card';
import {HomeContent} from './_page/home'
import {AuthContent} from './_page/auth'
import {RegisterContent} from './_page/register'
import {Layout} from './_page/layout'
import {VerifyContent} from './_page/verify'

function App() {  
  return (
    <BrowserRouter>
      <Layout>
          <Switch>
            {/* 主页展示 */}
            <Route path="/home" component={HomeContent}></Route>
            {/* 注册 */}
            <Route path="/register" component={RegisterContent}></Route>
            {/* 输入身份信息 申请核验 */}
            <Route path="/verify" component={VerifyContent}></Route>
            {/* 授权 */}
            <Route path="/auth" component={AuthContent}></Route>
            
          </Switch >
      </Layout>
    </BrowserRouter >
  );
}

export default App;
