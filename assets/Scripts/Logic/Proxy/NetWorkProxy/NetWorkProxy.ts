import { Pool,Node, NodePool } from "cc";
import { BaseProxy } from "../../../Frame/BaseProxy/BaseProxy";
export class NetWorkProxy extends BaseProxy{  
    static get ProxyName():string { return "NetWorkProxy" }; 
    private mGgateConfig:{} = {}; 
    public onLoad(): void {
        const pomelo = (window as any).pomelo; 
        pomelo.disconnect();
        pomelo.off("disconnect"); 
        this.mGgateConfig = {}; 
        return;
        pomelo.init({host: "127.0.0.1",port: 3014,log: true}, function() {
	        var route = 'gate.gateHandler.Login';
            pomelo.request(route, {
                account: "123456711aaQQQQQQQQQQQQQQQQQQQQQQQ",
                pass: "123456711aaQQQQQQQQQQQQQQQQQQQQQQQ" 
            }, function(data) {  
                pomelo.disconnect(); 
                if(data.err === 500) { 
                    console.log("连接错误"); 
                    return;
                }
                pomelo.init({
                    host: data.host,
                    port: data.port, 
                    log: true
                }, function() {
                    var route = "connector.entryHandler.enter";
                    pomelo.request(route, {
                        username: "123456711aaQQQQQQQQQQQQQQQQQQQQQQQ",  
                        rid: "5000" 
                    }, function(data: { error: any; }) {
                        if(data.error) {
                            console.log("加入房间错误"); 
                            return;
                        }
                        console.log("加入房间成功");
                        //setName();
                        //setRoom(); 
                        //showChat();
                        //initUserList(data);
                        
		                var route = "chat.chatHandler.send";
		                pomelo.request(route,{
		                	rid:"5000",  
		                	content:"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",
				            from:"123456711aaQQQQQQQQQQQQQQQQQQQQQQQ",
                            target:"*", 
		                	// lost field
		                },data=>{
		                	console.warn("!!?? ",data)
		                })
                    });
                });
                //callback(data.host, data.port);
                console.log("连接成功");
            });
        }); 
    }
     
    //Entry = function(gateConfig,uid,token,callback){
    //    if(!token||!uid){
    //        return ; 
    //    }
    //    this.init(gateConfig,uid,function(err){
    //        if(err){
    //            callback(err);
    //            return ;
    //        }
    //        var route = "connector.entryHandler.entry";
    //        pomelo.request(route, {
    //            token: token
    //        }, function(data) {
    //            if(data.code!=200){
    //                callback("连接服务失败！",null);
    //                return ;
    //            }
    //            callback(null,data); 
    //        });
    //    });
    //}
    //
    //PomeloRequest = function(route,parameter,callback,isLoading){
    //    pomelo.request(route,parameter, function(data) {
    //        callback(data);
    //    });
    //}  
} 
 
 