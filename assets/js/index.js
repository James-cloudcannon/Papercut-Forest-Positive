import Alpine from "alpinejs";
import intersect from '@alpinejs/intersect'
import carousel from "./carousel/index.js";


import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("container-query-polyfill/src/cqfill");
}
window.disableScroll = disableBodyScroll;
window.enableScroll = enableBodyScroll;
window.Alpine = Alpine;


Alpine.data('carousel', carousel);

Alpine.start();