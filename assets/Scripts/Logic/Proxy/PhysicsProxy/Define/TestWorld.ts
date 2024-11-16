import { INightmareMapDesc } from "./GameMapType";

export let NigmareMapDesc:INightmareMapDesc = {
    HeroSpawnPoint:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    MonsterSpawnPoint:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    GameMap: {  
        Key:33,//创建一个11的世界物体对象    
        Pos:{x:0,y:0},//世界的位置   
        Child:[//所有的子节点     
            //设置世界围墙信息
                                        { Key: 54,Pos:{x:  0,y: 18}},
            { Key: 56,Pos:{x:-18,y:  0}},                             { Key: 57,Pos:{x: 18,y:  0}}, 
                                        { Key: 55,Pos:{x:  0,y:-18}},
            {   
                Key:34,//房间类型       
               Pos: {x: -11,y: 13},   
                Child:[//所有的子节点     
                    { Key: 11,Pos:{x:-3,y: 2}},//左上角图标
                    { Key: 12,Pos:{x:-3,y:-2}}, //左下角图标
                    { Key: 13,Pos:{x: 3,y: 2}},//右上角 
                    { Key: 14,Pos:{x: 3,y:-2}}, //右下角图标 
                    //上横
                    { Key: 75,Pos:{y: 2,x: 0}},
                    //下横
                    { Key: 82,Pos:{y:-2,x: 0}},
                    //左竖
                    { Key: 80,Pos:{x:-3,y: 0}},
                    //右竖
                    { Key: 17,Pos:{x: 3,y: 1}},{ Key: 17,Pos:{x: 3,y: -1}},
                    
                    //建筑物容器  
                    {Key: 9,Pos:{x:-2,y:-1}},  
                    {Key: 9,Pos:{x:-2,y: 0}}, 
                    {Key: 9,Pos:{x:-2,y: 1}}, 
                    
                    {Key: 9,Pos:{x:-1,y:-1}},  
                    {Key: 9,Pos:{x:-1,y: 0}}, 
                    {Key: 9,Pos:{x:-1,y: 1}},  
    
                    {Key: 9,Pos:{x: 0,y:-1}},  
                    {Key: 9,Pos:{x:0,y:0}, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31}
                    ]},  
                    {Key: 9,Pos:{x: 0,y: 1}}, 
                    
                    {Key: 9,Pos:{x: 1,y:-1}},  
                    {Key: 9,Pos:{x: 1,y: 0}}, 
                    {Key: 9,Pos:{x: 1,y: 1}}, 
    
                    {Key: 9,Pos:{x: 2,y:-1}},  
                    {Key: 9,Pos:{x: 2,y: 0}}, 
                    {Key: 9,Pos:{x: 2,y: 1}}, 
     
                    {Key: 9,Pos:{x:3,y:0}, Child:[
                        {Key: 45,Pos:{x:0,y:0}, Child:[//房门
                            {Key:48,Pos:{x:1,y:0}},   
                            {Key:48,Pos:{x:-1,y:0}}
                        ],CustomData:16 },]
                    },
                ]  
            },  
            {   
                Key:35,//房间类型       
                Pos: {x: -1,y: 11},    
                Child:[//所有的子节点   
                    //建筑物容器  
                    {Key:11,Pos:{x:-3,y: 4}},                                                  {Key: 75,Pos:{x: 0,y: 4}}                                                 ,{Key:13,Pos:{x: 3,y: 4}},
                                             {Key: 9,Pos:{x:-2,y: 3}},{Key: 9,Pos:{x:-1,y: 3}},{Key: 9,Pos:{x: 0,y: 3}},{Key: 9,Pos:{x: 1,y: 3}},{Key: 9,Pos:{x: 2,y: 3}}, 
                                             {Key: 9,Pos:{x:-2,y: 2}},{Key: 9,Pos:{x:-1,y: 2}},{Key: 9,Pos:{x: 0,y: 2}},{Key: 9,Pos:{x: 1,y: 2}},{Key: 9,Pos:{x: 2,y: 2}}, 
                    {Key:77,Pos:{x:-3,y: 1}},{Key: 9,Pos:{x:-2,y: 1}},{Key: 9,Pos:{x:-1,y: 1}},{Key: 9,Pos:{x: 0,y: 1}},{Key: 9,Pos:{x: 1,y: 1}},{Key: 9,Pos:{x: 2,y: 1}}, 
                                             {Key: 9,Pos:{x:-2,y: 0}},{Key: 9,Pos:{x:-1,y: 0}},{Key: 9,Pos:{x: 0,y: 0}},{Key: 9,Pos:{x: 1,y: 0}}                         ,{Key:78,Pos:{x: 3,y: 0}},
                                             {Key: 9,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key: 9,Pos:{x: 2,y:-1}}, 
                    {Key:12,Pos:{x:-3,y:-2}},{Key:15,Pos:{x:-2,y:-2}},{Key:38,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key: 9,Pos:{x: 2,y:-2}}, 
                                                                                               {Key: 9,Pos:{x: 0,y:-3}},{Key: 9,Pos:{x: 1,y:-3}},{Key: 9,Pos:{x: 2,y:-3}}, 
                                                                      {Key:12,Pos:{x:-1,y:-4}},                         {Key:76,Pos:{x: 1,y:-4}}                        ,{Key:14,Pos:{x: 3,y:-4}},
                    {Key: 9,Pos:{x:-1,y:-3}, Child:[
                        {Key: 44,Pos:{x:0,y:0}, Child:[//房门
                            {Key:48,Pos:{x:-1,y:0}},   
                            {Key:48,Pos:{x:1,y:0}} 
                        ],CustomData:16 },] 
                    },   
                    {Key: 9,Pos:{x:2,y:0 }, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床 
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31}
                    ]},                                                  
                    ]  
            }, 
            
            {    
                Key:40,//房间类型       
                Pos: {x: 9,y: 11},   
                Child:[//所有的子节点   
                    //建筑物容器  
                    {Key:11,Pos:{x:-3,y: 4}},                                                  {Key: 75,Pos:{x: 0,y: 4}}                                                 ,{Key:13,Pos:{x: 3,y: 4}},
                    {Key:16,Pos:{x:-3,y: 3}},{Key: 9,Pos:{x:-2,y: 3}},{Key: 9,Pos:{x:-1,y: 3}},{Key: 9,Pos:{x: 0,y: 3}},{Key: 9,Pos:{x: 1,y: 3}},{Key: 9,Pos:{x: 2,y: 3}},
                    {Key:16,Pos:{x:-3,y: 2}},{Key: 9,Pos:{x:-2,y: 2}},{Key: 9,Pos:{x:-1,y: 2}},{Key: 9,Pos:{x: 0,y: 2}},{Key: 9,Pos:{x: 1,y: 2}},{Key: 9,Pos:{x: 2,y: 2}},{Key:79,Pos:{x: 3,y: 2}},
                    {Key:12,Pos:{x:-3,y: 1}},{Key:38,Pos:{x:-2,y: 1}},{Key: 9,Pos:{x:-1,y: 1}},{Key: 9,Pos:{x: 0,y: 1}},{Key: 9,Pos:{x: 1,y: 1}},{Key: 9,Pos:{x: 2,y: 1}},
                                             {Key:12,Pos:{x:-2,y: 0}},{Key:38,Pos:{x:-1,y: 0}},                         {Key: 9,Pos:{x: 1,y: 0}},{Key: 9,Pos:{x: 2,y: 0}},
                                                                      {Key:12,Pos:{x:-1,y:-1}},{Key:38,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key: 9,Pos:{x: 2,y:-1}},{Key:17,Pos:{x: 3,y:-1}},
                                                                                               {Key:16,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key: 9,Pos:{x: 2,y:-2}},{Key:17,Pos:{x: 3,y:-2}}, 
                                                                                               {Key:12,Pos:{x: 0,y:-3}},{Key:15,Pos:{x: 1,y:-3}},{Key:15,Pos:{x: 2,y:-3}},{Key:14,Pos:{x: 3,y:-3}}, 
                    {Key: 9,Pos:{x:3,y:0}, Child:[
                        {Key: 45,Pos:{x:0,y:0}, Child:[//房门  
                            {Key:48,Pos:{x:1,y:0}},   
                            {Key:48,Pos:{x:-1,y:0}} 
                        ],CustomData:16 },] 
                    },   
                    {Key: 9,Pos:{x:0,y:0 }, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31}
                    ]},                                                   
                ]  
            },  
            {   
                Key:40,//房间类型       
                Pos: {x: -11,y: 4},    
                Child:[//所有的子节点   
                    {Key:11,Pos:{x:-3,y: 3}},{Key: 2,Pos:{x:-2,y: 3}},{Key: 2,Pos:{x:-1,y: 3}},                         {Key: 2,Pos:{x: 1,y: 3}},{Key: 2,Pos:{x: 2,y: 3}},{Key:13,Pos:{x: 3,y: 3}},
                                             {Key: 9,Pos:{x:-2,y: 2}},{Key: 9,Pos:{x:-1,y: 2}},{Key: 9,Pos:{x: 0,y: 2}},{Key: 9,Pos:{x: 1,y: 2}},{Key: 9,Pos:{x: 2,y: 2}},  
                    {Key:80,Pos:{x:-3,y: 1}},{Key: 9,Pos:{x:-2,y: 1}},{Key: 9,Pos:{x:-1,y: 1}},{Key: 9,Pos:{x: 0,y: 1}},{Key: 9,Pos:{x: 1,y: 1}},{Key: 9,Pos:{x: 2,y: 1}},{Key:79,Pos:{x: 3,y: 1}},
                                             {Key: 9,Pos:{x:-2,y: 0}},{Key: 9,Pos:{x:-1,y: 0}},                         {Key: 9,Pos:{x: 1,y: 0}},{Key: 9,Pos:{x: 2,y: 0}},              
                    {Key:12,Pos:{x:-3,y:-1}},{Key:38,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key:36,Pos:{x: 2,y:-1}},{Key:14,Pos:{x: 3,y:-1}},
                                             {Key:16,Pos:{x:-2,y:-2}},{Key: 9,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key:17,Pos:{x: 2,y:-2}},
                                             {Key:12,Pos:{x:-2,y:-3}},                         {Key:76,Pos:{x: 0,y:-3}},                         {Key:14,Pos:{x: 2,y:-3}},
                    {Key: 9,Pos:{x:0,y:3}, Child:[
                        {Key: 46,Pos:{x:0,y:0}, Child:[//房门   
                            {Key:48,Pos:{x: 0,y: 1}},     
                            {Key:48,Pos:{x: 0,y:-1}} 
                        ],CustomData:16 }]  
                    },    
                    {Key: 9,Pos:{x:0,y:0 }, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}},  
                        ],CustomData:31}
                    ]},                                                  
                ]  
            },
            {    
                Key:40,//房间类型        
                Pos: {x: 9,y: 1},     
                Child:[//所有的子节点   
                                                                      {Key:11,Pos:{x:-1,y: 3}},{Key: 2,Pos:{x: 0,y: 3}},{Key:13,Pos:{x: 1,y: 3}},
                                             {Key:11,Pos:{x:-2,y: 2}},{Key:39,Pos:{x:-1,y: 2}},{Key: 9,Pos:{x: 0,y: 2}},{Key:37,Pos:{x: 1,y: 2}},{Key:13,Pos:{x: 2,y: 2}},
                    {Key:11,Pos:{x:-3,y: 1}},{Key:39,Pos:{x:-2,y: 1}},{Key: 9,Pos:{x:-1,y: 1}},{Key: 9,Pos:{x: 0,y: 1}},{Key: 9,Pos:{x: 1,y: 1}},{Key:37,Pos:{x: 2,y: 1}},{Key:13,Pos:{x: 3,y: 1}},
                    {Key:16,Pos:{x:-3,y: 0}},{Key: 9,Pos:{x:-2,y: 0}},{Key: 9,Pos:{x:-1,y: 0}}                         ,{Key: 9,Pos:{x: 1,y: 0}},{Key: 9,Pos:{x: 2,y: 0}},{Key:17,Pos:{x: 3,y: 0}},
                    {Key:12,Pos:{x:-3,y:-1}},{Key:38,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key:36,Pos:{x: 2,y:-1}},{Key:14,Pos:{x: 3,y:-1}},
                                                                      {Key: 9,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key:36,Pos:{x: 1,y:-2}},{Key:14,Pos:{x: 2,y:-2}},
                                             {Key:12,Pos:{x:-2,y:-3}},{Key:15,Pos:{x:-1,y:-3}},{Key:15,Pos:{x: 0,y:-3}},{Key:14,Pos:{x: 1,y:-3}},
                    {Key: 9,Pos:{x:-2,y:-2}, Child:[  
                        {Key: 44,Pos:{x:0,y:0}, Child:[//房门    
                            {Key:48,Pos:{x:-1,y:0}},      
                            {Key:48,Pos:{x:1,y:0}} 
                        ],CustomData:16 }]   
                    },     
                    {Key: 9,Pos:{x:0,y:0 }, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}},  
                        ],CustomData:31}
                    ]},                                                  
                ]  
            },
             
            {   
                Key:41,//7*9房间类型        
                Pos: {x: -1,y: -8},    
                Child:[//所有的子节点   
                    {Key:11,Pos:{x:-3,y: 4}},{Key: 2,Pos:{x:-2,y: 4}},{Key:13,Pos:{x:-1,y: 4}},                         {Key:11,Pos:{x: 1,y: 4}},{Key: 2,Pos:{x: 2,y: 4}},{Key:13,Pos:{x: 3,y: 4}},
                                             {Key: 9,Pos:{x:-2,y: 3}},{Key:17,Pos:{x:-1,y: 3}},                         {Key:16,Pos:{x: 1,y: 3}},{Key: 9,Pos:{x: 2,y: 3}},  
                                             {Key: 9,Pos:{x:-2,y: 2}},{Key:17,Pos:{x:-1,y: 2}},                         {Key:16,Pos:{x: 1,y: 2}},{Key: 9,Pos:{x: 2,y: 2}},  
                                             {Key: 9,Pos:{x:-2,y: 1}},{Key:17,Pos:{x:-1,y: 1}},                         {Key:16,Pos:{x: 1,y: 1}},{Key: 9,Pos:{x: 2,y: 1}},  
                    {Key:81,Pos:{x:-3,y: 0}},{Key: 9,Pos:{x:-2,y: 0}},{Key:37,Pos:{x:-1,y: 0}},                         {Key:39,Pos:{x: 1,y: 0}},{Key: 9,Pos:{x: 2,y: 0}},{Key:78,Pos:{x: 3,y: 0}},
                                             {Key: 9,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key: 9,Pos:{x: 2,y:-1}},  
                                             {Key: 9,Pos:{x:-2,y:-2}},{Key: 9,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key: 9,Pos:{x: 2,y:-2}},  
                                             {Key: 9,Pos:{x:-2,y:-3}},{Key: 9,Pos:{x:-1,y:-3}}                         ,{Key: 9,Pos:{x: 1,y:-3}},{Key: 9,Pos:{x: 2,y:-3}},  
                    {Key:12,Pos:{x:-3,y:-4}},                                                 ,{Key:82,Pos:{x: 0,y:-4}}                                                  ,{Key:14,Pos:{x: 3,y:-4}}, 
                    {Key: 9,Pos:{x:0,y:0}, Child:[
                        {Key: 46,Pos:{x:0,y:0}, Child:[//房门    
                            {Key:48,Pos:{x:0,y: 1}},     
                            {Key:48,Pos:{x:0,y:-1}}  
                        ],CustomData:16 }]  
                    },    
                    {Key: 9,Pos:{x:0,y:-3 }, Child:[ 
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31}
                    ]},                                                  
                ]  
            },
            {   
                Key:42,//11*3房间类型        
                Pos: {x: 5,y: -16},     
                Child:[//所有的子节点    
    {Key:11,Pos:{x:-5,y: 1}},{Key: 2,Pos:{x:-4,y: 1}},{Key: 2,Pos:{x:-3,y: 1}},                          {Key: 2,Pos:{x:-1,y: 1}}                                                  ,{Key:75,Pos:{x: 2,y: 1}}                                                  ,{Key:13,Pos:{x: 5,y: 1}},
    {Key:16,Pos:{x:-5,y: 0}},{Key: 9,Pos:{x:-4,y: 0}},{Key: 9,Pos:{x:-3,y: 0}},{Key: 9,Pos:{x: -2,y: 0}},{Key: 9,Pos:{x:-1,y: 0}}                         ,{Key: 9,Pos:{x: 1,y: 0}},{Key: 9,Pos:{x: 2,y: 0}},{Key: 9,Pos:{x: 3,y: 0}},{Key: 9,Pos:{x: 4,y: 0}},{Key:17,Pos:{x: 5,y: 0}},
    {Key:12,Pos:{x:-5,y:-1}}                                                                                                     ,{Key:83,Pos:{x: 0,y:-1}}                                                                                                    ,{Key:14,Pos:{x: 5,y:-1}},
                    
    
                    {Key: 9,Pos:{x:-2,y:1}, Child:[ 
                        {Key: 46,Pos:{x:0,y:0}, Child:[//房门    
                            {Key:48,Pos:{x:0,y: 1}},     
                            {Key:48,Pos:{x:0,y:-1}}  
                        ],CustomData:16 }]   
                    },    
                    {Key: 9,Pos:{x:1,y:0}, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}},  
                        ],CustomData:31}
                    ]},                                                  
                ]  
            },
            {   
                Key:35,//房间类型        
                Pos: {x: 9,y: -9},    
                Child:[//所有的子节点    
                    //建筑物容器  
                    {Key:11,Pos:{x:-3,y: 4}},                                                  {Key:75,Pos:{x: 0,y: 4}}                                                  ,{Key:13,Pos:{x: 3,y: 4}},
                                             {Key: 9,Pos:{x:-2,y: 3}},{Key: 9,Pos:{x:-1,y: 3}},{Key: 9,Pos:{x: 0,y: 3}},{Key: 9,Pos:{x: 1,y: 3}},{Key: 9,Pos:{x: 2,y: 3}},  
                                             {Key: 9,Pos:{x:-2,y: 2}},{Key: 9,Pos:{x:-1,y: 2}},{Key: 9,Pos:{x: 0,y: 2}},{Key: 9,Pos:{x: 1,y: 2}},{Key: 9,Pos:{x: 2,y: 2}},  
                    {Key:77,Pos:{x:-3,y: 1}},{Key: 9,Pos:{x:-2,y: 1}},{Key: 9,Pos:{x:-1,y: 1}},{Key: 9,Pos:{x: 0,y: 1}},{Key: 9,Pos:{x: 1,y: 1}},{Key: 9,Pos:{x: 2,y: 1}},  
                                             {Key: 9,Pos:{x:-2,y: 0}},{Key: 9,Pos:{x:-1,y: 0}},{Key: 9,Pos:{x: 0,y: 0}},{Key: 9,Pos:{x: 1,y: 0}}                         ,{Key:78,Pos:{x: 3,y: 0}},
                                             {Key: 9,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key: 9,Pos:{x: 2,y:-1}},  
                    {Key:12,Pos:{x:-3,y:-2}},{Key:15,Pos:{x:-2,y:-2}},{Key:38,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key: 9,Pos:{x: 2,y:-2}},  
                                                                                               {Key: 9,Pos:{x: 0,y:-3}},{Key: 9,Pos:{x: 1,y:-3}},{Key: 9,Pos:{x: 2,y:-3}},  
                                                                      {Key:12,Pos:{x:-1,y:-4}},                         {Key:76,Pos:{x: 1,y:-4}}                         ,{Key:14,Pos:{x: 3,y:-4}},
                    {Key: 9,Pos:{x:-1,y:-3}, Child:[
                        {Key: 44,Pos:{x:0,y:0}, Child:[//房门
                            {Key:48,Pos:{x:1,y:0}},   
                            {Key:48,Pos:{x:-1,y:0}} 
                        ],CustomData:16 },]   
                    },   
                    {Key: 9,Pos:{x:2,y:0 }, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床 
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31} 
                    ]},                                                  
                    ]  
            }, 
            {    
                Key:43,//7*9房间类型        
                Pos: {x: -10,y: -4},    
                Child:[//所有的子节点   
                    {Key:11,Pos:{x:-4,y: 3}},{Key: 2,Pos:{x:-3,y: 3}},{Key: 2,Pos:{x:-2,y: 3}},{Key:13,Pos:{x:-1,y: 3}},
                                             {Key: 9,Pos:{x:-3,y: 2}},{Key: 9,Pos:{x:-2,y: 2}},{Key:17,Pos:{x:-1,y: 2}},
                                             {Key: 9,Pos:{x:-3,y: 1}},{Key: 9,Pos:{x:-2,y: 1}},{Key:17,Pos:{x:-1,y: 1}},
                    {Key:77,Pos:{x:-4,y: 0}},{Key: 9,Pos:{x:-3,y: 0}},{Key: 9,Pos:{x:-2,y: 0}},{Key:37,Pos:{x:-1,y: 0}},{Key: 2,Pos:{x: 0,y: 0}},{Key: 2,Pos:{x: 1,y: 0}},                         {Key: 2,Pos:{x: 3,y: 0}},{Key:13,Pos:{x:4,y: 0}},
                                             {Key: 9,Pos:{x:-3,y:-1}},{Key: 9,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key: 9,Pos:{x: 2,y:-1}},{Key: 9,Pos:{x: 3,y:-1}},{Key:17,Pos:{x:4,y:-1}},
                                                                      {Key: 9,Pos:{x:-2,y:-2}},{Key: 9,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key: 9,Pos:{x: 2,y:-2}},{Key: 9,Pos:{x: 3,y:-2}},{Key:17,Pos:{x:4,y:-2}},
                    {Key:12,Pos:{x:-4,y:-3}},                                                                           {Key:84,Pos:{x: 0,y:-3}}                                                                           ,{Key:14,Pos:{x:4,y:-3}},
    
    
                    {Key: 9,Pos:{x:2,y:0}, Child:[
                        {Key: 46,Pos:{x:0,y:0}, Child:[//房门    
                            {Key:48,Pos:{x:0,y:1}},     
                            {Key:48,Pos:{x:0,y:-1}}  
                        ],CustomData:16 }]   
                    },    
                    {Key: 9,Pos:{x:-3,y:-2 }, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31} 
                    ]},                                                  
                ]  
            },
            {   
                Key:35,//房间类型        
                Pos: {x:-11,y:-13},     
                Child:[//所有的子节点     
                    //建筑物容器   
                                                                      {Key:11,Pos:{x:-1,y: 4}},{Key: 2,Pos:{x: 0,y: 4}},{Key: 2,Pos:{x: 1,y: 4}},{Key: 2,Pos:{x: 2,y: 4}},{Key:13,Pos:{x: 3,y: 4}},
                                                                                                                        {Key: 9,Pos:{x: 1,y: 3}},{Key: 9,Pos:{x: 2,y: 3}},
                                                                      {Key:80,Pos:{x:-1,y: 2}},{Key: 9,Pos:{x: 0,y: 2}},{Key: 9,Pos:{x: 1,y: 2}},{Key: 9,Pos:{x: 2,y: 2}},{Key:79,Pos:{x: 3,y: 2}},
                                                                                               {Key: 9,Pos:{x: 0,y: 1}},{Key: 9,Pos:{x: 1,y: 1}},{Key: 9,Pos:{x: 2,y: 1}}, 
                    {Key:11,Pos:{x:-3,y: 0}},{Key: 2,Pos:{x:-2,y: 0}},{Key:39,Pos:{x:-1,y: 0}},{Key: 9,Pos:{x: 0,y: 0}},{Key: 9,Pos:{x: 1,y: 0}},{Key: 9,Pos:{x: 2,y: 0}},{Key:17,Pos:{x: 3,y: 0}},
                                             {Key: 9,Pos:{x:-2,y:-1}},{Key: 9,Pos:{x:-1,y:-1}},{Key: 9,Pos:{x: 0,y:-1}},{Key: 9,Pos:{x: 1,y:-1}},{Key: 9,Pos:{x: 2,y:-1}},
                    {Key:80,Pos:{x:-3,y:-2}},{Key: 9,Pos:{x:-2,y:-2}},{Key: 9,Pos:{x:-1,y:-2}},{Key: 9,Pos:{x: 0,y:-2}},{Key: 9,Pos:{x: 1,y:-2}},{Key: 9,Pos:{x: 2,y:-2}},{Key:17,Pos:{x: 3,y:-2}}, 
                                             {Key: 9,Pos:{x:-2,y:-3}},{Key:36,Pos:{x:-1,y:-3}},{Key:15,Pos:{x: 0,y:-3}},{Key:38,Pos:{x: 1,y:-3}},{Key: 9,Pos:{x: 2,y:-3}},{Key:17,Pos:{x: 3,y:-3}},
                    {Key:12,Pos:{x:-3,y:-4}},{Key:15,Pos:{x:-2,y:-4}},{Key:14,Pos:{x:-1,y:-4}},                         {Key:12,Pos:{x: 1,y:-4}},{Key:15,Pos:{x: 2,y:-4}},{Key:14,Pos:{x: 3,y:-4}}, 
    
    
                    {Key: 9,Pos:{x:3,y: -1}, Child:[
                        {Key: 45,Pos:{x:0,y:0}, Child:[//房门 
                            {Key:48,Pos:{x: 1,y:0}},   
                            {Key:48,Pos:{x:-1,y:0}}  
                        ],CustomData:16 },]   
                    },   
                    {Key: 9,Pos:{x: 0,y: 3}, Child:[
                        {Key: 49 ,Pos:{x:0,y:0},Child:[ //床  
                            {Key: 51,Pos:{x:0,y:0}}, 
                        ],CustomData:31}
                    ]},                                                  
                    ]  
            },     
            //勇士       
            { Key: 1 ,Pos:{x:   -1,y:    0}}, 
            { Key: 1 ,Pos:{x:   -2,y:    0}},
            { Key: 1 ,Pos:{x:   -3,y:    0}}, 
            { Key: 1 ,Pos:{x:   1,y:    0}},
            { Key: 1 ,Pos:{x:   2,y:    0}}, 
            { Key: 32,Pos:{x:   3,y:    0}},
            { Key: 24,Pos:{x:   0,y:    0},CustomData:1}, 
    
            { Key: 53,Pos:{x:   0,y:    0}},  
        ] 
    } 
}; 