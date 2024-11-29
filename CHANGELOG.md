## Changelog

### 2.3.0
* fix multiple "Undefined array key" log warnings occurring since php7 or 8
* [Dev Breaking Change] Moved WordPress plugin files from the `document-git/` subfolder to the root folder to follow best practices. This change improves maintainability but may cause issues when comparing files before and after this commit. Note: This does not affect end users.

### 2.2.0
* Plugin didn't authenticate correctly to GitHub

### 2.1.0
* Styles were not enqueued properly which led to default markdown rendering

### 2.0.0
* Created Settings subpage for the plugin (BREAKING CHANGE)

### 1.1.1
* Fix GitLab URLs for subdirectory markdown paths

### 1.1.0
* Implement static caching

### 1.0.2
* Fixed rate limiting for unauthenticated `/markdown` requests
* Fixed Jupyter implementation

### 1.0.0
* First version
