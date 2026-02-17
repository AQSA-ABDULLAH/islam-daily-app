declare module "open-location-code" {
  export function encode(
    latitude: number,
    longitude: number,
    codeLength?: number,
  ): string;

  export function decode(code: string): any;

  const OpenLocationCode: {
    encode: typeof encode;
    decode: typeof decode;
  };

  export default OpenLocationCode;
}
