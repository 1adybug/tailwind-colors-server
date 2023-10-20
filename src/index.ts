import express from "express"
import { Server } from "socket.io"
import cors from "cors"

const app = express()

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>")
})

const server = app.listen(3000, () => {
    console.log("listening on *:3000")
})

interface ServerToClientEvents {
    color: (color: string, depth: string) => void
}

interface ClientToServerEvents {
    color: (color: string, depth: string) => void
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, { cors: corsOptions })

io.on("connection", socket => {
    socket.on("color", (color, depth) => {
        io.emit("color", color, depth)
    })
})
