import { v4 as uuidv4 } from 'uuid';

class PackagedItem {
  constructor({ id = uuidv4(), packageID, packagingDate, boxType, sealStatus, packagedQty, comments, createdAt = new Date() }) {
    if (!packageID) throw new Error('Package ID is required');
    if (!packagingDate) throw new Error('Packaging Date is required');
    if (!boxType) throw new Error('Box Type is required');
    if (!sealStatus) throw new Error('Seal Status is required');
    if (!packagedQty) throw new Error('Packaged Quantity is required');

    this.id = id; // Internal UUID
    this.packageID = packageID; // External primary key from API spec
    this.packagingDate = packagingDate;
    this.boxType = boxType;
    this.sealStatus = sealStatus;
    this.packagedQty = packagedQty;
    this.comments = comments;
    this.createdAt = createdAt; // Assuming creation timestamp
  }

  toJSON() {
    return {
      id: this.id,
      packageID: this.packageID,
      packagingDate: this.packagingDate,
      boxType: this.boxType,
      sealStatus: this.sealStatus,
      packagedQty: this.packagedQty,
      comments: this.comments,
      createdAt: this.createdAt
    };
  }
}

export default PackagedItem;