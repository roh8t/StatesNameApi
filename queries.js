

const Pool= require('pg').Pool
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database:'api',
    password:'crazy123',
    port:5432,
});

const getStates=(request,response) =>{
    pool.query('SELECT * FROM states ORDER By id ASC' , (error,results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//Create route function to retrieve a single record from database

const getStatesById=(request,response) =>{

    const id=parseInt(request.params.id)

    pool.query('SELECT * FROM states WHERE id = $1' ,[id]  , (error,results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
// Create route function to add new record into database
const createState=(request,response) =>{

    const { name, capital }= request.body

    pool.query('INSERT INTO states (name, capital) VALUES ($1,$2)' ,[name,capital]  , (error,results)=> {
        if(error){
            throw error
        }
        response.status(201).send('A new State has been added to the database')
    })
}

//create route function to add new record into database

const updateState=(request,response) =>{

    const id=parseInt(request.params.id)
    const {name,capital}= request.body

    pool.query('UPDATE states SET name = $1, capital = $2 WHERE id= $3' ,[name,capital,id]  , (error,results)=> {
        if(error){
            throw error
        }
        response.status(200).send('Country has been updated Successfully')
    })
}

// create route function to delete a record from database

const deleteState=(request,response) =>{

    const id=parseInt(request.params.id)
    

    pool.query('DELETE FROM states WHERE id = $1' ,[id]  , (error,results)=> {
        if(error){
            throw error
        }
        response.status(200).send(`Country has been deleted Successfully with ID: ${id}`)
    })
}

module.exports ={
    getStates,
    getStatesById,
    createState,
    updateState,
    deleteState,
}