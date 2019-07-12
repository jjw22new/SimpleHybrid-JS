var webData = {};
var appData = {};

document.addEventListener("DOMContentLoaded", function() {
    shInit();
});

function shInit() {
    //webData Sync
    webData = localStorage.getItem("webData");

    //appData Sync
    if(SH.deviceType() == "AndroidApp") {
        SHAndroid.init(name);
    } else if(SH.deviceType() == "iOSApp") {
        webkit.messageHanlders.SHiOSInit.postMessage(name);
    }
}

function shInitCallBack(appData) {
    appData = JSON.parse(appData);
}

//SH
var SH = {
    data : {
        web : {
            remove : function(name) {
                webData[name].remove();
                localStorage.setItem("webData", webData);
            },
            clear : function() {
                webData.clear();
                localStorage.setItem("webData", webData);
            }
        },
        web : function(name) {
            return webData[name];
        },
        web : function(name, value) {
            webData[name] = value;
            localStorage.setItem("webData", webData);
        },
        app : {
            remove : function(name) {
                if(SH.deviceType() == "AndroidApp" || SH.deviceType() == "iOSApp") {
                    appData[name].remove();

                    if(SH.deviceType() == "AndroidApp") {
                        SHAndroid.appDataToApp(JSON.stringify(appData));
                    } else if(SH.deviceType() == "iOSApp") {
                        webkit.messageHanlders.appDataToApp.postMessage(JSON.stringify(appData));
                    }
                } else {
                    console.log("This is not app, SH.app.remove() function is ignored")
                }
            },
            clear : function() {
                if(SH.deviceType() == "AndroidApp" || SH.deviceType() == "iOSApp") {
                    appData.clear();

                    if(SH.deviceType() == "AndroidApp") {
                        SHAndroid.appDataToApp(JSON.stringify(appData));
                    } else if(SH.deviceType() == "iOSApp") {
                        webkit.messageHanlders.appDataToApp.postMessage(JSON.stringify(appData));
                    }
                } else {
                    console.log("This is not app, SH.app.clear() function is ignored");
                }
            }
        },
        app : function(name) {
            if(SH.deviceType() == "AndroidApp" || SH.deviceType() == "iOSApp") {
                return appData[name];
            } else {
                console.log("This is not app, SH.app() function is ignored");
            }
        },
        app : function(name, value) {
            if(SH.deviceType() == "AndroidApp" || SH.deviceType() == "iOSApp") {
                appData[name] = value;
                
                if(SH.deviceType() == "AndroidApp") {
                    SHAndroid.appDataToApp(JSON.stringify(appData));
                } else if(SH.deviceType() == "iOSApp") {
                    webkit.messageHanlders.appDataToApp.postMessage(JSON.stringify(appData));
                }
            } else {
                console.log("This is not app, SH.app() function is ignored");
            }
        }
    },

    deviceType : function() {
        var agent = navigator.userAgent.toLowerCase();
	
        var type = "PCWeb";
        var mobileWebTxts = [
                "android","phone",
                "iphone","ipad","ipod",
                "blackberry",
                "opera mini","opera mobi",
                "windows ce","iemobile",
                "nokia", "webos",
                "sonyericsson",
                ];
        
        if(agent.indexOf('SimpleHybrid') != -1){
            if(agent.indexOf('android') != -1) {
                type = "AndroidApp";
            } else if((agent.indexOf('iphone') != -1) || (agent.indexOf('ipad') != -1) || (agent.indexOf('ipod') != -1)) {
                type = "iOSApp";
            }
        } else {
            if(agent.indexOf('android') != -1) {
                return "AndroidWeb";
            } else if((agent.indexOf('iphone') != -1) || (agent.indexOf('ipad') != -1) || (agent.indexOf('ipod') != -1)) {
                return "iOSWeb";
            } else {
                for (var i = 0; i < mobileWebTxts.length; i++){
                    var result = agent.indexOf(mobileWebTxts[i]);
                    if(result != -1){
                        type ='MobileWeb';
                        break;
                    }
                }
            }
        }
        return type;
    }
}