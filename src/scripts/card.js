import uniqid from "uniqid";

class Card {
    constructor(image, title) {
        this.id = uniqid();
        this.image = image;
        this.title = title;
    }
}

export default Card;
