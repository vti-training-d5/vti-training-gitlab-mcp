#### Api docs
- https://docs.gitlab.com/api/discussions/#create-a-new-thread-in-the-merge-request-diff

#### Lib
[//]: # (- https://github.com/jenkinsci/violation-comments-to-gitlab-plugin/tree/master)
[//]: # (- https://www.npmjs.com/package/violation-comments-to-gitlab-command-line)
[//]: # (- https://github.com/tomasbjerre/violations-lib)
- https://github.com/tomasbjerre/violation-comments-to-gitlab-lib/blob/master/src/main/java/se/bjurr/violations/comments/gitlab/lib/GitLabCommentsProvider.java
- https://github.com/tomasbjerre/violation-comments-to-gitlab-lib/blob/master/src/main/java/se/bjurr/violations/comments/gitlab/lib/ViolationCommentsToGitLabApi.java
- https://github.com/petereon/diffparser

#### Sample payload (Web)

```json
{
    "view": "inline",
    "line_type": "old",
    "merge_request_diff_head_sha": "853e6af8b7274f9bcdb52f34ca984dde52e7f014",
    "in_reply_to_discussion_id": "",
    "note_project_id": "",
    "target_type": "merge_request",
    "target_id": 399698,
    "return_discussion": true,
    "note": {
        "note": "comment 3\n",
        "position": "{\"base_sha\":\"6ccf66bfb06a16e1b91c3ee4dea4a685585da51e\",\"start_sha\":\"6ccf66bfb06a16e1b91c3ee4dea4a685585da51e\",\"head_sha\":\"853e6af8b7274f9bcdb52f34ca984dde52e7f014\",\"old_path\":\"src/components/Login.tsx\",\"new_path\":\"src/components/Login.tsx\",\"position_type\":\"text\",\"old_line\":61,\"new_line\":null,\"line_range\":{\"start\":{\"line_code\":\"d81a15e39136fa5256a37e884584c08b9028b341_61_61\",\"type\":\"old\",\"old_line\":61,\"new_line\":null},\"end\":{\"line_code\":\"d81a15e39136fa5256a37e884584c08b9028b341_61_61\",\"type\":\"old\",\"old_line\":61,\"new_line\":null}},\"ignore_whitespace_change\":false}",
        "noteable_type": "MergeRequest",
        "noteable_id": 399698,
        "commit_id": "853e6af8b7274f9bcdb52f34ca984dde52e7f014",
        "type": "DiffNote",
        "line_code": "d81a15e39136fa5256a37e884584c08b9028b341_61_61"
    }
}
```

### API
```
POST /projects/:id/merge_requests/:merge_request_iid/discussions

```

### Run script

Requirements:
- NodeJS >= 18
- [jq](https://stedolan.github.io/jq/)
- bash

````bash
# prepare env vars
 export GITLAB_API_TOKEN="<your secret GitLab Access Toekn>"
export GITLAB_API_URL="https://git.vti.com.vn/api/v4"
# set Merge Request info
myGitlabProjectId="<The ID of the project>"
myGitlabMergeRequestIid="<The internal ID of the merge request>"
# get latest diff version of MR
myGitlabMrVersionLatest=$(./gitlab-mr-versions-get-latest.js "${myGitlabProjectId}" "${myGitlabMergeRequestIid}")
myGitlabMrShaBase=$(printf "%s" "${myGitlabMrVersionLatest}" | jq -r ".base_commit_sha")
myGitlabMrShaHead=$(printf "%s" "${myGitlabMrVersionLatest}" | jq -r ".head_commit_sha")
myGitlabMrShaStart=$(printf "%s" "${myGitlabMrVersionLatest}" | jq -r ".start_commit_sha")
# set discussion info
myGitlabMrDiscussionFilePath="aws/terraform/_scripts/alb.tf"
myGitlabMrDiscussionLineNumber=134
myGitlabMrDiscussionText="TEMPORARY-TEST-COMMENT"
myGitlabMrDiscussionText=$(cat <<-'MY_BASH_HERE_DOCUMENT_MARK'
THIS  
```bash
echo $0
```
IS MULTI  
LINES  
COMMENT  
MY_BASH_HERE_DOCUMENT_MARK
)
# add discussion to MR
./gitlab-mr-discussions-add.js \
  "${myGitlabProjectId}" "${myGitlabMergeRequestIid}" \
  "${myGitlabMrShaBase}" "${myGitlabMrShaHead}" "${myGitlabMrShaStart}" \
  "${myGitlabMrDiscussionFilePath}" "${myGitlabMrDiscussionFilePath}" "${myGitlabMrDiscussionLineNumber}" \
  "${myGitlabMrDiscussionText}"
````
