module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://user:user@cluster0.fajex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavedetokens'
}