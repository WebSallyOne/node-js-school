import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
    salt: string;
    algorithm: string;
    cryptPassword: string;
}

const config: IConfig = {
    port: +process.env.PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
    salt: process.env.SALT || 'some-salt',
    algorithm: process.env.ALGORITHM || 'aes-192-cbc',
    cryptPassword: process.env.CRYPT_PASSWORD || 'some-password'
};

export { config };
