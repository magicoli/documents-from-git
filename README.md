# Documents from Git - Oli's version

This WordPress Plugin lets you easily publish, collaborate on and version control your \[**Markdown, Jupyter notebook**\] documents directly from your favorite remote Git platform, **even if it's self-hosted**.

The advantages are:

- Write documents in your favorite editor and just push to your remote repository to update your blog instantly
- Use the power of version control: publish different versions of the document in different posts, i.e. from another branch or commit than latest `master`
- Easy to update by your readers via pull requests, minimizing the chance of stale tutorials

The following document types are currently supported:

- Markdown
- Jupyter notebooks (**only for public repositories**)

The following platforms are currently supported:

- Github
- Bitbucket
- Gitlab

## Usage

**Note**, this plugin uses Github's wonderful [`/markdown` API](https://developer.github.com/v3/markdown/) to render to HTML. This comes with 2 caveats:

1. Unless authenticated, the rate limit is set at 60 requests per minute. Since v1.1.0 the plugin is capable of statically [caching content](#caching). In case that's not dynamic enough for you, your only option currently is to not use any cache in which case every document will be pulled from your provider every time someone opens it on your site. Then it's **strongly recommended** to create a Github access token and register it with the plugin. Then the rate limit will be set to 5000 requests per hour. See [Global attributes section](#global-attributes) for details on how to do that.
2. The Markdown content cannot exceed 400 KB, so roughly 400 000 characters incl whitespace. If not a monographic dissertation, this should not be an applicable limit though.

### Configuration

In the main menu _Settings_ > _Documents from Git_ you can set all important global settings.

**Note**: previous `config.json` is **deprecated** now due to security concerns.

## Shortcodes

The features of the plugin are provided through shortcodes. You can use them in your posts, pages or custom post types.

### Publish documents

`[git-<platform>-<action>]` The document-specific shortcode

- `<platform>` can be one of
    - `github`: if you use Github as your VCS platform
    - `bitbucket`: if you use Bitbucket as your VCS platform
    - `gitlab`: if you use Gitlab as your VCS platform
- `<action>` can be one of
    - `markdown`: Render your Markdown files hosted on your VCS platform in Github's rendering style
    - `jupyter`: Render your Jupyter notebook hosted on your VCS platform (**only for public repositories**)
    - `checkout`: Renders a small badge-like box with a link to the document and the date of the last commit
    - `history`:  Renders a `<h2>` section with the last commit dates, messages and authors

### Manipulate rendering style

`[git-add-css]` adds a `<div id="git-add-css" class="<classes_attribute>"` to wrap content. That way you can manipulate the style freely with additional CSS classes. Follow these steps:

1. Add a CSS file to your theme's root folder, which contains some classes, e.g. `class1`, `class2`, `class3`
2. Enqueue the CSS file by adding `wp_enqueue_style('my-style', get_template_directory_uri().'/my-style.css');` to the theme's `functions.php`
3. Add the enclosing `git-add-css` shortcode to your post with the custom CSS classes in the `classes` attribute, e.g.:

```
[git-add-css classes="class1 class2 class3"]
    [git-gitlab-checkout url=...]
    [git-gitlab-markdown url=...]
    [git-gitlab-history url=...]
[/git-add-css]
```

### Attributes

Each shortcode takes a few attributes, indicating if it's required for public or private repositories:

* `url`: The URL of the document in the repository
    - Type: string
    - Action: all except `git-add-css`
    - Public repo: :ballot_box_with_check:
    - Private repo: :ballot_box_with_check:
* `user`: The **user name** (not email) of an authorized user
    - Type: string
    - Action: all except `git-add-css`
    - Public repo: :negative_squared_cross_mark:
    - Private repo: :ballot_box_with_check:
* `token`: The access token/app password for the authorized user
    - Type: string
    - Action: all except `git-add-css`
    - Public repo: :negative_squared_cross_mark:
    - Private repo: :ballot_box_with_check:
* `cache_ttl`: The time in seconds that the plugin will cache, **only for `cache_strategy=static`**.
    - Type: integer
    - Action: all except `git-add-css`
    - Public repo: :negative_squared_cross_mark:
    - Private repo: :negative_squared_cross_mark:
* `cache_strategy`: Only `static` caching is implemented so far. `dynamic` caching is on the way!
    - Type: integer
    - Action: all except `git-add-css`
    - Public repo: :negative_squared_cross_mark:
    - Private repo: :negative_squared_cross_mark:
* `limit`: Limits the history of commits to this number. Default 5.
    - Type: integer
    - Action: `history`
    - Public repo: :negative_squared_cross_mark:
    - Private repo: :negative_squared_cross_mark:
* `classes`: The additional CSS classes to render the content with
    - Type: string
    - Action: `git-add-css`
    - Public repo: :ballot_box_with_check:
    - Private repo: :ballot_box_with_check:

## Caching

Often we need to prioritize speed when loading content and, in addition, it is very costly to fetch, load and format the content every time we need to read the content of the post.

This plugin soon offers 2 methods for caching, `static` and `dynamic` which can be set via the `cache_strategy` property.

* Static caching (`cache_strategy=static`)

    This is the default strategy, as it doesn't require any user action.

    The property `cache_ttl` sets how many **seconds** the content cache will keep alive.

    Currently there's no way to flush the cache manually. However, changing `cache_ttl` or the history `limit` will create a new cache.

* Dynamic caching (`cache_strategy=dynamic`)

    **This is not implemented yet**. See [#20](https://github.com/gis-ops/wordpress-markdown-git/issues/20) for details.

## `Token` authorization

You **need to** authorize via `user` and `token` if you intend to publish from a private repository. You **don't need to** authorize if the repository is open.

However, keep in mind that some platforms have stricter API limits for anonymous requests which are greatly extended if you provide your credentials. So even for public repos it could make sense. And unless you use this plugin's [caching capabilities](#caching), it's strongly recommended to register a Github access token regardless of the VCS hosting platform, see the [beginning of the chapter](#usage).

How to generate the `token` depends on your platform:

- Github: Generate a Personal Access Token following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
- Bitbucket: Generate a App Password following [these instructions](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html#Apppasswords-Createanapppassword)
- Gitlab: Generate a Personal Access Token following [these instructions](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token)

This plugin needs only **Read access** to your repositories. Keep that in mind when creating an access token.

## Examples

We publish our own tutorials with this plugin: https://gis-ops.com/tutorials/.

* Publish Markdown from Github

    `[git-github-markdown url="https://github.com/gis-ops/tutorials/blob/master/qgis/QGIS_SimplePlugin.md"]`

* Publish Markdown from Github with 1 hour cache

    `[git-github-markdown url="https://github.com/gis-ops/tutorials/blob/master/qgis/QGIS_SimplePlugin.md" cache_ttl="3600" cache_strategy="static"]`

* Publish Jupyter notebook from Github

    `[git-github-jupyter url="https://github.com/GIScience/openrouteservice-examples/blob/master/python/ortools_pubcrawl.ipynb"]`

* Publish from a private repository

    `[git-bitbucket-jupyter user=nilsnolde token=3292_2p3a_84-2af url="https://bitbucket.org/nilsnolde/test-wp-plugin/src/master/README.md"]`

* Display last commit and document URL from Bitbucket

    `[git-bitbucket-checkout url="https://bitbucket.org/nilsnolde/test-wp-plugin/src/master/README.md"]`

* Display commit history from Gitlab

    `git-gitlab-history limit=5 url="https://gitlab.com/nilsnolde/esy-osm-pbf/-/blob/master/README.md"]`

* Use additional CSS classes to style

    The following example will put a dashed box around the whole post:

    ```
    [git-add-css classes="md-dashedbox"]
        [git-github-checkout url="https://github.com/gis-ops/tutorials/blob/master/qgis/QGIS_SimplePlugin.md"]
        [git-github-markdown url="https://github.com/gis-ops/tutorials/blob/master/qgis/QGIS_SimplePlugin.md"]
        [git-github-history url="https://github.com/gis-ops/tutorials/blob/master/qgis/QGIS_SimplePlugin.md"]
    [/git-add-css]
    ```

    With the following CSS file contents enqueued to your theme:

    ```css
    div.md_dashedbox {
        position: relative;
        font-size: 0.75em;
        border: 3px dashed;
        padding: 10px;
        margin-bottom:15px
    }

    div.md_dashedbox div.markdown-github {
        color:white;
        line-height: 20px;
        padding: 0px 5px;
        position: absolute;
        background-color: #345;
        top: -3px;
        left: -3px;
        text-transform:none;
        font-size:1em;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    ```

## Installation

### WordPress.org

The latest version is on Oli's **GitHub repository**

https://github.com/magicoli/documents-from-git

There is no automatic update process from GitHub. You need to download the latest release and upload it to your WordPress installation, or, for advanced users, clone the repository into your `wp-content/plugins` folder and use git features.

**Note**: The release from the original author on WordPress plugin store is deprecated and does not receive updates [Documents from Git](https://wordpress.org/plugins/documents-from-git/).

## Troubleshooting

For troubleshooting and frequently asked questions, please refer to the [FAQ](FAQ.md) page.

## Acknowledgements

Contributions from other projects

* [Nils Nolde](https://github.com/nilsnolde), former maintainer of the plugin.

    The file structure has been reorganised from the original version to make it more maintainable and to follow WordPress best practices, mainly bringing the wordpress file structure to the root folder, so applying this repo modifications to an original clone might need some extra preparation, but is not impossible.

* [`github-markdown-css`](https://github.com/sindresorhus/github-markdown-css): CSS project for the Github flavored Markdown style, License MIT
    - This plugin maintains a copy of the CSS file
* [`nbconvert`](https://github.com/ghandic/nbconvert): Wordpress plugin to convert Jupyter notebooks into blog posts, License MIT
    - The idea for this plugin was mainly inspired by `nbconvert` and borrows some of the HTML and the CSS for Jupyter notebooks
* [Jason Long](https://twitter.com/jasonlong): Git logos under [Creative Commons Attribution 3.0 Unported License](https://creativecommons.org/licenses/by/3.0/)


[![PDC](https://www.pdc.org/wp-content/uploads/2019/05/PDCLogo-Optimized.png)](https://www.pdc.org)
Sponsored the Bitbucket integration.
