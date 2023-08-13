'use strict';
const _0x17ce = [
    'PXRYz',
    'gIRCY',
    'hZfJa',
    '99179nOdlQt',
    'append',
    'OpenDevToo',
    'KEzGt',
    'createFrom',
    'isteners',
    'fjRqH',
    'closed',
    'nspector-c',
    'setContext',
    'lready!',
    'file://',
    'name',
    'setImage',
    'fPXxu',
    'gfgqc',
    'ussUq',
    'xCbvR',
    'assign',
    'path',
    ':focusNode',
    '1732uzJGFY',
    'nfigDataFo',
    'process',
    'Mode()',
    'setting.to',
    '1vhacJh',
    'then',
    'MvVQZ',
    'BGsVQ',
    'rMain',
    'split',
    'ector\x20v',
    './package.',
    '../cocos-i',
    'server',
    '11ThDTeC',
    'bSNnH',
    '1264fBTpAK',
    'LSGBT',
    'asset',
    'getUserTok',
    'BZHhs',
    '1149645VrPSnF',
    'ready-to-s',
    'Path',
    'request',
    'VmMHi',
    'config.jso',
    'getSelecte',
    ':savePrefa',
    'removeAllL',
    'VJsUH',
    'setting.co',
    'show',
    'resize',
    'tml',
    'Toggle\x20Min',
    'XnQkz',
    'ggleSimple',
    'User',
    'nges',
    'exports',
    'node',
    'JIPKj',
    'i\x20Mode',
    'Fbpiu',
    'unselect',
    'Sec',
    'disableWeb',
    'query-port',
    'getContent',
    'isPortrait',
    'scene',
    'readFileSy',
    'YuiHO',
    'iYBFL',
    '#2e2c29',
    'ebVbV',
    'setMenuBar',
    'Visibility',
    'd.js',
    '1117322kDDjxh',
    'index.html',
    'join',
    'size',
    ':focusAsse',
    'has\x20tray\x20a',
    'RwCwL',
    'hJrEw',
    'version',
    'Message',
    '948995fHzbCY',
    'ui-kit:tou',
    'simpleMode',
    './icon.png',
    'destroy',
    'index_low_',
    'error',
    'select',
    'Menu',
    'de(',
    'fixed\x20cont',
    '583257ulIDPB',
    'json',
    'IkAGD',
    '?port=',
    'warn',
    'ene-script',
    'setMenu',
    'v.switchMo',
    'save-prefa',
    'QEedl',
    'electron.h',
    'executeJav',
    '872878ctoamk',
    'TcBIi',
    'click',
    'b-from-cha',
    '&mode=',
    'aScript',
    'Selection',
    'utf-8',
    'how',
    'electron',
    'ch-asset',
    'existsSync',
    'webContent',
    'QrPDL',
    '1mfUxEh',
    'ZAzin',
    'Size',
    'wQUDc',
    'mainPreloa',
    'broadcast',
    'loadURL',
    'Cocos\x20Insp',
    'nCIiD',
    'setContent',
    'access_tok',
    'versions',
    'openDevToo',
    'getData',
    'eGvzA',
    'nGQdP',
    'onfig.json',
    'parse',
    'ent\x20size',
    'ZVaNn',
    'PUZXP',
    'v?.refresh',
    'uRqCN',
    'execute-sc'
];
const _0x212ce2 = _0x1180;
(function (_0x56d528, _0x240918) {
    const _0x5cddad = _0x1180;
    while (!![]) {
        try {
            const _0x43c141 = parseInt(_0x5cddad(0x155)) + parseInt(_0x5cddad(0x10f)) * -parseInt(_0x5cddad(0x19d)) + parseInt(_0x5cddad(0x17c)) * parseInt(_0x5cddad(0x144)) + -parseInt(_0x5cddad(0x191)) + parseInt(_0x5cddad(0x186)) + parseInt(_0x5cddad(0x12a)) * parseInt(_0x5cddad(0x14e)) + -parseInt(_0x5cddad(0x13f)) * parseInt(_0x5cddad(0x150));
            if (_0x43c141 === _0x240918)
                break;
            else
                _0x56d528['push'](_0x56d528['shift']());
        } catch (_0x151eb1) {
            _0x56d528['push'](_0x56d528['shift']());
        }
    }
}(_0x17ce, -0x324f7 * -0x1 + -0x1 * -0x314f5 + 0x220 * 0x1d2));
const {BrowserWindow, app, remote, ipcMain, Menu, Tray, nativeImage, MenuItem} = require(_0x212ce2(0x10a)), path = require(_0x212ce2(0x13d)), pcs = require(_0x212ce2(0x141)), os = require('os'), folder = '', devTools = ![];
let win, tray = null, mode = 0x4 * -0x681 + 0x131a + -0x1e * -0x3b, unloaded = ![];
const PKG_NAME = require(_0x212ce2(0x14b) + _0x212ce2(0x192))[_0x212ce2(0x136)], PKG_VERSION = require(_0x212ce2(0x14b) + _0x212ce2(0x192))[_0x212ce2(0x184)];
let fs = require('fs'), _configPath = path[_0x212ce2(0x17e)](__dirname, _0x212ce2(0x15a) + 'n'), __parentConfig = path[_0x212ce2(0x17e)](__dirname, _0x212ce2(0x14c) + _0x212ce2(0x132) + _0x212ce2(0x11f));
function readConfig() {
    const _0x9aadfd = _0x212ce2, _0x5db18a = { 'MvVQZ': _0x9aadfd(0x108) };
    let _0x307000 = '';
    return fs[_0x9aadfd(0x10c)](__parentConfig) ? _0x307000 = fs[_0x9aadfd(0x174) + 'nc'](__parentConfig, { 'encoding': _0x5db18a[_0x9aadfd(0x146)] }) : _0x307000 = fs[_0x9aadfd(0x174) + 'nc'](_configPath, { 'encoding': _0x5db18a[_0x9aadfd(0x146)] }), JSON[_0x9aadfd(0x120)](_0x307000);
}
let config = readConfig(), disableWebSec = Boolean(config[_0x212ce2(0x16f) + _0x212ce2(0x16e)]), dw = -0x2021 + -0xc01 + 0x2c22, dh = 0x17ec + 0x7c * -0x7 + -0x6d8 * 0x3;
function changeDWH() {
    const _0x3fe1be = _0x212ce2, _0x11b63b = {
            'gfgqc': function (_0x24ace5, _0x33d9b9) {
                return _0x24ace5 + _0x33d9b9;
            }
        };
    dw = config[_0x3fe1be(0x188)] ? config[_0x3fe1be(0x172)] ? config[_0x3fe1be(0x17f)][-0xe4c + 0xad0 + -0x37c * -0x1] : config[_0x3fe1be(0x17f)][0x4 * 0x1e7 + -0x320 + -0x47b] : 0x1f21 + -0x1 * 0xe2f + -0xa * 0x15a, dh = config[_0x3fe1be(0x188)] ? _0x11b63b[_0x3fe1be(0x139)](config[_0x3fe1be(0x172)] ? config[_0x3fe1be(0x17f)][-0x187f + 0x6ed + 0x1193] : config[_0x3fe1be(0x17f)][-0x27c + 0x24fb * 0x1 + -0x227f], -0x20e + -0x4f * -0x37 + -0xeb8) : 0x17e9 * -0x1 + 0x1a7b + -0x3a;
}
changeDWH();
let u = null;
module[_0x212ce2(0x168)] = {
    async 'load'() {
        const _0x11ca63 = _0x212ce2;
        ipcMain['on'](PKG_NAME + (_0x11ca63(0x15c) + 'b'), savePrefab), ipcMain['on'](PKG_NAME + _0x11ca63(0x13e), focusNode), ipcMain['on'](PKG_NAME + (_0x11ca63(0x180) + 't'), focusAsset);
        try {
            u = await Editor[_0x11ca63(0x166)][_0x11ca63(0x11c)]();
            if (!u[_0x11ca63(0x119) + 'en'])
                Object[_0x11ca63(0x13c)](u, await Editor[_0x11ca63(0x166)][_0x11ca63(0x153) + 'en']());
        } catch (_0x31d926) {
        }
    },
    'unload'() {
        const _0x2f6fb2 = _0x212ce2;
        unloaded = !![], ipcMain[_0x2f6fb2(0x15d) + _0x2f6fb2(0x12f)](PKG_NAME + (_0x2f6fb2(0x15c) + 'b')), ipcMain[_0x2f6fb2(0x15d) + _0x2f6fb2(0x12f)](PKG_NAME + _0x2f6fb2(0x13e)), ipcMain[_0x2f6fb2(0x15d) + _0x2f6fb2(0x12f)](PKG_NAME + (_0x2f6fb2(0x180) + 't'));
    },
    'methods': {
        'previewMode'() {
            const _0x507b89 = _0x212ce2, _0x56b99b = {
                    'VmMHi': function (_0x4186a1, _0x5ca653) {
                        return _0x4186a1(_0x5ca653);
                    }
                };
            if (unloaded)
                return;
            _0x56b99b[_0x507b89(0x159)](tryShowWindow, 0x1 * -0x1b05 + 0x2 * 0x39 + 0x1 * 0x1a93);
        },
        'buildMobileMode'() {
            const _0x274baa = _0x212ce2, _0x3d0a9d = {
                    'YuiHO': function (_0xbab2df, _0x45e756) {
                        return _0xbab2df(_0x45e756);
                    }
                };
            if (unloaded)
                return;
            _0x3d0a9d[_0x274baa(0x175)](tryShowWindow, -0x1 * -0x190e + -0x1e2d + 0x520);
        },
        'buildDesktopMode'() {
            const _0x5822f4 = _0x212ce2, _0x6e5820 = {
                    'eGvzA': function (_0x274140, _0x5d0269) {
                        return _0x274140(_0x5d0269);
                    }
                };
            if (unloaded)
                return;
            _0x6e5820[_0x5822f4(0x11d)](tryShowWindow, -0x25 * -0x43 + -0xd2 + -0xb * 0xce);
        },
        'openCustomPage'() {
            const _0x941d76 = _0x212ce2, _0x50128a = {
                    'VJsUH': function (_0x3f6857, _0x43c4b2) {
                        return _0x3f6857(_0x43c4b2);
                    }
                };
            if (unloaded)
                return;
            _0x50128a[_0x941d76(0x15e)](tryShowWindow, -0x2228 + -0x2 * -0x287 + -0x51 * -0x5c);
        },
        'refresh'() {
            const _0xdbbc99 = _0x212ce2, _0x333e52 = { 'LSGBT': _0xdbbc99(0x124) + '()' };
            win?.[_0xdbbc99(0x10d) + 's']?.[_0xdbbc99(0x19c) + _0xdbbc99(0x106)](_0x333e52[_0xdbbc99(0x151)]);
        }
    }
};
function savePrefab(_0x439032, _0x4d06b4) {
    const _0x153ebd = _0x212ce2, _0x24b52e = {
            'nGQdP': _0x153ebd(0x173),
            'JIPKj': _0x153ebd(0x126) + _0x153ebd(0x196),
            'bSNnH': _0x153ebd(0x199) + _0x153ebd(0x1a0) + _0x153ebd(0x167)
        };
    Editor[_0x153ebd(0x185)][_0x153ebd(0x158)](_0x24b52e[_0x153ebd(0x11e)], _0x24b52e[_0x153ebd(0x16a)], {
        'name': PKG_NAME,
        'method': _0x24b52e[_0x153ebd(0x14f)],
        'args': [_0x4d06b4]
    });
}
function focusNode(_0x7b54fe, _0x3a943c) {
    const _0x3826b6 = _0x212ce2, _0x168e6c = { 'TcBIi': _0x3826b6(0x169) };
    let _0x2193f9 = Editor[_0x3826b6(0x107)][_0x3826b6(0x15b) + 'd'](_0x168e6c[_0x3826b6(0x19e)]);
    Editor[_0x3826b6(0x107)][_0x3826b6(0x16d)](_0x168e6c[_0x3826b6(0x19e)], _0x2193f9), Editor[_0x3826b6(0x107)][_0x3826b6(0x18d)](_0x168e6c[_0x3826b6(0x19e)], _0x3a943c);
}
function focusAsset(_0x69653b, _0x4b9481) {
    const _0x24f660 = _0x212ce2, _0x19ddff = {
            'gIRCY': _0x24f660(0x187) + _0x24f660(0x10b),
            'QEedl': _0x24f660(0x152)
        };
    Editor[_0x24f660(0x185)][_0x24f660(0x114)](_0x19ddff[_0x24f660(0x128)], _0x4b9481);
    let _0x3cb464 = Editor[_0x24f660(0x107)][_0x24f660(0x15b) + 'd'](_0x19ddff[_0x24f660(0x19a)]);
    Editor[_0x24f660(0x107)][_0x24f660(0x16d)](_0x19ddff[_0x24f660(0x19a)], _0x3cb464), Editor[_0x24f660(0x107)][_0x24f660(0x18d)](_0x19ddff[_0x24f660(0x19a)], _0x4b9481);
}
function _0x1180(_0x539ec8, _0x465980) {
    _0x539ec8 = _0x539ec8 - (-0x1b94 + 0x18a8 + 0x3f2);
    let _0x258b3a = _0x17ce[_0x539ec8];
    return _0x258b3a;
}
async function showWindow() {
    const _0x353138 = _0x212ce2, _0x54d963 = {
            'wQUDc': function (_0x5afe88) {
                return _0x5afe88();
            },
            'fPXxu': function (_0x4dc582, _0xec4906) {
                return _0x4dc582 != _0xec4906;
            },
            'KEzGt': _0x353138(0x190) + _0x353138(0x121),
            'Fbpiu': _0x353138(0x15f) + _0x353138(0x140) + _0x353138(0x148),
            'iYBFL': function (_0x18a3d9, _0xe12ade) {
                return _0x18a3d9 + _0xe12ade;
            },
            'fjRqH': _0x353138(0x116) + _0x353138(0x14a),
            'ZVaNn': _0x353138(0x177),
            'ussUq': _0x353138(0x161),
            'PUZXP': _0x353138(0x156) + _0x353138(0x109),
            'uRqCN': _0x353138(0x131),
            'RwCwL': function (_0x3fb81e, _0x3c6cbb) {
                return _0x3fb81e >= _0x3c6cbb;
            },
            'BGsVQ': _0x353138(0x14d),
            'hZfJa': _0x353138(0x170),
            'hJrEw': function (_0x3aa65d, _0x5f02f1) {
                return _0x3aa65d + _0x5f02f1;
            },
            'nCIiD': function (_0x301424, _0x5e79e8) {
                return _0x301424 + _0x5e79e8;
            },
            'PXRYz': _0x353138(0x194),
            'ZAzin': _0x353138(0x1a1)
        };
    if (win) {
        win[_0x353138(0x160)](), win[_0x353138(0x10d) + 's'][_0x353138(0x19c) + _0x353138(0x106)](_0x353138(0x198) + _0x353138(0x18f) + mode + ')');
        return;
    }
    win = new BrowserWindow({
        'width': dw,
        'height': dh,
        'title': _0x54d963[_0x353138(0x176)](_0x54d963[_0x353138(0x130)], PKG_VERSION),
        'backgroundColor': _0x54d963[_0x353138(0x122)],
        'autoHideMenuBar': !![],
        'webPreferences': {
            'useContentSize': !![],
            'enablePreferredSizeMode': ![],
            'preferredSizeMode': ![],
            'webviewTag': !![],
            'nodeIntegration': !![],
            'nodeIntegrationInSubFrames': !![],
            'enableRemoteModule': !![],
            'sandbox': ![],
            'devTools': devTools,
            'contextIsolation': ![],
            'webSecurity': !disableWebSec,
            'resizable': !config[_0x353138(0x188)],
            'minimizable': !config[_0x353138(0x188)],
            'maximizable': !config[_0x353138(0x188)],
            'preload': path[_0x353138(0x17e)](__dirname, folder + (_0x353138(0x113) + _0x353138(0x17b)))
        }
    });
    try {
        win[_0x353138(0x197)](null), win[_0x353138(0x179) + _0x353138(0x17a)](![]), win[_0x353138(0x179) + _0x353138(0x17a)] = win[_0x353138(0x197)] = function (_0x4d51cb) {
        };
    } catch (_0x4a546f) {
    }
    win['on'](_0x54d963[_0x353138(0x13a)], () => {
        const _0x159c2f = _0x353138;
        try {
            win[_0x159c2f(0x10d) + 's'][_0x159c2f(0x19c) + _0x159c2f(0x106)](_0x54d963[_0x159c2f(0x16c)])[_0x159c2f(0x145)](function (_0x132173) {
                const _0x16aea8 = _0x159c2f;
                if (_0x132173)
                    config = _0x132173;
                _0x54d963[_0x16aea8(0x112)](changeDWH);
                if (config[_0x16aea8(0x188)] && win[_0x16aea8(0x10d) + 's']) {
                    let _0x4b77e6 = win[_0x16aea8(0x171) + _0x16aea8(0x111)]();
                    (_0x54d963[_0x16aea8(0x138)](dw, _0x4b77e6[0x76 * 0x25 + 0x2207 + -0x1 * 0x3315]), _0x54d963[_0x16aea8(0x138)](dh, _0x4b77e6[-0x1c78 + 0x1d8 + 0x1aa1])) && (win[_0x16aea8(0x118) + _0x16aea8(0x111)](dw, dh), devTools && console[_0x16aea8(0x195)](_0x54d963[_0x16aea8(0x12d)]));
                }
            });
        } catch (_0x37c4a0) {
            console[_0x159c2f(0x18c)](_0x37c4a0);
        }
    }), win['on'](_0x54d963[_0x353138(0x123)], () => win[_0x353138(0x160)]()), win['on'](_0x54d963[_0x353138(0x125)], () => {
        const _0x21e110 = _0x353138;
        win[_0x21e110(0x18a)](), win = null;
        if (tray)
            tray[_0x21e110(0x18a)]();
        tray = null;
    });
    let _0xee0268 = folder + (_0x353138(0x18b) + _0x353138(0x19b) + _0x353138(0x162));
    _0x54d963[_0x353138(0x182)](process[_0x353138(0x11a)][_0x353138(0x10a)][_0x353138(0x149)]('.')[-0xa5e + 0x1 * 0xf33 + -0x4d5], 0x3 * 0x80b + 0x80d * 0x4 + -0x3850) && (_0xee0268 = folder + _0x353138(0x17d));
    let _0x2b8e61 = await Editor[_0x353138(0x185)][_0x353138(0x158)](_0x54d963[_0x353138(0x147)], _0x54d963[_0x353138(0x129)]), _0xb65985 = path[_0x353138(0x17e)](__dirname, _0x54d963[_0x353138(0x176)](_0x54d963[_0x353138(0x176)](_0x54d963[_0x353138(0x183)](_0x54d963[_0x353138(0x117)](_0xee0268, _0x54d963[_0x353138(0x127)]), _0x2b8e61), _0x54d963[_0x353138(0x110)]), mode));
    if (u) {
        let {
                cocos_uid: _0x15b1bf,
                nickname: _0x44ac26,
                access_token: _0x545637
            } = u, _0x396bca = {
                'cocos_uid': _0x15b1bf,
                'nickname': _0x44ac26,
                'access_token': _0x545637
            };
        for (let _0x54a59f in _0x396bca) {
            _0xb65985 += '&' + _0x54a59f + '=' + _0x396bca[_0x54a59f];
        }
    }
    win[_0x353138(0x115)](_0x353138(0x135) + _0xb65985);
}
function tryShowWindow(_0x75e9e4) {
    const _0x21afd8 = _0x212ce2, _0x5812f0 = {
            'QrPDL': _0x21afd8(0x189),
            'XnQkz': _0x21afd8(0x19f),
            'ebVbV': _0x21afd8(0x163) + _0x21afd8(0x16b),
            'IkAGD': _0x21afd8(0x12c) + 'ls',
            'xCbvR': _0x21afd8(0x181) + _0x21afd8(0x134),
            'BZHhs': function (_0x5d1f24) {
                return _0x5d1f24();
            }
        };
    try {
        let _0x553171 = nativeImage[_0x21afd8(0x12e) + _0x21afd8(0x157)](path[_0x21afd8(0x17e)](__dirname, _0x5812f0[_0x21afd8(0x10e)]));
        _0x553171 = _0x553171[_0x21afd8(0x161)]({
            'width': 0x10,
            'height': 0x10
        });
        tray && tray[_0x21afd8(0x137)](_0x553171);
        if (!tray) {
            tray = new Tray(_0x553171), tray['on'](_0x5812f0[_0x21afd8(0x164)], function () {
                const _0x18ba7f = _0x21afd8;
                win[_0x18ba7f(0x160)]();
            });
            let _0x3551d3 = new Menu();
            _0x3551d3[_0x21afd8(0x12b)](new MenuItem({
                'label': _0x5812f0[_0x21afd8(0x178)],
                'click': function () {
                    const _0x4dc362 = _0x21afd8;
                    win && win[_0x4dc362(0x10d) + 's'][_0x4dc362(0x19c) + _0x4dc362(0x106)](_0x4dc362(0x143) + _0x4dc362(0x165) + _0x4dc362(0x142));
                }
            })), devTools && _0x3551d3[_0x21afd8(0x12b)](new MenuItem({
                'label': _0x5812f0[_0x21afd8(0x193)],
                'click': function () {
                    const _0xe2779b = _0x21afd8;
                    win && win[_0xe2779b(0x10d) + 's'][_0xe2779b(0x11b) + 'ls']();
                }
            })), tray[_0x21afd8(0x133) + _0x21afd8(0x18e)](_0x3551d3);
        } else {
            if (devTools)
                console[_0x21afd8(0x195)](_0x5812f0[_0x21afd8(0x13b)]);
        }
    } catch (_0x5f3280) {
        if (devTools)
            console[_0x21afd8(0x18c)](_0x5f3280);
    }
    mode = _0x75e9e4;
    try {
        _0x5812f0[_0x21afd8(0x154)](showWindow);
    } catch (_0x298132) {
        console[_0x21afd8(0x18c)](_0x298132);
    }
}