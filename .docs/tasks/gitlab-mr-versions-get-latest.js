#!/usr/bin/env node

const GITLAB_API_URL = process.env.GITLAB_API_URL;
const GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN;

args = process.argv.slice(2);

if (args.length < 1) {
    console.log('Usage: gitlab-mr-versions-get.js <project-id> <merge-request-id>');
    process.exit(1);
}

const projectId = args[0];
const mergeRequestId = args[1];

const url = `${GITLAB_API_URL}/projects/${projectId}/merge_requests/${mergeRequestId}/versions`;

// console.log(`Fetching versions for merge request ${mergeRequestId} in project ${projectId} from ${url}`);

fetch(url, {
    method: 'GET',
    headers: {
        'PRIVATE-TOKEN': GITLAB_API_TOKEN,
        'Accept': 'application/json'
    },
})
.then(response => response.json())
.then(json => {
    console.log(JSON.stringify(json[0], null, 2));
})
.catch(error => {
    console.error(error);
    process.exit(1);
});
