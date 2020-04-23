const server = express()

server.use(helmet());

server.use(cors())
server.use(express.json);
server.use('/TABLE', someRouter)

module.exports = server;