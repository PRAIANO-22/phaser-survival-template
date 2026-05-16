export default class ObjectPool {
  static activate(obj, x, y) {
    obj.setActive(true);
    obj.setVisible(true);

    obj.body.enable = true;

    obj.setPosition(x, y);
  }

  static deactivate(obj) {
    obj.setActive(false);
    obj.setVisible(false);

    obj.body.enable = false;

    obj.setVelocity(0, 0);
  }
}
