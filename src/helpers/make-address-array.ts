import { IBaseAddress } from "@interfaces/registration-form-data";

const makeAddressArray = (addresses: IBaseAddress[], ids: string[]) => {
  const result: IBaseAddress[] = [];
  addresses.forEach((address) => {
    if (address.id && ids.includes(address.id)) {
      result.push(address);
    }
  });
  return result;
};

export default makeAddressArray;
