export interface ICredentialDto {
    email: string;
    password: string;
}
  
export interface ITokenDto {
    expires_in: number;
    access_token: string;
}