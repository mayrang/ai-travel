export default {
  title: 'Travel',
  name: 'travel',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Cities',
      name: 'cities',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule: any) => Rule.unique(),
    },
  ],
}
