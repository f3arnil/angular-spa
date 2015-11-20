module.exports =
    {
        path: {
            getUserPath : '/user/',
            getRolePath : '/role/',
            getTokenPath : '/user-token/',
            getValidatePath : '/user-validate/'
        },
        methods: {
            getMethod : 'GET',
            postMethod : 'POST',
            putMethod : 'PUT',
            deleteMethod : 'DELETE',
        },
        userData: {
            userId : '',
            userToken : '',
            userValidate : '',
            responsePromises: [],
        }
    }

