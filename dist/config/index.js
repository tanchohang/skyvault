import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}
export const config = {
    port: parseInt(process.env.PORT, 10),
    env: process.env.NODE_ENV || 'development',
    base_url: process.env.BASE_URL,
};
//# sourceMappingURL=index.js.map