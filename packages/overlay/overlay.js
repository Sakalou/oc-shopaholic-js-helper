export default new class Overlay {
  constructor() {
    this.overlaySelector = 'overlay';
    this.overlayVisibleSelector = 'overlay_visible';
    this.htmlScrollbarSelector = 'has-scrollbar';
    this.htmlNoScrollSelector = 'noscroll';
  }

  show() {
    this.addOverlay();
    this.fixViewport();
    this.overlay.classList.add(this.overlayVisibleSelector);
  }

  hide() {
    if (!this.isVisible()) return;

    this.overlay.classList.remove(this.overlayVisibleSelector);
    this.unfixViewport();
  }

  addOverlay() {
    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.classList.add(this.overlaySelector);
    document.body.append(this.overlay);
  }

  isVisible() {
    if (this.overlay && this.overlay.matches(`.${this.overlayVisibleSelector}`)) return true;
    return false;
  }

  fixViewport() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    document.body.style.marginTop = `-${scrollY}px`;

    if (window.innerWidth > document.documentElement.clientWidth) {
      document.documentElement.classList.add(this.htmlScrollbarSelector);
    }

    document.documentElement.classList.add(this.htmlNoScrollSelector);
  }

  unfixViewport() {
    const newScrollTop = -document.body.style.marginTop.slice(0, -2);

    document.documentElement.classList.remove(this.htmlScrollbarSelector);
    document.documentElement.classList.remove(this.htmlNoScrollSelector);
    document.body.style.marginTop = null;
    window.scrollTo(null, newScrollTop);
  }
}();
