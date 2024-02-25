exports.configs = {
    'android': {
        hooks: './builder/hook.js',
        options: {
            HotVersion: { 
                label: "热更版本",  
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: '请输入热更版本',
                    },
                },
                verifyRules: ['required'], 
            },
            url: {
                label: "热更地址",
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: '请输入热更地址',
                    },
                },
                verifyRules: ['required'],
            }, 
        } 
    } 
};