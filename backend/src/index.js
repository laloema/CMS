//Dependencias
import { ApolloServer, makeExecutableSchema} from 'apollo-server'

//modelos
import models from './models'


//type Definitions
const typeDefs=`
    type Hello{
        message: String!
    }

    type Query{
        sayHello(name: String!): Hello
    }
`
//REsolvers
const resolvers = {
    Query:{
        sayHello:(_, args)=>{
            return {
                message: `Hello ${args.name || 'world'}`
            }
        }
    }
}

//Schema
const schema = makeExecutableSchema({
    typeDefs,resolvers
})

//Apollo server
const apolloServer = new ApolloServer({
    schema,
    context:{
        models
    }
})

//Run apollo server
models.sequelize.sync({force: true}).then(()=>{
    apolloServer.listen(5000).then(({url}) => console.log(`Running on ${url}`))
})
