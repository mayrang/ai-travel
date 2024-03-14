export default {
    title: "User",
    name: 'user',
    type: 'document',
    fields: [
        {
            title: "Name",
            name: "name",
            type: 'string',
            
        },
        {
            title: "UserId",
            name: "userId",
            type: "string"
        },
        {
            title: "Image",
            name: "image",
            type: "string",
        },
        {
            title: "Travels",
            name: "travels",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: 'travel'
                        }
                    ]
                }
            ],
            validation: (Rule: any) => Rule.unique(),
        },
        {
            title: "Friends",
            name: "friends",
            type: "array",
            of: [
                {
                type: "reference",
                to: [
                    {
                        type: 'user'
                    }
                ]
                }
            ],
            validation: (Rule: any) => Rule.unique(),
        }
    ]
}