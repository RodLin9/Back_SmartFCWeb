const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
      const DB_URI = process.env.DB_URI; //obtener la URL de la base de datos a la que se debe conectar
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true, //objeto de opciones con varias opciones para configurar la conexión
        useUnifiedTopology: true,
        keepAlive: true
      });
      console.log('**** CONEXION CORRECTA ****');
    } catch (err) {
      console.log('**** ERROR DE CONEXIÓN ****', err)
     
    }
  };

module.exports = dbConnect

/*const mongoose = require('mongoose');
const dbUrl = require('./properties').DB;*/
/*module.exports=()=>{
    mongoose.connect(dbUrl, {useNewUrlParser:true})
        .then(()=>console.log(`Mongo connected on ${dbUrl}`))
        .catch(err => console.log(`Connection Error`))

        process.on('SIGINT',()=>{
            mongoose.connection.close(()=>{
                console.log(`Mongo disconneted`);
                process.exit(0);
            });
        });
}*/