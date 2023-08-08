import { getCity } from "./getCity";

export const sleep = (x:number) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });

describe("getCity", () => {
  it("is a function", () => {
    expect(getCity).toBeInstanceOf(Function);
  });
/* });
const mockObject = {
  ip: "2001:448a:5061:38bf:152a:be0b:af45:8a42",
  organization_name: "PT Telekomunikasi Indonesia",
  city: "Banjar Danginpangkung",
  asn: 7713,
  organization: "AS7713 PT Telekomunikasi Indonesia",
};
const mockCity = "Banjar Danginpangkung";


    const  saveFetch = window.fetch;

    window.fetch = jest.fn(() =>
    Promise.resolve({
      json(){ 
        return Promise.resolve(mockObject)},
        ok:true,
      
    } as Response)

  );

afterEach(() => {
    window.fetch = saveFetch;
});
 
describe("fetch", () => {
  let city: void;
  describe("fetch finds the right place ", () => {
    beforeEach(async () => {
      city = await getCity();
    });
    sleep(100);

    it("returns right place Banjar Danginpangkung", () => {
      expect(city).toEqual(mockCity);
    });
  }); */
});
