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