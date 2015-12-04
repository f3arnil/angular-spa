module.exports =
    {
        paths: {
            userPath : '/user/',
            rolePath : '/role/',
            tokenPath : '/user-token/',
            validatePath : '/user-validate/',
            simpleSearchPath : '/service/search/?',
            advancedSearchPath : '/service/search/',
            publicationDetail : '/service/publication/',
            articleDetail : '/service/article/'
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
