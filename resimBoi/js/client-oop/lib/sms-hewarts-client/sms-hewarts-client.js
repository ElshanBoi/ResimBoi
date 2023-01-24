class smsHEWarts{


    constructor(open,close) {

        this._host ='sms-hewarts.herokuapp.com/';
        this._SOCKET = io.connect(`http://${this._host}`);
        
        this.Open(open);
        this.Close(close);
        

    }


    Open(func){

        this._SOCKET.on('conn', (data) => {

                //qosulma
               func.call(this,data);
            
            });

    }
    
    
    Close=(func)=>{

        this._SOCKET.on('disconn', (data) => {

                //cixis
                func(data);

            });

    }
    
    Message(func){

        this._SOCKET.on('sms', (data) => {

                //control
            func(data);

            });



    }

    sendSMS(data){
        
        this._SOCKET.emit('sms', data);
        
    }

}
