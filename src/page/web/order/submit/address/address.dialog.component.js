import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import addressDialogService from './address.dialog.service';
import { get, merge, find, orderBy } from 'lodash';
import { getZoneData } from 'common.env';

import  Swiper from 'swiper';


import './address.dialog.component.scss';
// ==>
@Component({
    props: {
        close: {
            type: Function,
            default: () => { }
        },
        selectAddress: {
            type: Function,
            default: () => { }
        },
        selectId: {
            type: [String, Number],
            default: ''
        }
    },
    template: require('./address.dialog.component.html')
})
export class AddressDialogComponent extends Vue {
    showDialogMode = true;
    showAddressDiaogContent = false;
    showAddAddress = false;
    type = 'create';
    addressList = [];
    activeItem = {};
    _$service;
    mounted() {
        this._$service = addressDialogService(this.$store);
        this.$nextTick(() => {
            localStorage.____addressBack = '11';
            this.queryAddressList();
            this.showAddressDiaogContent = true;
        });
    }
    renderSwiper() {
        let _self = this;
        let _dialogRef = _self.$refs.dialogRef
        _self.swiper = new Swiper(_dialogRef.querySelector('.swiper-container'), {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            autoHeight: true,
            observer: true,
            scrollbar: {
                el: '.swiper-scrollbar'
            },
        });
    }
    queryAddressList() {
        let _self = this;
        this._$service.queryAddressList().then((res) => {
            this.addressList = get(res, 'data.data');
            let _addressList = this.addressList;
            _addressList.sort((a, b) => b.isDefault - a.isDefault);
            if (_addressList.length) {
                for (let i = 0, len = _addressList.length; i < len; i++) {
                    let _address = _addressList[i];
                    _address.addressInfo = getZoneData(_address);
                    if (_self.selectId) {
                        _address._active = _self.selectId === _address.addrId;
                    } else {
                        if (_address.isDefault === 1) {
                            _address._active = true;
                        }
                    }
                }
            }
            setTimeout(() => {
                this.renderSwiper();
            });
        });
    }
    closeDialog() {
        let _self = this;
        this.showDialogMode = false;
        this.showAddressDiaogContent = false;
        setTimeout(() => {
            _self.close();
        }, 500);
    }
    toCreate() {
        this.$router.push({path:'address', query:{type:'create'}});
    }
    toUpdate(item) {
        this.$router.push({path:'address', query:{type:'update', item}});
    }
}
