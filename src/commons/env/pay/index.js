import { WxPay } from './wxpay';
import { AliPay } from './alipay';
import { AppPay } from './apppay';
import { axiosConfig, isWeiXin, isApp } from '../common.env';

let payEnv = {
    isWx: false,
    isApp: false,
    isAli: false,
    vm: null,
};

/**
 * 注册支付签名
 */
export function registerPaySign(_vm) {
    payEnv.vm = _vm;
    let _pay = null;
    if (isWeiXin()) {
        // 手机微信支付
        _pay = new WxPay(_vm);
        payEnv.isWx = true;
    } else if (isApp()) {
        // 手机网页支付
        _pay = new AppPay(_vm);
        payEnv.isApp = true;
    } else {
        // 手机支付宝支付 isAli()
        _pay = new AliPay(_vm);
        payEnv.isAli = true;
    }
    _pay.sign();
    return _pay;
}