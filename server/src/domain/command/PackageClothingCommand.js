import PackagedItem from '../entity/PackagedItem.js';
import db from '../../infrastructure/db/index.js';

class PackageClothingCommand {
  static async execute({ packageID, packagingDate, boxType, sealStatus, packagedQty, comments, isApproved }) {
    if (!isApproved) {
      throw new Error('Packaging requires prior approval.');
    }

    const packagedItem = new PackagedItem({
      packageID,
      packagingDate,
      boxType,
      sealStatus,
      packagedQty,
      comments,
      shippingStatus: 'READY_FOR_SHIPPING',
    });

    await db.insert('PackagedItem', packagedItem.toJSON());
    return packagedItem.toJSON();
  }
}

export default PackageClothingCommand;