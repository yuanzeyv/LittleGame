const _0x4cfd = [
    'parse',
    '318055GlqESW',
    '3403RmpTQf',
    'readConfig',
    '1183885SWdfCn',
    '1ikkKjh',
    'join',
    'existsSync',
    '155hKffrk',
    'mUcIp',
    'path',
    'ync',
    '826574rMDXow',
    'nspector-c',
    'config.jso',
    '../cocos-i',
    'HxJrX',
    '318489SGEPOz',
    '656297wfYQES',
    'saveConfig',
    'onfig.json',
    '854928lEggDw',
    'writeFileS',
    'readFileSy',
    'stringify',
    '3LgUvxc',
    'utf-8',
    '1oDSOcB'
];
const _0x596cf1 = _0x67f0;
(function (_0x364baf, _0x551d9a) {
    const _0x5cf08a = _0x67f0;
    while (!![]) {
        try {
            const _0x4d40b4 = parseInt(_0x5cf08a(0x186)) + -parseInt(_0x5cf08a(0x18d)) * -parseInt(_0x5cf08a(0x191)) + parseInt(_0x5cf08a(0x189)) + -parseInt(_0x5cf08a(0x18f)) * parseInt(_0x5cf08a(0x185)) + -parseInt(_0x5cf08a(0x17c)) * -parseInt(_0x5cf08a(0x192)) + -parseInt(_0x5cf08a(0x180)) + parseInt(_0x5cf08a(0x195)) * -parseInt(_0x5cf08a(0x194));
            if (_0x4d40b4 === _0x551d9a)
                break;
            else
                _0x364baf['push'](_0x364baf['shift']());
        } catch (_0x5ef467) {
            _0x364baf['push'](_0x364baf['shift']());
        }
    }
}(_0x4cfd, -0x85172 + 0x1170aa + 0x1022b));
function _0x67f0(_0x58eb9f, _0x3bee5e) {
    _0x58eb9f = _0x58eb9f - (-0x1b5 * -0xd + -0x2259 + 0xda3);
    let _0x18b58a = _0x4cfd[_0x58eb9f];
    return _0x18b58a;
}
let fs = require('fs'), path = require(_0x596cf1(0x17e)), _configPath = path[_0x596cf1(0x196)](__dirname, _0x596cf1(0x182) + 'n'), __parentConfig = path[_0x596cf1(0x196)](__dirname, _0x596cf1(0x183) + _0x596cf1(0x181) + _0x596cf1(0x188));
global[_0x596cf1(0x193)] = () => {
    const _0x3d80a2 = _0x596cf1, _0x1c5a2c = { 'HxJrX': _0x3d80a2(0x18e) };
    let _0x4f00aa = '';
    return fs[_0x3d80a2(0x17b)](__parentConfig) ? _0x4f00aa = fs[_0x3d80a2(0x18b) + 'nc'](__parentConfig, { 'encoding': _0x1c5a2c[_0x3d80a2(0x184)] }) : _0x4f00aa = fs[_0x3d80a2(0x18b) + 'nc'](_configPath, { 'encoding': _0x1c5a2c[_0x3d80a2(0x184)] }), JSON[_0x3d80a2(0x190)](_0x4f00aa);
}, global[_0x596cf1(0x187)] = _0x23139e => {
    const _0x34b107 = _0x596cf1, _0x28e56e = { 'mUcIp': _0x34b107(0x18e) };
    let _0x5ac55d = JSON[_0x34b107(0x18c)](_0x23139e);
    fs[_0x34b107(0x18a) + _0x34b107(0x17f)](__parentConfig, _0x5ac55d, { 'encoding': _0x28e56e[_0x34b107(0x17d)] });
};