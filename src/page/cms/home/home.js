import { Component, Vue } from 'vue-property-decorator';


// ===>
import homeHTML from './home.html';
import './home.scss';

@Component({
    template: homeHTML
})
export class HomePage {
    mounted(){
        console.log('cms HomePage');

    }
}
