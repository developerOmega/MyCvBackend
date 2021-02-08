interface Img {
  img: any
}

declare namespace Express {
  export interface Request {
    files?: Img
  }
}