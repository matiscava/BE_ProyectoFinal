const env = require('./env')
const app = require('./server')
const cluster = require('cluster')
const logger = require('./logger')

// const numCPUs = require('os').cpus().length
// const isCluster = process.argv[2] === 'CLUSTER';

// const PORT = process.env.PORT || 8080

/*--master--*/

// if( cluster.isMaster && isCluster){
//     logger.info(`Cantidad de procesadores: ${numCPUs}`);
//     logger.info(`PID MASTER ${process.pid} is running`);

//     for (let i=0 ; i<numCPUs ; i++){
//         cluster.fork()
//     }

//     cluster.on('exit', worker => {
//         logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
//         cluster.fork()
//     })
// }
// else
// {
    const PORT = parseInt( process.env.PORT) || 8080;
    
    const server = app.listen(PORT, () => {
        logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on('error', error => logger.error(`Error en servidor ${error}`))

// }    





