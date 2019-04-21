import uuid from 'uuid';
import { Valid } from '../../helpers';

/** Rectangle lib */
class Rectangle {
  constructor(props) {
    this.uuid = uuid();
    this.props = props;
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
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const positions = [
          x - halfWidth, y - halfHeight, // Left-Top
          x + halfWidth, y - halfHeight, // Right-Top
          x - halfWidth, y + halfHeight, // Left-Bottom
          x + halfWidth, y + halfHeight  // Right-Bottom
        ];

        return positions;
      }
    }

    return null;
  }
}

export default Rectangle;
