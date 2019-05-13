document.addEventListener("DOMContentLoaded", function() {
    location.href = 'SH://init';
});

var webData = {};
var appData = {};

//SH
var SH = {
    data : {
        web : {
            remove : function(name) {
                webData[name].remove();
                location.href = 'SH://data.web.remove?name=' + name;
            },
            clear : function() {
                webData.clear();
                location.href = 'SH://data.web.clear';
            }
        },
        web : function(name) {
            return webData[name];
        },
        web : function(name, value) {
            webData[name] = value;
            location.href = 'SH://data.web?name=' + name + '&value=' + value;
        },
        app : {
            remove : function(name) {
                appData[name].remove();
                location.href = 'SH://data.app.remove?name=' + name;
            },
            clear : function() {
                appData.clear();
                location.href = 'SH://data.app.clear';
            }
        },
        app : function(name) {
            return appData[name];
        },
        app : function(name, value) {
            appData[name] = value;
            location.href = 'SH://data.app?name=' + name + '&value=' + value;
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