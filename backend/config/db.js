import mongoose from "mongoose"

export const connectDB = async (params) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
      // , {
        // useUnifiedTopology: true,        trebalo ranije !!!
        // useNewUrlParser: true,
        // useCreateIndex: true
      // })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)  // 1 = greska, 0 = uspesno
  }
}