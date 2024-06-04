import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector("#modal-image");
    this._previewImageTitle =
      this._popupElement.querySelector("#modal-image-title");
  }

  open({ name, link }) {
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    this._previewImage.src = link;

    super.open();
  }
}
