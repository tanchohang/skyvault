import dotenv from 'dotenv';
import { connect } from 'mongoose';
dotenv.config();
const mongodb = connect(process.env.MONGODB_URI);
export default mongodb;
//# sourceMappingURL=mongodb.js.map