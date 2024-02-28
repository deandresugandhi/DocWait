const openModal = (modalID) => {
    const modal = document.querySelector(`#${modalID}`)
    if (modal) {
      modal.classList.add('is-active')
    }
}

const closeModal = (modalID) => {
    const modal = document.querySelector(`#${modalID}`);
    if (modal) {
        modal.classList.remove('is-active');
    }
}

export { openModal, closeModal }