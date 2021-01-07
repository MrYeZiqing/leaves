const fs = require('fs');

function getDirList (type) {
    let ret = fs.readdirSync(`./src/${type}s`);
    ret = ret.filter(item => isFile(item,type) === true);
    return ret;
}

function isFile (name,type) {
    const file = fs.statSync(`./src/${type}s/${name}`);
    if (file.isDirectory() === true) {
        return true;
    }
    return false;
}

module.exports = function (plop) {
    plop.setGenerator('test',{
        description:'generate a test',
        prompts:[
            {
                type:'input',
                name:'name',
                message:'请输入文件夹名称'
            },
            {
                type:'list',
                name:'type',
                message:'您需要创建什么类型的文件夹',
                choices:[
                    {
                        name:'page',
                        value:'page',
                        checked:true
                    },
                    {
                        name:'component',
                        value:'component',
                        checked:false
                    }
                ]
            }
        ],
        actions:data => {
            const name = '{{name}}';
            const {type} = data;
            const actions = [];
            if (data.name) {
                const Files = getDirList(type);
                if (Files.includes(data.name)) {
                    console.log('文件已存在');
                    return [];
                }
                if (type === 'page') {
                    actions.push({
                        type:'add',
                        path:`src/pages/${name}/index.js`,
                        templateFile:'plop-templates/page/index.hbs'
                    });
                    actions.push({
                        type:'add',
                        path:`src/pages/${name}/app.jsx`,
                        templateFile:'plop-templates/page/app.hbs',
                        data:{
                            name
                        }
                    });
                    actions.push({
                        type:'add',
                        path:`src/pages/${name}/index.less`,
                        templateFile:'plop-templates/common/style.hbs'
                    });
                } else if (type === 'component') {
                    actions.push({
                        type:'add',
                        path:`src/components/${name}/index.jsx`,
                        templateFile:'plop-templates/component/index.hbs'
                    });
                    actions.push({
                        type:'add',
                        path:`src/components/${name}/index.less`,
                        templateFile:'plop-templates/common/style.hbs'
                    });
                }
            }
            return actions;
        }
    });
}
;
