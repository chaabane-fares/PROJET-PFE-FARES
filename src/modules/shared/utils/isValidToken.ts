export interface JwtPayload {
  exp: number
}

export const isValidToken = (token: string) => true
