var SH = {
    Data = {
        View : function(name) {
            location.href = "SH://data.view?name=" + name;
        },
        View : function(name, data) {
            location.href = "SH://data.view?name=" + name + "&data=" + data;
        },
        All : function(name) {
            location.href = "SH://data.all?name=" + name;
        },
        All : function(name, data) {
            location.href = "SH://data.all?name=" + name + "&data=" + data;
        },
        Device : function(name) {
            location.href = "SH://data.device?name=" + name;
        },
        Device : function(name, data) {
            location.href = "SH://data.device?name=" + name + "&data=" + data;
        }
    },
    
    /*
    Run : function(viewName) {
        location.href = "SH://run?viewName=" + viewName;
    },
    Run : function(viewName, param) {
        location.href = "SH://run?viewName=" + viewName + "&param=" + param;
    }
    */

    DeviceType : function() {
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