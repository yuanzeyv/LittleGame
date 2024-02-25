
'use strict'; 
const os = require("os");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { exec } = require('child_process');
function InjectScriptToMainJS(resultDir){
    
var inject_script = `
(function () {
    if (typeof window.jsb === 'object') {
        var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
            var paths = JSON.parse(hotUpdateSearchPaths);
            jsb.fileUtils.setSearchPaths(paths);

            var fileList = []; 
            var storagePath = paths[0] || '';
            var tempPath = storagePath + '_temp/';
            var baseOffset = tempPath.length;

            if (jsb.fileUtils.isDirectoryExist(tempPath) && !jsb.fileUtils.isFileExist(tempPath + 'project.manifest.temp')) {
                jsb.fileUtils.listFilesRecursively(tempPath, fileList);
                fileList.forEach(srcPath => {
                    var relativePath = srcPath.substr(baseOffset);
                    var dstPath = storagePath + relativePath;

                    if (srcPath[srcPath.length] == '/') {
                        jsb.fileUtils.createDirectory(dstPath)
                    }
                    else {
                        if (jsb.fileUtils.isFileExist(dstPath)) { 
                            jsb.fileUtils.removeFile(dstPath)
                        }
                        jsb.fileUtils.renameFile(srcPath, dstPath);
                    }
                })
                jsb.fileUtils.removeDirectory(tempPath);
            }
        }
    }
})();
`;
    var url = path.join(resultDir,!fs.existsSync(path.join(resultDir, 'data')) ?  "assets" : "data", 'main.js');
    console.warn(`正在向路径:${url} 注入热更代码`);
    var fileData = fs.readFileSync(url, "utf8");
    var fileInfo = fileData.toString();
    fs.writeFileSync(url, inject_script + fileInfo);
    console.warn(`注入热更代码成功`);  
}
 
function GeneratorHotFile(moduleObj,resultDir){
    console.warn(`开始生成热更文件中... ${moduleObj}`);  
    var resdir = fs.existsSync(path.join(resultDir, 'data')) ? "data":"assets";  
    var hotupdatePathKey = moduleObj.url || "http://127.0.0.1"; 
    var hotupdateVersionKey = moduleObj.HotVersion || "1.0.0";
    var cmd = `node ${Editor.Project.path}/extensions/hot-update/version_generator.js -v ${hotupdateVersionKey} -u ${hotupdatePathKey} -s ${path.join(resultDir, resdir)} -d ${path.join(Editor.Project.path, "HotUpdate/" + hotupdateVersionKey)}`    
    console.warn(`执行命令以生成热更文件:${cmd} `);   
    execSync(cmd, { cwd: Editor.Project.path }); 
    console.warn(`生成热更文件成功:${cmd} `);   
} 
 
function CopyFolder(sourceFolder, targetFolder) {
    if (!fs.existsSync(targetFolder)) 
      fs.mkdirSync(targetFolder);
    var files = fs.readdirSync(sourceFolder); 
    for (var i = 0; i < files.length; i++) {
      var currentFile = fs.lstatSync(path.join(sourceFolder, files[i]));
      if (currentFile.isDirectory()) {
        CopyFolder(path.join(sourceFolder, files[i]), path.join(targetFolder, files[i]));
      } else { 
        var sourceFile = fs.createReadStream(path.join(sourceFolder, files[i]));
        var targetFile = fs.createWriteStream(path.join(targetFolder, files[i])); 
        sourceFile.pipe(targetFile); 
      }  
    }
}        
exports.onAfterBuild = async function (options, result) {
    var _a =  options.packages;
    var moduleObj = _a === null || _a === void 0 ? void 0 : _a["hot-update"]; 
    InjectScriptToMainJS(result.dest);//注入脚本到Main.js
    GeneratorHotFile(moduleObj,result.dest);//生成热更文件    
     
    var resdir = fs.existsSync(path.join(result.dest, 'data')) ? "data":"assets";
    resdir = path.join(result.dest, resdir) 
    var hotupdateVersionKey = moduleObj.HotVersion || "1.0.0";
    var toDir = path.join(Editor.Project.path, "HotUpdate/" + hotupdateVersionKey);
    console.warn(`准备将${resdir}下的内容Copy到${toDir}文件夹...`);  
    CopyFolder(resdir,toDir);//移动版本文件到指定文件夹
    console.warn(`Copy完成`);   
} 
  
 
