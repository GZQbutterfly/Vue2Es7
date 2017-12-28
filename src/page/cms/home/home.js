import { Component, Vue } from 'vue-property-decorator';
import { debounce } from 'lodash';

// ===>
import homeHTML from './home.html';
import './home.scss';

@Component({
    template: homeHTML
})
export class HomePage {
    mounted(){
        console.log('cms HomePage', debounce);

    }
}
