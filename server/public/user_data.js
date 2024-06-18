const ROLE = {
    ADMIN: 'admin',
    BASIC:'basic'
}

module.exports ={
    ROLE: ROLE,
    users: [
        {id: 1, name: 'Cyan', role: ROLE.ADMIN},
        {id: 2, name: 'Tom', role: ROLE.BASIC}
    ]

    
}