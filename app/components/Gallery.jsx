/**
 * Created at 16/1/22.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import React from 'react';
import '../style/Gallery.less';


export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryWidth: 0
        };
    }

    componentDidMount() {
        const fixGalleryWidth = (function () {
            let galleryWidth = parseInt(getComputedStyle(document.querySelector('.gallery')).width);
            if (galleryWidth > 339) { // 6plus
                galleryWidth = 339;
            }
            this.setState({galleryWidth});
        }).bind(this);
        fixGalleryWidth();
        window.addEventListener('resize', fixGalleryWidth, false);
    }

    render () {

        return (<section className="gallery">{this.props.imgList.map((imgObj, i) => {
            return (<div className="gallery-cell" key={i} style={{width: this.state.galleryWidth / 3, height: this.state.galleryWidth / 3}}>
                <div className="gallery-img" style={{backgroundImage: `url(${imgObj.thumbnail})`}}></div>
            </div>);
        })}</section>);
    }
}