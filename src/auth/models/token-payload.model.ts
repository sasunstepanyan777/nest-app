export class TokenPayloadModel {
  constructor(
    public readonly userId: number,
    public readonly email: string
  ) { }
}
