module.exports =
    {
        paths: {
            userPath : '/user/',
            rolePath : '/role/',
            tokenPath : '/user-token/',
            validatePath : '/user-validate/'
        },
        methods: {
            GET : 'GET',
            POST : 'POST',
            PUT : 'PUT',
            DELETE : 'DELETE'
        },
        userData: {
            userId : '',
            userToken : '',
            userValidateResult : '',
            responsePromises: []
        }
    }
