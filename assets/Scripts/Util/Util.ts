import { Widget } from "cc";

export function CopyWidget(srcWidget:Widget,destWidget:Widget){
    destWidget.target = srcWidget.target; 
    destWidget.isAlignTop = srcWidget.isAlignTop;  //是否对齐上边。
    destWidget.isAlignBottom = srcWidget.isAlignBottom;  //是否对齐下边。
    destWidget.isAlignLeft = srcWidget.isAlignLeft;  //是否对齐左边。
    destWidget.isAlignRight = srcWidget.isAlignRight;  //是否对齐右边。  

    //如果为 true，"top" 将会以像素作为边距，否则将会以相对父物体高度的比例（0 到 1）作为边距。
    destWidget.isAbsoluteTop = srcWidget.isAbsoluteTop;         
    //如果为 true，"bottom" 将会以像素作为边距，否则将会以相对父物体高度的比例（0 到 1）作为边距。
    destWidget.isAbsoluteBottom = srcWidget.isAbsoluteBottom;      
    //如果为 true，"left" 将会以像素作为边距，否则将会以相对父物体宽度的比例（0 到 1）作为边距。
    destWidget.isAbsoluteLeft = srcWidget.isAbsoluteLeft;       
    //如果为 true，"right" 将会以像素作为边距，否则将会以相对父物体宽度的比例（0 到 1）作为边距。 
    destWidget.isAbsoluteRight = srcWidget.isAbsoluteRight;       
    //是否垂直方向对齐中点，开启此项会将垂直方向其他对齐选项取消。
    destWidget.isAlignVerticalCenter = srcWidget.isAlignVerticalCenter;   
    //是否水平方向对齐中点，开启此选项会将水平方向其他对齐选项取消。
    destWidget.isAlignHorizontalCenter = srcWidget.isAlignHorizontalCenter;  
    //如果为 true，"horizontalCenter" 将会以像素作为偏移值，反之为比例（0 到 1）。
    destWidget.isAbsoluteHorizontalCenter = srcWidget.isAbsoluteHorizontalCenter;         
    //如果为 true，"verticalCenter" 将会以像素作为偏移值，反之为比例（0 到 1）。
    destWidget.isAbsoluteVerticalCenter = srcWidget.isAbsoluteVerticalCenter;         
    //指定 Widget 的对齐模式，用于决定 Widget 应该何时刷新。
    destWidget.alignMode = srcWidget.alignMode;   
    //对齐开关，由 AlignFlags 组成
    destWidget.alignFlags = srcWidget.alignFlags;  

    //本节点顶边和父节点顶边的距离，可填写负值，只有在 isAlignTop 开启时才有作用。  
    destWidget.top = srcWidget.top;  
    //本节点底边和父节点底边的距离，可填写负值，只有在 isAlignBottom 开启时才有作用。  
    destWidget.bottom = srcWidget.bottom;          
    // 本节点左边和父节点左边的距离，可填写负值，只有在 isAlignLeft 开启时才有作用。
    destWidget.left = srcWidget.left;           
    // 本节点右边和父节点右边的距离，可填写负值，只有在 isAlignRight 开启时才有作用。
    destWidget.right = srcWidget.right;         
    // 水平居中的偏移值，可填写负值，只有在 isAlignHorizontalCenter 开启时才有作用。
    destWidget.horizontalCenter = srcWidget.horizontalCenter;         
    //垂直居中的偏移值，可填写负值，只有在 isAlignVerticalCenter 开启时才有作用。
    destWidget.verticalCenter = srcWidget.verticalCenter;    
    destWidget.updateAlignment();//立即更新一下 
}