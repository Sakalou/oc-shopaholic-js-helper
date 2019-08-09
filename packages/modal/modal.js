import createFocusTrap from 'focus-trap';
import Overlay from '@lovata/overlay';

export default new class Modal {
  constructor() {
    this.modalSelector = 'modal';
    this.modalBodySelector = 'modal__body';
    this.modalCloseButtonSelector = '[data-modal-close]';
    this.modalOpenButtonSelector = '[data-modal]';
    this.modalActiveSelector = 'modal_active';

    this.handler();
  }

  handler() {
    this.showModalEvent = new Event('showModal', {
      bubbles: true
    });
    this.hideModalEvent = new Event('hideModal', {
      bubbles: true
    });

    document.addEventListener('click', ({ target }) => {
      const modalOpenButton = target.closest(this.modalOpenButtonSelector);

      if (!modalOpenButton) return;

      const modalId = modalOpenButton.dataset.modal;

      this.show(modalId);
    });

    document.addEventListener('click', ({ target }) => {
      const modalCloseButton = target.closest(this.modalCloseButtonSelector);

      if (!modalCloseButton) return;

      this.hide();
    });

    document.addEventListener('click', ({ target }) => {
      if (target.closest(`.${this.modalSelector}`) &&
        !target.closest(`.${this.modalBodySelector}`)) {
        this.hide();
      }
    });

    window.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 27 &&
        this.activeModal &&
        document.activeElement.closest(`.${this.modalSelector}`)) {
        this.hide();
      }
    });
  }

  show(id) {
    if (this.activeModal) {
      this.hide({
        hideOverlay: false,
      });
    } else {
      Overlay.show();
    }

    this.activeModal = document.querySelector(`#${id}`);
    this.replaceModalToBodyEnd();
    setTimeout(() => {
      this.activeModal.classList.add(this.modalActiveSelector);
      this.activeModal.dispatchEvent(this.showModalEvent);
      this.activateFocusTrap();
    }, 10);
  }

  hide({ hideOverlay = true } = {}) {
    if (!this.activeModal) return;

    this.deactivateFocusTrap();
    this.activeModal.dispatchEvent(this.hideModalEvent);
    this.activeModal.classList.remove(this.modalActiveSelector);

    if (hideOverlay) {
      Overlay.hide();
      this.activeModal = null;
    }
  }

  replaceModalToBodyEnd() {
    if (this.activeModal.parentNode === document.body) return;

    this.activeModal.parentNode.removeChild(this.activeModal);
    document.body.append(this.activeModal);
  }

  activateFocusTrap() {
    if (!this.activeModal) return;

    this.focusTrap = createFocusTrap(this.activeModal);
    this.focusTrap.activate();
  }

  deactivateFocusTrap() {
    if (!this.focusTrap) return;

    this.focusTrap.deactivate();
  }
}();
