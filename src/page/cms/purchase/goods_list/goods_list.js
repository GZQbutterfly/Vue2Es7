import { Component, Vue} from 'vue-property-decorator';
import './goods_list.scss';

@Component({
    template: require('./goods_list.html'),
    props: ["dataList"]
})

export class GoodsList extends Vue {
    goodsList = { 'data': [] };

    mounted() {
        this.goodsList = this.$props.dataList;
    }
    toDetail(id) {
        this.$router.push({ path: "cmsPurchaseGoodsDetail", query: { goodsId: id } });
    }
}
