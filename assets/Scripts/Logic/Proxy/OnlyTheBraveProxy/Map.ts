export let Map_1 = {
    Main:{ID:1,Type:1,Rotate:0,Position:{x:-  0,y:   0},Relevance:"Main"},
    Attrs:{
        "Normal":[[0,100],[30,50],[33,50],[48,999999],[51,50]],
        "Else":[[0,100],[30,5],[33,50],[48,999],[51,50]],
    },  
    Object:{ 
        Main:{
            "Wall"  :{ID:1,Type:1,BodyID:0,Rotate:0,Position:{x:-  0,y:   0},Relevance:"Wall"},//游戏 墙体描述
            "Monster":{ID:1,Type:1,BodyID:0,Rotate:0,Position:{x:-  0,y: 0},Relevance:"Monster"},//游戏墙体描述
            "Judge":{ID:3,Type:1,BodyID:0,Rotate:0,Position:{x:-  0,y:   0},Relevance:"Judge",Param:"Select"},//游戏墙体描述
            
            "MainPlayer":{ID:3,Type:0,BodyID:4,Rotate:0  ,Position:{x:-  10.5,y:   0},Attr:"Normal"},//左墙
            "Camera":{ID:4,Type:0,BodyID:6,Colliders:[5],Rotate:0,Position:{x: 0,y:   0},Attr:"Normal"},//左墙
        }, 
        Wall:{//用于描 述游戏的外墙 
            [ 1]:{ID:1,Type:0,BodyID:1,Rotate:0  ,Position:{x:-  10.5,y:   0},Attr:"Normal"},//左墙
            [ 2]:{ID:1,Type:0,BodyID:1,Rotate:0  ,Position:{x:   10.5,y:   0},Attr:"Normal"},//右墙 
            [ 3]:{ID:1,Type:0,BodyID:1020,Rotate:90 ,Position:{x:   0 ,y: 250},Attr:"Normal"},//上墙   
            [ 4]:{ID:1,Type:0,BodyID:1020,Rotate:90 ,Position:{x:   0 ,y:-250},Attr:"Normal"},//下墙    
            
            
            [ 5]:{ID:1,Type:0,BodyID:1010,Rotate: 90,Position:{x:   0 ,y:-240},Attr:"Normal"},//下墙   
            [ 6]:{ID:1,Type:0,BodyID:1005,Rotate: 90,Position:{x:   0 ,y:-235},Attr:"Normal"},//下墙   
            [ 7]:{ID:1,Type:0,BodyID:1010,Rotate: 90,Position:{x:   0 ,y:-230},Attr:"Normal"},//下墙   
            [ 8]:{ID:1,Type:0,BodyID:1011,Rotate: 90,Position:{x:   0 ,y:-225},Attr:"Normal"},//下墙   
            [ 9]:{ID:1,Type:0,BodyID:1012,Rotate: 90,Position:{x:   0 ,y:-220},Attr:"Normal"},//下墙   
            [10]:{ID:1,Type:0,BodyID:1013,Rotate: 90,Position:{x:   0 ,y:-215},Attr:"Normal"},//下墙   
            [11]:{ID:1,Type:0,BodyID:1014,Rotate: 90,Position:{x:   0 ,y:-210},Attr:"Normal"},//下墙   
            [12]:{ID:1,Type:0,BodyID:1015,Rotate: 90,Position:{x:   0 ,y:-205},Attr:"Normal"},//下墙   
            [13]:{ID:1,Type:0,BodyID:1016,Rotate: 90,Position:{x:   0 ,y:-200},Attr:"Normal"},//下墙   
            [14]:{ID:1,Type:0,BodyID:1002,Rotate: 90,Position:{x:   0 ,y:-190},Attr:"Normal"},//下墙   
            [15]:{ID:1,Type:0,BodyID:1004,Rotate: 90,Position:{x:   0 ,y:-185},Attr:"Normal"},//下墙   
            [16]:{ID:1,Type:0,BodyID:1007,Rotate: 90,Position:{x:   0 ,y:-175},Attr:"Normal"},//下墙   
            [17]:{ID:1,Type:0,BodyID:1009,Rotate: 90,Position:{x:   0 ,y:-165},Attr:"Normal"},//下墙   
            [18]:{ID:1,Type:0,BodyID:1011,Rotate: 90,Position:{x:   0 ,y:-155},Attr:"Normal"},//下墙   
            [19]:{ID:1,Type:0,BodyID:1013,Rotate: 90,Position:{x:   0 ,y:-135},Attr:"Normal"},//下墙   
            [20]:{ID:1,Type:0,BodyID:1004,Rotate: 90,Position:{x:   0 ,y:-115},Attr:"Normal"},//下墙   
            [21]:{ID:1,Type:0,BodyID:1016,Rotate: 90,Position:{x:   0 ,y:-100},Attr:"Normal"},//下墙   
            [22]:{ID:1,Type:0,BodyID:1014,Rotate: 90,Position:{x:   0 ,y:- 95},Attr:"Normal"},//下墙   
            [23]:{ID:1,Type:0,BodyID:1012,Rotate: 90,Position:{x:   0 ,y:- 90},Attr:"Normal"},//下墙   
            [24]:{ID:1,Type:0,BodyID:1014,Rotate: 90,Position:{x:   0 ,y:- 80},Attr:"Normal"},//下墙   
            [25]:{ID:1,Type:0,BodyID:1012,Rotate: 90,Position:{x:   0 ,y:- 73},Attr:"Normal"},//下墙   
            [26]:{ID:1,Type:0,BodyID:1014,Rotate: 90,Position:{x:   0 ,y:- 52},Attr:"Normal"},//下墙   
            [27]:{ID:1,Type:0,BodyID:1012,Rotate: 90,Position:{x:   0 ,y:- 31},Attr:"Normal"},//下墙   
            [28]:{ID:1,Type:0,BodyID:1010,Rotate: 90,Position:{x:   0 ,y:- 11},Attr:"Normal"},//下墙   
            [29]:{ID:1,Type:0,BodyID:1009,Rotate: 90,Position:{x:   0 ,y:-  0},Attr:"Normal"},//下墙   
            [30]:{ID:1,Type:0,BodyID:1008,Rotate: 90,Position:{x:   0 ,y:  15},Attr:"Normal"},//下墙    
            [31]:{ID:1,Type:0,BodyID:1007,Rotate: 90,Position:{x:   0 ,y:  20},Attr:"Normal"},//下墙    
            [32]:{ID:1,Type:0,BodyID:1006,Rotate: 90,Position:{x:   0 ,y:  25},Attr:"Normal"},//下墙    
            [33]:{ID:1,Type:0,BodyID:1005,Rotate: 90,Position:{x:   0 ,y:  30},Attr:"Normal"},//下墙    
            [34]:{ID:1,Type:0,BodyID:1004,Rotate: 90,Position:{x:   0 ,y:  35},Attr:"Normal"},//下墙    
            [35]:{ID:1,Type:0,BodyID:1003,Rotate: 90,Position:{x:   0 ,y:  40},Attr:"Normal"},//下墙    
            [36]:{ID:1,Type:0,BodyID:1002,Rotate: 90,Position:{x:   0 ,y:  80},Attr:"Normal"},//下墙    
            [37]:{ID:1,Type:0,BodyID:1005,Rotate: 90,Position:{x:   0 ,y:  90},Attr:"Normal"},//下墙    
            [38]:{ID:1,Type:0,BodyID:1007,Rotate: 90,Position:{x:   0 ,y: 120},Attr:"Normal"},//下墙    
            [39]:{ID:1,Type:0,BodyID:1009,Rotate: 90,Position:{x:   0 ,y: 150},Attr:"Normal"},//下墙    
            [40]:{ID:1,Type:0,BodyID:1011,Rotate: 90,Position:{x:   0 ,y: 152},Attr:"Normal"},//下墙    
            [41]:{ID:1,Type:0,BodyID:1012,Rotate: 90,Position:{x:   0 ,y: 185},Attr:"Normal"},//下墙    
            [42]:{ID:1,Type:0,BodyID:1013,Rotate: 90,Position:{x:   0 ,y: 213},Attr:"Normal"},//下墙    
            [43]:{ID:1,Type:0,BodyID:1014,Rotate: 90,Position:{x:   0 ,y: 227},Attr:"Normal"},//下墙    
            [44]:{ID:1,Type:0,BodyID:1015,Rotate: 90,Position:{x:   0 ,y: 240},Attr:"Normal"},//下墙    
            [45]:{ID:1,Type:0,BodyID:1016,Rotate: 90,Position:{x:   0 ,y: 248},Attr:"Normal"},//下墙     
        },  
        Judge:{
            [32]:{ID:6,Type:0,BodyID:100002,Rotate:30 ,Position:{x:   0 ,y:0},Attr:"Normal"},//下墙 
        }, 
        Select:{  
        },  
        Monster:{//用于描 述游戏的外墙 
            [32]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y:54},Colliders:[5],Attr:"Else"},//下墙 
            [33]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 0},Colliders:[5],Attr:"Else"},//下墙 
            [34]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 2},Colliders:[5],Attr:"Else"},//下墙 
            [35]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 4},Colliders:[5],Attr:"Else"},//下墙  
            [36]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 6},Colliders:[5],Attr:"Else"},//下墙 
            [37]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y:54},Colliders:[5],Attr:"Else"},//下墙 
            [38]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 0},Colliders:[5],Attr:"Else"},//下墙 
            [39]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 2},Colliders:[5],Attr:"Else"},//下墙 
            [40]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 4},Colliders:[5],Attr:"Else"},//下墙 
            [41]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 6},Colliders:[5],Attr:"Else"},//下墙 
            [42]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y:54},Colliders:[5],Attr:"Else"},//下墙 
            [43]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 0},Colliders:[5],Attr:"Else"},//下墙 
            [44]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 2},Colliders:[5],Attr:"Else"},//下墙 
            [45]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 4},Colliders:[5],Attr:"Else"},//下墙 
            [46]:{ID:6,Type:0,BodyID:8,Rotate:30 ,Position:{x:   0 ,y: 6},Colliders:[5],Attr:"Else"},//下墙 
            //"AAAAAAA":{ID:2,Type:1,BodyID:0,Rotate:0,Position:{x:-  0,y: 200},Param:"AAAAAAA"},//游戏墙体描述
        },  
        AAAAAAA:{//用于描 述游戏的外墙 
            [ 6]:{ID:1,Type:0,BodyID:1003,Rotate:0 ,Position:{x:   0 ,y:2},Attr:"Normal"},//下墙 
            [ 7]:{ID:1,Type:0,BodyID:1003,Rotate:90 ,Position:{x:   0 ,y:4},Attr:"Normal"},//下墙  
        }
    }  
 
};
  