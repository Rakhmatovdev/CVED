declare module "tiff.js" {
  interface InitializeOptions {
    buffer: ArrayBuffer;
  }
  class Tiff {
    constructor(opts: InitializeOptions);
    toCanvas(): HTMLCanvasElement;
    // ...add other APIs you use
  }
  export default Tiff;
}
