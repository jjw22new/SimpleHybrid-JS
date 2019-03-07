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
    
    Run : function(viewName) {
        location.href = "SH://run?viewName=" + viewName;
    },
    Run : function(viewName, param) {
        location.href = "SH://run?viewName=" + viewName + "&param=" + param;
    }
}