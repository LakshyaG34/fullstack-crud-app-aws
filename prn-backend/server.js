import express from "express"
import cors from "cors"
import clientRoutes from "./routes/clientRoute.js"

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);

app.listen(PORT, ()=>
{
    console.log(`Server is running on ${PORT}`);
})