## 安装

下载本项目

```
> git clone https://github.com/iammapping/wedding
```

到项目根目录初始化：`npm install`

安装 sails

```
> npm install sails -g
```

启动：`sails lift`，生产环境加上 `--prod` 参数。



## 配置

**配置微信公众号**

```javascript
> vi config/weixin.js
module.exports.weixin = {
  // 微信公众号相关设置
  appid: 'xxx',
  secret: 'xxx',
  // 微信公众号设置的回调地址
  redirectUri: 'http://xxx/home/resolve'
};
```

**配置数据库**

导入表结构

```
mysql> create database wedding;
mysql> source wedding.sql;
```

修改连接参数（使用 Sequelize 替代了 Sails 框架中默认的 Waterline）

```javascript
> vi config/connections.js
sequelizeServer: {
  user: 'xxx',
  password: 'xxx',
  database: 'wedding',
  options: {
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  host: '127.0.0.1',
  port: 3306,
  logging: true,
  timezone: "+08:00",
  }
}
```


**修改图片素材**

微信端在 `views/homepage.ejs` 中修改，公告也在此文件修改
```html
<img class="disable-tilt" src="/images/1-740.jpg" data-width="1500" data-height="1000" data-center-offset="740" />
...
```

* data-width：图片宽度
* data-height：图片高度
* data-center-offset：图片主体中线 x 轴位置




大屏端在 `assets/styles/wall.css` 中修改
```css
#slide1 {
  background-image: url(/images/1-740.jpg);
}
...
```

**修改背景音乐**

在 `assets/js/home.js` 中修改
```javascript
PM.bgm = new PM.BGM($('#bgm-audio'), {
  src: '/audios/pm_bgm2.mp3',
  autoplay: false
});
```


**修改地图位置**

在 `assets/js/pm.js` 中修改
```javascript
var map = new AMap.Map('pnl-map',{
  zoom: 17,
  center: [115.977634, 29.709759]
});
var marker = new AMap.Marker({
  position: map.getCenter()
});
marker.setMap(map);

// 设置label标签
marker.setLabel({
  offset: new AMap.Pixel(-75, -30),
  content: "PM Infinity婚礼于10月5日晚"
});
```

`center` 修改中心坐标，`content` 修改坐标说明的文字。

**修改婚礼日期**

在 `assets/js/home.js` 中修改

```javascript
var remainDays = Math.floor((new Date(2016, 9, 5) - new Date())/(24*3600*1000));
```

**彩蛋**

在链接中加上 `?state=present` 可以直接签到在现场，可用于婚礼现场扫码签到。
