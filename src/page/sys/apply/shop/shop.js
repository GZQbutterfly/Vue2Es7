// 申请开店
import { Component } from 'vue-property-decorator';
import  BaseVue  from 'base.vue';
import { isEmpty } from 'lodash';
import { getLocalUserInfo, toCMS, isNotLogin, toLogin } from 'common.env';
import { ApplyShopInvitecode } from '../invitecode/invitecode';


import shopService from './shop.service';
import './shop.scss';
@Component({
    template: require('./shop.html'),
})
export class ApplyShop extends BaseVue {
    formstate = {};

    //申请开店填写的信息
    shopInfo = {
        sex: '',
        wdName: '',
        school: '',
        wxNum: '',
        upUserId: '',//upperUSERID
        inviteId: '',//upUserId
        wdImg: '',
    };
    //通过邀请码得到的供货人的信息
    incodeInfo = {
        userid: '',
        username: '',
        userimg: './static/images/pic-login.png',
        sex: '',
        phone: '',
        leave: '',
    }
    schoolList = [];
    rule_checked = true;
    //是否开店成功
    registerSuccess = false;
    incode = '';
    doRegWd = false;
    _$popup;
    _$dialog;
    _$service;

    mounted() {
        let _self = this;
        this._$popup = _self.$store.state.$popup;
        this._$dialog = _self.$store.state.$dialog;
        this._$service = shopService(this.$store);
        _self.shopInfo.wdImg = _self.$store.state.workVO.user.headimgurl || (location.origin + '/static/images/pic-login.png');
        _self.incode = this.$route.query.incode;
        let regShopInfo = sessionStorage.getItem("regShopInfo");
        if (regShopInfo) {
            regShopInfo = JSON.parse(regShopInfo);
            Object.assign(this.shopInfo, regShopInfo);
            sessionStorage.removeItem("regShopInfo");
        }
        this.$nextTick(() => {
            document.title = "申请开店";
            _self.isLoginCheckHasWd();
        })
    }

    isLoginCheckHasWd() {
        let _self = this;
        let _incode = this.$route.query.incode;
        let _auto = this.$route.query.auto;
        if (isNotLogin()) {
            //to login
            let _url = _incode ? ('?incode=' + _incode) : '';
            _url += _auto ? ('?auto=' + _auto) : '';
            toLogin(this.$router, { toPath: 'applyShop', realTo: 'applyShop' + _url });
        } else {
            //check hasWd
            this.queryUserHasShop(() => {
                _self.queryCodeInfo();
                _self.queryAllSchool();
            })
        }
    }

    /**
     * 查询用户是否开店
     */
    queryUserHasShop(cb) {
        let _self = this;
        this._$service.queryUserHasShop().then((res) => {
            console.log('用户开店信息', res);
            if (res.data.errorCode) {
                _self._$dialog({
                    dialogObj: {
                        title: '提示',
                        type: 'error',
                        content: res.data.msg,
                        mainBtn: '确定',
                        mainFn() {
                            this.$router.push('userinfo');
                        }
                    }
                });
            } else if (!isEmpty(res.data)) {
                _self._$dialog({
                    dialogObj: {
                        title: '开店提示',
                        type: 'info',
                        content: '您的账户已有店铺，不能继续开店！',
                        mainBtn: '管理我的店铺',
                        mainFn() {
                            toCMS('cmsHome');
                        }
                    }
                });
            } else {
                cb && cb();
            }
        });
    }

    /**
     * 查询所有学校的名称
     */
    queryAllSchool() {
        let _self = this;
        this._$service.queryAllSchool().then((res) => {
            console.log('所有学校名称', res);
            _self.schoolList = res.data.schoolList;
        });
    }

