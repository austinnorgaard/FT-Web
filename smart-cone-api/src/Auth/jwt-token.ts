export class JwtToken {
    constructor(public access_token: string, public expires_in: number) {}
}
