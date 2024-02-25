export enum eHotUpdateStatus{
    Idle,//热更有Idle状态
    ExecuteCheckVersion,//执行版本检测中
    CheckVersionFinish,//检测版本完成状态  
    HotUpdateProgress,//更新热更进度中
    HotUpdateFail,//热更失败的状态
    HotUpdateFinish,//热更完成的状态
    SkipHotUpdate,//跳过热更的状态
}; 
