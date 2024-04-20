export interface TokenResponse {
    access_token: string
    token_type: string
}
interface UserModel {
    username: string
    email: string
    role: string
    active:boolean

}
export interface ResponseUserModel extends UserModel {
    id: string
}
export interface CreateUserModel extends UserModel {
    password: string
}