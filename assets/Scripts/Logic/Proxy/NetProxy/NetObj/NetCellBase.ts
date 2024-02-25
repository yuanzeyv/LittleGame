// export class NetCellBase{
//     protected m_WebSocket:WebSocket;//这是一个socket对象
//     constructor(socket:WebSocket){
//         this.m_WebSocket = socket; 
//         this.m_WebSocket.onopen = this.OpenHandle.bind(this);
//         this.m_WebSocket.onclose = this.CloseHandle.bind(this);
//         this.m_WebSocket.onmessage = this.MessageHandle.bind(this);
//         this.m_WebSocket.onerror = this.ErrorHandle.bind(this); 
//     } 
//     OpenHandle(ev: Event){

//     }
//     CloseHandle(ev: CloseEvent){

//     }
//     ErrorHandle(ev: Event){

//     }
//     MessageHandle( ev: MessageEvent<any>){

//     }
//     Send(obj:Object){  
//         let data:string = JSON.stringify(obj);//获取到当前的字符串
//         this.m_WebSocket.send(data);
//     }
// }