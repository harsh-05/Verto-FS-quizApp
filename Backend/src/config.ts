

export function getJwtSecret() {
    const Jwt_Secret = process.env.JWT_Secret;

    if (!Jwt_Secret) {
        console.error("JWT_Secret is not found in the environment variable!!");

        throw new Error("JWT_Secret not found!!");
    }

    return Jwt_Secret
}