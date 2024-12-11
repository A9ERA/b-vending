
export default abstract class BaseResponse<T> {
  constructor(
    readonly data: T,
  ) {}
}
