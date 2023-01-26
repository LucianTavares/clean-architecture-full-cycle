import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      this.notification.addErrors({
        context: "product",
        message: "Id is required"
      })
    }
    if (this._name.length === 0) {
      this.notification.addErrors({
        context: "product",
        message: "Name is required"
      })
    }
    if (this._price === 0) {
      this.notification.addErrors({
        context: "product",
        message: "Price cannot be zero"
      })
    }
    return true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

}