// // import React, { useEffect } from 'react';
// // import PropTypes from 'prop-types';

// // function WistiaPlayer({ videoId, wrapper }) {
// //   useEffect(() => {
// //     const script1 = document.createElement('script');
// //     script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
// //     script1.async = true;
// //     const script2 = document.createElement('script');
// //     script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
// //     script2.async = true;
// //     const div = document.createElement('div');
// //     div.innerHTML = `<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_${videoId} seo=false videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/${videoId}/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>`;
// //     const container = document.getElementById(wrapper);
// //     container.appendChild(script1);
// //     container.appendChild(script2);
// //     container.appendChild(div);
// //     return () => {
// //       container.innerHTML = '';
// //     };
// //   }, [videoId, wrapper]);
// //   return <div id={`${wrapper}`} />;
// // }
// // WistiaPlayer.propTypes = {
// //   videoId: PropTypes.string.isRequired,
// //   wrapper: PropTypes.string.isRequired,
// // };
// // export default WistiaPlayer;


// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

// function WistiaPlayer({ videoId, wrapper }) {
//   useEffect(() => {
 
// const style = document.createElement('style');
// style.innerHTML = `
//   .wistia_embed,
//   .wistia_responsive_wrapper {
//     width: 100%;
//     height: 100%;
//   }

//   .wistia_embed img,
//   .wistia_embed .wistia_poster,
//   .wistia_embed .wistia_placeholder,
//   .wistia_embed video {
//     object-fit: cover !important;
//     width: 100% !important;
//     height: 100% !important;
//   }
// `;
// document.head.appendChild(style);

//     const script1 = document.createElement('script');
//     script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
//     script1.async = true;

//     const script2 = document.createElement('script');
//     script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
//     script2.async = true;

//     const div = document.createElement('div');
// div.innerHTML = `
//   <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
//     <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
//       <div
//         class="wistia_embed wistia_async_${videoId}
//           seo=false
//           videoFoam=true
//           autoPlay=false
//           playButton=false
//           controlsVisibleOnLoad=false
//           endVideoBehavior=reset
//           stillUrl=img/Herovideo.png"
//         style="height:100%;width:100%;">
//       </div>
//     </div>
//   </div>
// `;


//     const container = document.getElementById(wrapper);
//     container.appendChild(script1);
//     container.appendChild(script2);
//     container.appendChild(div);

//     return () => {
//       container.innerHTML = '';
//     };
//   }, [videoId, wrapper]);

//   return <div id={wrapper} />;
// }

// WistiaPlayer.propTypes = {
//   videoId: PropTypes.string.isRequired,
//   wrapper: PropTypes.string.isRequired,
// };

// export default WistiaPlayer;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function WistiaPlayer({ videoId, wrapper }) {
  useEffect(() => {
 
const style = document.createElement('style');
style.innerHTML = `
  .wistia_embed,
  .wistia_responsive_wrapper {
    width: 100%;
    height: 100%;
  }

  .wistia_embed img,
  .wistia_embed .wistia_poster,
  .wistia_embed .wistia_placeholder,
  .wistia_embed video {
    object-fit: cover !important;
    width: 100% !important;
    height: 100% !important;
  }
    .wistia_embed,
.wistia_embed .wistia_poster,
.wistia_embed img {
  background-color: #030511 !important;
}

`;
document.head.appendChild(style);

    const script1 = document.createElement('script');
    script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    script2.async = true;

    const div = document.createElement('div');
div.innerHTML = `
  <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
    <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
      <div
        class="wistia_embed wistia_async_${videoId}
          seo=false
          videoFoam=true
          autoPlay=false
          playButton=false
          controlsVisibleOnLoad=false
          endVideoBehavior=reset
          stillUrl=img/Herovideo.png"
        style="height:100%;width:100%;">
      </div>
    </div>
  </div>
`;


    const container = document.getElementById(wrapper);
    container.appendChild(script1);
    container.appendChild(script2);
    container.appendChild(div);

    return () => {
      container.innerHTML = '';
    };
  }, [videoId, wrapper]);

  return <div id={wrapper} />;
}

WistiaPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  wrapper: PropTypes.string.isRequired,
};

export default WistiaPlayer;