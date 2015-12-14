module.exports = {
    header: {
        visibility: false,
        params: {
            resultsCount: {
                visibility: false,
                params: {
                    from: 0,
                    to: 0,
                    count: 0
                }
            },
            sortBy: {
                visibility: false,
                params: {
                    value: 0
                }
            },
            resultsPerPage: {
                visibility: false,
                params: {
                    value: 0
                }
            },
            pagination: {
                visibility: false,
                params: {
                    totalItems: '0',
                    currentPage: '0',
                    maxSize: '0',
                    class: 'pagination-sm',
                    rotate: false,
                    itemsPerPage: '0',
                }
            }
        }
    },
    sortParams: [
        {
            title: 'sort by A-Z',
            value: 'ASC'
        },
        {
            title: 'sort by Z-A',
            value: 'DESC'
        }
        ],
    resultsPerPage: [
        {
            title: '5 Results/page',
            value: '5'
        },
        {
            title: '10 Results/page',
            value: '10'
        },
        {
            title: '15 Results/page',
            value: '15'
        },
        {
            title: '20 Results/page',
            value: '20'
        },
        {
            title: '25 Results/page',
            value: '25'
        },
        {
            title: '30 Results/page',
            value: '30'
        }
        ],
    itemConfig: {
        addNew: false,
        delete: false,
        edit: false
    }
}
