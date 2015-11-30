module.exports =
    {
        paths: {
            simpleSearchPath : '/service/search/?',
            advancedSearchPath : '/service/search/',
        },
        sortParams: [
            {name : 'sort by A-Z', value : 'ASC'},
            {name : 'sort by Z-A', value : 'DESC'}
        ],
        resultsPerPage: [
            {name : '15 Results/page', value :'15'},
            {name : '20 Results/page', value : '20'},
            {name : '25 Results/page', value :'25'},
            {name : '30 Results/page', value : '30'}
        ],
        searchIn: [
                {name :'Publications', value : 'publication'},
                {name :'Articles/Chapters', value : 'article'}
            ]
    }