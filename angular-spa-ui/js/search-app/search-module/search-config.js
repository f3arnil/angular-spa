module.exports = {
    paths: {
        simpleSearchPath: '/service/search/?',
        advancedSearchPath: '/service/advanced-search/',
        publicationDetail: '/service/publication/',
        articleDetail: '/service/article/'
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
    searchIn: [
        {
            title: 'Publications',
            value: 'publication'
        },
        {
            title: 'Articles/Chapters',
            value: 'article'
        }
            ],
    detailsAcceptedFields: [
            'title',
            'description',
            'content',
            'language',
            'author',
            'created',
            'updated',
            'publisher',
            'publicationType',
            'issn',
            'publishingCountry',
            'isbn13'
        ]
}
