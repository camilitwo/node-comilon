import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express'; // Importar express de manera correcta
import { buildSchema } from 'type-graphql';
import { RegionResolver } from './resolvers/RegionResolver';
import { AppDataSource } from './ormconfig';
import console from 'console';

(async () => {
    // Inicializar TypeORM
    await AppDataSource.initialize();

    // Construir esquema GraphQL
    const schema = await buildSchema({
        resolvers: [RegionResolver],
    });

    // Crear servidor Apollo
    const server = new ApolloServer({ schema });

    // Crear aplicación Express
    const app: Application = express(); // Asegúrate de que el tipo es Application

    // Aplicar middleware de Apollo Server a Express
    await server.start();
    // @ts-ignore
    server.applyMiddleware({ app });



    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
})();
