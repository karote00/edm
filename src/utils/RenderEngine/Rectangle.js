import uuid from 'uuid';
import { Valid } from '../../helpers';

/** Rectangle lib */
class Rectangle {
  constructor(props) {
    this.uuid = uuid();
    this.props = props;
    this.positions = this.positions();
  }

  positions() {
    // Check if has x, y, width and height
    let allValid = true;
    ['x', 'y', 'width', 'height'].forEach(p => {
      if (Valid.isUndefined(this.props[p])) {
        allValid = false;
      }
    });

    if (allValid) {
      const { x, y, width, height } = this.props;

      if (width > 0 && height > 0) {
        // Calculate rectangle position with x, y, width and height
        const x1 = x - width / 2;
        const y1 = y - height / 2;
        const x2 = x + width / 2;
        const y2 = y + height / 2;
        return [
          x1, y1,
          x2, y1,
          x1, y2,
          x2, y2
        ];
      }
    }

    return null;
  }
}

export default Rectangle;
