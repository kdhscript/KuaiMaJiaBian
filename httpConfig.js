const remoteHost = '';
const config = {
    lunbo:'http://image.baidu.com/channel/listjson?pn=0&rn=30&tag1=%E7%BE%8E%E5%A5%B3&tag2=%E5%85%A8%E9%83%A8&ie=utf8', 
    newslist: remoteHost + '/api/getnewslist', 
    newsdetail: remoteHost + '/api/getnew/', 
    category: remoteHost + '/api/getimgcategory', 
    getimgs: remoteHost + '/api/getimages/', 
    getimageInfo: remoteHost + '/api/getimageInfo/', 
    getthumimages: remoteHost + '/api/getthumimages/', 
    getcomments: remoteHost + '/api/getcomments/', 
    postcomment: remoteHost + '/api/postcomment/', 
    getgoods: remoteHost + '/api/getgoods?pageindex=', 
    getinfo: remoteHost + '/api/goods/getinfo/', 
    getshopcart: remoteHost + '/api/goods/getshopcarlist/', 
}

//需要让外部拿到
export default config;
