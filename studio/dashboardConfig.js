export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-eleventy-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6268018b86dcc648f1094d98',
                  title: 'Sanity Studio',
                  name: 'sanity-eleventy-blog-studio-awcxdcp6',
                  apiId: '8f2954ad-9715-4bfd-893b-914fff237325'
                },
                {
                  buildHookId: '6268018cbad4523c689b1f82',
                  title: 'Blog Website',
                  name: 'sanity-eleventy-blog-web-q679da9x',
                  apiId: '5d6c93de-94ae-46b9-8e11-cdff86c8ce5e'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/srouse/sanity-eleventy-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-eleventy-blog-web-q679da9x.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
