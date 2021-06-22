import SongContainer from "./SongContainer.js";


const $template = document.createElement('template');
$template.innerHTML = `
<ul class="song-list"> 

</ul>
`;

export default class SongList extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode('true'));
        this.$list = this.querySelector('.song-list');
    }

    static get observedAttributes() {
        return ['songs'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'songs') {
            let songs = JSON.parse(newValue);

            for(let songData of songs) {
                let $songContainer = new SongContainer();
                $songContainer.setAttribute('index', songData.index)
                $songContainer.setAttribute('name', songData.name);
                $songContainer.setAttribute('singer', songData.singer);
                $songContainer.setAttribute('path', songData.path);
                $songContainer.setAttribute('image', songData.image);
                this.$list.appendChild($songContainer);
            }
            
        }
    }



    


}

window.customElements.define('song-list', SongList);

