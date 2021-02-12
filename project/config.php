<?php
return [

    'user' => 'Marta',      // change user name before db migration

    'layout' => [
        'col_1' => [
            'model' => [
                'width' => '50%',
                'float' => 'left'
            ]
        ],
        'col_2' => [
            'tweet' => [
                'width' => '50%',
                'float' => 'right'
            ],
            'buttons' => [
                'width' => '50%',
                'float' => 'right'
            ]
        ]
    ],

    'num_tweet' => 12,

    'num_annotators' => 1,

    'num_annotation' => 1,

    'list_previous_tweets' => 'true',

    'images' => [
        'flag' => 'false',
        'url' => '../images/',
    ],

    'grammar' => [
        'model' => [
            'name' => 'plutchik',
            'block' => [
                'flag' => 'false',
                'by' => [
                    'incomprensibile' => 'incomprensibile',
                    'neutrale' => 'neutrale'
                ]
            ]
        ],

        'category' => [
            'row_0' => [
                'header' => 'Ironia',
                'buttons' => [
                    'ironia' => [
                        'color' => '#007bff',
                        'block' => [
                            'flag' => 'false',
                            'by' => [
                                'incomprensibile' => 'incomprensibile',
                            ]
                        ]
                    ],
                    'sarcasmo' => [
                        'color' => '#007bff',
                        'block' => [
                            'flag' => 'false',
                            'by' => [
                                'incomprensibile' => 'incomprensibile',
                            ]
                        ]
                    ]
                ]
            ],
            'row_1' => [
                'header' => 'Hate speech',
                'buttons' => [
                    'odio' => [
                        'color' => '#17a2b3',
                        'block' => [
                            'flag' => 'false',
                            'by' => [
                                'incomprensibile' => 'incomprensibile'
                            ]
                        ]
                    ],
                    'offensività' => [
                        'color' => '#17a2b3',
                        'block' => [
                            'flag' => 'false',
                            'by' => [
                                'incomprensibile' => 'incomprensibile'
                            ]
                        ]
                    ]
                ]
            ],
            'row_2' => [
                'header' => 'Altro',
                'buttons' => [
                    'neutrale' => [
                        'color' => '#6c757d',
                        'block' => [
                            'flag' => 'true',
                            'by' => [
                                'incomprensibile' => 'incomprensibile'
                            ]
                        ]
                    ],
                    'incomprensibile' => [
                        'color' => '#ffc107',
                        'block' => [
                            'flag' => 'true',
                            'by' => [ ]
                        ]
                    ]
                ]
            ]

        ]
    ]

];
