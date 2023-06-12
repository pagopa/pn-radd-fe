import { calcBase64String, calcSha256String, calcUnit8Array, formatBytes, isFileImage } from "../file.utils";

jest.mock("../const.tsx", () => ({
    ...jest.requireActual('../const.tsx'),
    MODE: "test"
}));

describe("file.utils", () => {

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("calcBase64String", async () => {
        const base64 = await calcBase64String(null);
        expect(base64).toEqual("mocked-base64String");
    });

    it("calcUnit8Array", async () => {
        const base64 = await calcUnit8Array(null);
        expect(base64).toEqual(new Uint8Array());
    });

    it("calcSha256String", async () => {
        const sha = await calcSha256String(null);
        expect(sha.hashHex).toEqual('mocked-hashHex');
        expect(sha.hashBase64).toEqual('mocked-hasBase64');
    });

    it("isFileImage", () => {
        const file = new File([""], "test", { type: "image/png", lastModified: new Date().getTime() });
        expect(isFileImage(file)).toBeTruthy();
    })

    it("formatBytes", () => {
        const emptyBytes = formatBytes(0);
        expect(emptyBytes).toEqual('0 Bytes');

        const tenMBytes = formatBytes(10485760);
        expect(tenMBytes).toEqual('10 MB')
    })
    
})