    /**
     * 查询邀请码
     */
    queryCodeInfo() {
        let _self = this;
        if (_self.incode) {
            _self._$service.queryCodeInfo(_self.incode).then((res) => {
                res = res.data;
                if (res.errorCode) {
                    _self.incodeError('系统错误,请稍后再试！');
                } else {
                    let flag = res.flag;
                    if (flag) {
                        _self.incodeInfo.userid = res.upUserId;
                        _self.incodeInfo.username = res.upUserName;
                        _self.incodeInfo.phone = res.upPhoneNum;
                        _self.incodeInfo.sex = ['', '男', '女'][res.upSex || 0];
                        res.headimgurl && (_self.incodeInfo.userimg = res.headimgurl);
                        _self.incodeInfo.leave = res.vipGrade;
                        _self.shopInfo.upUserId = _self.incodeInfo.userid;
                    } else {
                        _self.incodeInfo.userid = res.upperUserId;
                        _self.incodeInfo.username = res.upperUserName;
                        _self.incodeInfo.phone = res.upperPhoneNum;
                        _self.incodeInfo.sex = ['', '男', '女'][res.upperSex || 0];
                        res.upperHeadimgurl && (_self.incodeInfo.userimg = res.upperHeadimgurl);
                        _self.incodeInfo.leave = res.upperVipGrade;
                        _self.shopInfo.upUserId = _self.incodeInfo.userid;
                    }
                    _self.shopInfo.inviteId = res.upUserId;
                    if (this.$route.query.auto == undefined) {
                        //自动获取的邀请码一定是正确的 ../反正不弹窗
                        let msg = '';
                        if (flag) {
                            msg = '根据您的邀请码信息，你的邀请人' + res.upUserName + '已成为您的进货人！';
                        } else {
                            msg = '根据您的邀请码信息，邀请人' + res.upUserName + '的等级不够，不能成为您的进货人，系统已自动选择 ' + res.upperUserName + ' 用户成为您的进货人';
                        }
                        _self.dialogPopup(msg);
                    }
                }
            });
        } else {
            _self.incodeError('邀请码获取失败,请稍后再试！');
        }
    }

    incodeError(msg) {
        let _self = this;
        _self._$dialog({
            dialogObj: {
                title: '提示',
                type: 'error',
                content: msg,
                assistBtn: '',
                mainBtn: '确定',
                mainFn() {
                    _self.$router.push('applyShopCampaign')
                }
            }
        });
    }

    dialogPopup(msg) {
        let _self = this;
        _self._$dialog({
            dialogObj: {
                title: '选定进货人',
                type: 'info',
                content: msg,
                assistBtn: '',
                mainBtn: '填写开店信息',
                mainFn() {
                }
            }
        });
    }

    goHome() {
        toCMS('cmsHome');
    }

    saveData() {
        if(this.doRegWd){
            return;
        }
        this.doRegWd = true;
        let _self = this;
        let _toast = this.$store.state.$toast;
        let _formstate = this.formstate;
        let _$dialog = this.$store.state.$dialog;
        if (_formstate.$invalid) {
            this.doRegWd = false;
            return;
        } else if (!_self.rule_checked) {
            _self._$dialog({
                dialogObj: {
                    title: '提示',
                    type: 'info',
                    content: '注册微店前需同意并签订《开店入驻及用户使用协议》！',
                    mainBtn: '我知道了',
                    mainFn() {
                    }
                }
            });
            this.doRegWd = false;
        } else {
            console.log('开店信息', _self.shopInfo)
            this._$service.wdRegister(_self.shopInfo).then((res) => {
                if (res.data.success) {
                    _self.registerSuccess = true;
                    let arr = _self.$refs.applyshop.querySelectorAll('.applyshop_ipt');
                    for (let i = 0, len = arr.length; i < len; i++) {
                        arr[i].setAttribute('disabled', 'disabled');
                    }
                    _self._$dialog({
                        dialogObj: {
                            title: '提示',
                            type: 'success',
                            content: '恭喜您开店成功，立马去管理您的微店吧！',
                            mainBtn: '管理我的微店',
                            mainFn() {
                                _self.goHome();
                            }
                        }
                    });
                } else {
                    let _self = this;
                    let _$dialog = _self.$store.state.$dialog;
                    _$dialog({
                        dialogObj: {
                            title: '提示',
                            content: res.data.msg,
                            assistBtn: '',
                            mainBtn: '确定',
                            type: 'error',
                            mainFn() {
                            }
                        }
                    });
                }
                this.doRegWd = false;
            });
        }
    }

    toWiki() {
        sessionStorage.setItem("regShopInfo", JSON.stringify(this.shopInfo));
        this.$router.push({ path: 'applyShopWiki', query: { type: 'rule' } });
    }

    sexBlur(value) {
        this.shopInfo.sex = this.shopInfo.sex || value;
    }

    schoolBlur(value) {
        this.shopInfo.school = this.shopInfo.school || value;
    }

}
