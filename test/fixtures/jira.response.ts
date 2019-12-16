export default  {
    expand: 'schema,names',
    startAt: 0,
    maxResults: 50,
    total: 1,
    issues: [
      {
        expand:
          'operations,versionedRepresentations,editmeta,changelog,renderedFields',
        id: '18568',
        self: 'https://keplr.atlassian.net/rest/api/3/issue/18568',
        key: 'MM-1780',
        fields: {
          summary: '[FRONT] Modal addresse : utiliser le nouveau composant modal',
          issuetype: {
            self: 'https://keplr.atlassian.net/rest/api/3/issuetype/10102',
            id: '10102',
            description: 'The sub-task of the issue',
            iconUrl:
              'https://keplr.atlassian.net/secure/viewavatar?size=medium&avatarId=10316&avatarType=issuetype',
            name: 'Sub-task',
            subtask: true,
            avatarId: 10316,
          },
          parent: {
            id: '18147',
            key: 'MM-1711',
            self: 'https://keplr.atlassian.net/rest/api/3/issue/18147',
            fields: {
              summary:
                'ecom - Choisir une adresse de livraison sur le ecom/mcom ',
              status: {
                self: 'https://keplr.atlassian.net/rest/api/3/status/3',
                description:
                  'This issue is being actively worked on at the moment by the assignee.',
                iconUrl:
                  'https://keplr.atlassian.net/images/icons/statuses/inprogress.png',
                name: 'In Progress',
                id: '3',
                statusCategory: {
                  self: 'https://keplr.atlassian.net/rest/api/3/statuscategory/4',
                  id: 4,
                  key: 'indeterminate',
                  colorName: 'yellow',
                  name: 'In Progress',
                },
              },
              priority: {
                self: 'https://keplr.atlassian.net/rest/api/3/priority/3',
                iconUrl:
                  'https://keplr.atlassian.net/images/icons/priorities/medium.svg',
                name: 'Medium',
                id: '3',
              },
              issuetype: {
                self: 'https://keplr.atlassian.net/rest/api/3/issuetype/10100',
                id: '10100',
                description:
                  'Stories track functionality or features expressed as user goals.',
                iconUrl:
                  'https://keplr.atlassian.net/secure/viewavatar?size=medium&avatarId=10315&avatarType=issuetype',
                name: 'Story',
                subtask: false,
                avatarId: 10315,
              },
            },
          },
        },
      },
    ],
  };