//const uri = "mongodb+srv://mongodbtrial:mongodbtrial@cluster0.mzf3e.mongodb.net/db01?retryWrites=true&w=majority";

const MongoStore = connectStore(session);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000
    }),
    cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: parseInt(SESS_LIFETIME)
    }
}));