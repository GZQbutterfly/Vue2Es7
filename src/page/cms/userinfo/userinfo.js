import { Component, Vue } from 'vue-property-decorator';


// ===>
import userinfoHTML from './userinfo.html';
import './userinfo.scss';

@Component({
    template: userinfoHTML
})
export class UserInfoPage {
    mounted(){
        console.log('cms UserInfoPage')
    }

}
