declare module "pdfjs-dist/build/pdf" {
    const pdfjs: typeof import("pdfjs-dist");
    export = pdfjs;
  }
  
  declare module "pdfjs-dist/build/pdf.worker.entry";
  