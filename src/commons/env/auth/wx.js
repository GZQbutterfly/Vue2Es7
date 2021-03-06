import { merge, isEmpty } from 'lodash';
import { wxAppid, getUrlParams, getAuthUser, setAuthUser } from '../common.env';

export class WxAuth {
    private _$vm;
    private _$store;
    private _$router;
    private _$state;
    private _$http;
    private _$user;
    constructor(_vm) {
        let _self = this;
        _self._$vm = _vm;
        _self._$store = _vm.$store;
        _self._$router = _vm.$router;
        _self._$state = _self._$store.state;
        _self._$http = _self._$state.$http;
        let _authUser = getAuthUser();
        if (isEmpty(_authUser)) {
            _self.auth();
        } else {
            _self.setWxUser(_authUser);
        }
    }
    auth() {
        let _self: any = this;
        let urlParam: any = getUrlParams();
        if (isEmpty(getAuthUser())) {
            if (!urlParam.code) {
                let _href = encodeURIComponent(location.href);// + location.pathname + location.hash;
                let _params = `appid=${wxAppid}&redirect_uri=${_href}&response_type=code&scope=snsapi_userinfo&state=hpt_state#wechat_redirect`;
                location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?' + _params);
            } else {
                _self.queryWxUser(urlParam.code);
            }
        } 
    }
    queryWxUser(code) {
        let _self = this;
        return _self._$http.post('api/wx/g_wx_user', { code }).then((res) => {
            let _result = res.data;
            if (_result.errorCode) {
                // reauth
                //_self.auth();
            } else {
                _self.setWxUser(_result);
            }
        });
    }
    setWxUser(user) {
        let _self = this;
        _self._$state.workVO.authUser = user;
        setAuthUser(user);
    }
}

