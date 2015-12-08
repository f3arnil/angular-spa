module.exports =
    {
        header : {
            visibility : false,
            params : {
                resultsCount : {
                    visibility : false,
                    params : {
                        from : 0,
                        to : 0,
                        count : 0
                    }
                },
                sortBy : {
                    visibility : false,
                    params : {
                        value : 'ASC'
                    }
                },
                resultsPerPage : {
                    visibility : false,
                    params : {
                        value : '15'
                    }
                },
                pagination : {
                    visibility : false,
                    params : {
                        totalItems : '50',
                        currentPage : '0',
                        maxSize : '5',
                        class : 'pagination-sm',
                        rotate : false,
                        itemsPerPage : '10',
                        ngChange : 'changeFunc'
                    }
                }
            }
        },
        sortParams: [
            { title : 'sort by A-Z', value : 'ASC' },
            { title : 'sort by Z-A', value : 'DESC' }
        ],
        resultsPerPage: [
            { title : '15 Results/page', value :'15' },
            { title : '20 Results/page', value : '20' },
            { title : '25 Results/page', value :'25' },
            { title : '30 Results/page', value : '30' }
        ],
        itemConfig : {
            addNew : false,
            delete : false,
            edit : false
        }
    }