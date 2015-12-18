module.exports = {
    tplRow: {
        id: 0,
        selectFields: [
            {
                name: 'condition_op',
                options: [{
                    id: 1,
                    value: 'AND'
                }, {
                    id: 2,
                    value: 'OR'
                }],
                default: 1
            },
            {
                name: 'field',
                options: [{
                    id: 1,
                    value: 'all fields'
                }, {
                    id: 2,
                    value: 'title'
                }],
                default: 1
            }
        ],
        textsFields: [
            {
                name: 'query',
                value: ''
            }
        ],
        buttonFields: [
            {
                name: 'plus',
                value: true
            },
            {
                name: 'minus',
                value: true
            }
        ]
    },
    baseQuery: {
        'field': 'all fields',
        'query': '',
        'match': 'CONTAINS',
        'condition_op': 'AND'
    },
    tplQuery: {
        'context': {
            'publication': {
                'conditions': [

                ],
                'sortingOrder': "ASC",
                'sortingField': "title"
            }
        },
        'limits': {
            "offset": 0,
            "limit": 25,
        }
    }
}
