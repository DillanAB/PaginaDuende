import express from 'express'
import cors from 'cors'
import shopRouter from './routes/Shop_Router'
// import dotenv from 'dotenv'
import galleryRouter from './routes/Gallery_Router' 
import userRouter from './routes/User_Router'
import cartRouter from './routes/Cart_Router'

const app = express()
app.use(express.json())
app.use('/public', express.static(`${__dirname}/storage/MakeupServicesImages`))
app.use('/public', express.static(`${__dirname}/storage/ProductsImages`))

const PORT = 3000

app.get('/', (_req, res) => {
    console.log('Página de inicio')
    res.send('Página de inicio')
})

//Inicializa el servidor
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

//CORS establece los permisos de acceso a la API
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:4200'
}))

app.use("/api/users", userRouter)
app.use("/api/gallery", galleryRouter) 
app.use('/api/shop', shopRouter) 
app.use('/api/cart', cartRouter) 