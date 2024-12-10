import { HttpCode } from '../enum/http';

export default abstract class BaseResponse<TData> {
  constructor(
    readonly data: TData,
    readonly httpCode: HttpCode,
    readonly location?: string,
  ) {}
}