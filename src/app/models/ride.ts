export default interface Ride {
  fileId: string;
  fileName: string;
  _id: string;
  metaData: MetaData;
}

export interface MetaData {
  start: number;
  tripTime: number;
  tripDistance: number;
  tripUsedEnergy: number;
  maxSpped: number;
  maxCurrent: number;
}
