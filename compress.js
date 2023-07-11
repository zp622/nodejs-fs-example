
const fs = require('fs');
const { argv, env } = require('process');
const { rewrite, rootPath, fileType } = getArgv();
require(`./js/${fileType}-compressor`);
let packer = null;
fileType !== 'css' && (packer = new Packer());
const reg = new RegExp(fileType+"$");
recursionFolder(rootPath);

function getArgv() {
    let rewrite = false;
    let rootPath = env.PWD;
    let fileType = 'html';
    argv.slice(2).forEach(val => {
        val === '-rwr' && (rewrite = true);
        val.startsWith('-dir=') && (rootPath = val.split('=')[1]);
        val.startsWith('-type=') && (fileType = val.split('=')[1]);
    })
    return { rewrite, rootPath, fileType }
}

function recursionFolder(dirPath) {
    fs.readdir(dirPath, (error, files) => {
        for (let i = 0; i < files.length; i++) {
            const name = `${dirPath}/${files[i]}`;
            fs.stat(name, (err, content) => {
                const flag = content.isDirectory();
                if (flag) {
                    recursionFolder(name);
                } else {
                    if (name === argv[1]) return;
                    if (!reg.test(name)) return;
                    const { output, newFilePath } = fileType !== 'css' ? handleFile(name) : handleCss(name);
                    fs.writeFile(newFilePath, output, (e) => {
                        if (e) throw e;
                    });
                }
            })
        }
    })
}

function handleFile (name) {
    const data = fs.readFileSync(name);
    const output = packer.pack(data, 0, 0);
    const newFilePath = rewrite ? name : `${name.substring(0, name.lastIndexOf('.'))}.min.${fileType}`;
    return { output, newFilePath };
}

function handleCss (name) { 
    const data = fs.readFileSync(name, 'utf8');
    const output = CSSPacker['pack'](data);
    const newFilePath = rewrite ? name : `${name.substring(0, name.lastIndexOf('.'))}.min.${fileType}`;
    return { output, newFilePath };
}


