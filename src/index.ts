import { Application } from 'probot' // eslint-disable-line no-unused-vars
import fetch from 'node-fetch'

type JiraIssueTypeName = 'Story' | 'Sub-task' | 'Bug';

interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    issuetype: {
      name: JiraIssueTypeName;
    };
    parent?: {
      key: string;
      fields: {
        summary: string;
        issuetype: {
          name: Exclude<JiraIssueTypeName, 'Sub-task'>;
        };
      };
    };
  };
}

const PROJETS = ['BO']

export = (app: Application) => {
  app.on('create', async (context) => {
    if (context.payload.ref_type === 'branch' && context.payload.ref.match(`${PROJETS[0]}-[0-9]+`)) {
      const jiraIssueId = context.payload.ref
      const response = await fetch(`${process.env.JIRA_URL}/rest/api/3/search`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${process.env.JIRA_TOKEN}`
        },
        body: JSON.stringify({
          validateQuery: false,
          jql: `issueKey in (${jiraIssueId})`,
          fieldsByKeys: true,
          fields: ['issuetype', 'parent', 'summary']
        })
      })
      const jsonResponse: {issues: JiraIssue[]} = await response.json()
      await context.github.pulls.create({
        owner: context.payload.sender.login,
        base: context.payload.master_branch,
        head: context.payload.ref,
        repo: context.payload.repository.name,
        title: jsonResponse.issues[0].fields.summary,
        body: `**Type:** Feature/Bug/Chore/Tooling/Release/Hotfix

## User story

- <https://keplr.atlassian.net/browse/${jiraIssueId}>
        `
      })
    }
    // console.log(context)
    // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
