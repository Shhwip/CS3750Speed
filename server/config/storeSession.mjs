import session from 'express-session';
import MongoDBStoreOrig from "connect-mongodb-session";

const MongoDBStore = MongoDBStoreOrig(session);

var storeSession = new MongoDBStore({
    uri: process.env.ATLAS_URI,
    databaseName: 'connect_mongodb_session_test',
    collection: 'my_sessions'
})

export default storeSession;
