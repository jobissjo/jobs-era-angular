export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: number,
    localId: string,
    registered?: boolean
}

