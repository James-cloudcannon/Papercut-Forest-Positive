import Alpine from "alpinejs";
import intersect from '@alpinejs/intersect'
import threeTileCarousel from "./carousel/index.js";


import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("container-query-polyfill/src/cqfill");
}
window.disableScroll = disableBodyScroll;
window.enableScroll = enableBodyScroll;
window.Alpine = Alpine;

// Alpine.plugin(intersect)
// Alpine.store('show_sticky_cta', {
//   on: false,
//   toggle() {
//       this.on = ! this.on
//   }
// })
Alpine.data('threeTileCarousel', threeTileCarousel);

Alpine.start();