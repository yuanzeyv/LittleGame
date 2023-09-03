import fs from "fs" 
import path from 'path';
export function readFolderSync(folderPath: string):Array<string> {
    let retArray:Array<string> = new Array<string>();
    if(fs.existsSync(folderPath) == false)//如果为空目录，将会创建这个目录
        fs.mkdirSync(folderPath, { recursive: true });
    const files = fs.readdirSync(folderPath); 
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        if(stats.isDirectory()){
            console.log(`存在文件夹 ${filePath},解析不会进入其中`);
            continue;
        }
        if (stats.isFile() && (path.extname(file) != '.xlsx'  || filePath.includes("~$")) ) {
            continue;
        }
        retArray.push(file);
    }
    return retArray;
}
export function writeStringToFile(filePath: string, content: string) {
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`字符串已成功写入到文件: ${filePath}`);
    } catch (err) {
      console.error('写入文件时出错:', err);
    }
}
