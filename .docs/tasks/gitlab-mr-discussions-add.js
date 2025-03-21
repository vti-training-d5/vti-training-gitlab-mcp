#!/usr/bin/env node

const GITLAB_API_URL = process.env.GITLAB_API_URL;
const GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN;

args = process.argv.slice(2);

if (args.length < 8) {
    console.log('Usage: gitlab-mr-discussions-add.js <project-id> <merge-request-id> <base_sha> <head_sha> <start_sha> <old_path> <new_path> <new_line> <body>');
    process.exit(1);
}

const projectId = args[0];
const mergeRequestId = args[1];
const baseSha = args[2];
const headSha = args[3];
const startSha = args[4];
const oldPath = args[5];
const newPath = args[6];
const newLine = args[7];
const body = args[8];

const url = `${GITLAB_API_URL}/projects/${projectId}/merge_requests/${mergeRequestId}/discussions`;

const data = {
  position: {
      position_type: "text",
      base_sha: baseSha,
      head_sha: headSha,
      start_sha: startSha,
      new_path: newPath,
      old_path: oldPath,
      new_line: newLine
  },
  body: body
}

// console.log(`Creating discussion for merge request ${mergeRequestId} in project ${projectId} from ${url} with data ${JSON.stringify(data)}`);

fetch(url, {
    method: 'POST',
    headers: {
        'PRIVATE-TOKEN': GITLAB_API_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(json => {
    console.log(JSON.stringify(json, null, 2));
})
.catch(error => {
    console.error(error);
    process.exit(1);
});
