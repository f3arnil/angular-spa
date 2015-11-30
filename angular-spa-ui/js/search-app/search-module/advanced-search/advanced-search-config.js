module.exports =
    {
        baseRows: [{   
            id: 0, 
            selectFields : [
                {   
                    name:'field',
                    options: [{id:1, value: 'All fields'}, {id:2, value: 'Title'}]
                }
            ],
            textsFields : [
                {
                    name: 'query',
                    value: ''
                }
            ]
        }],
        tplRow: {
            id: 1,
            selectFields : [
                {   
                    name : 'condition_op',
                    options: [{id:1, value: 'NONE'}, {id:2, value: 'AND'}, {id:3, value: 'OR'}]
                },
                {   
                    name:'field',
                    options: [{id:1, value: 'All fields'}, {id:2, value: 'Title'}]
                }
            ],
            textsFields : [
                {
                    name: 'query',
                    value: ''
                }
            ]
        },
        baseQuery: [
            {
                'id': 0,
                'field': '',
                'query': '',
                'match': 'STARTS_FROM',
                'condition_op': ''
            }
        ]
    }