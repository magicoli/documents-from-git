## Frequently Asked Questions

### Does the plugin offer a UI

Yes, since v2.0.0 the plugin has a subpage in the main Settings menu.

### Does the plugin support caching?

Yes, since v1.1.0 the plugin supports static caching of all relevant information. See the ["Caching" section](https://github.com/gis-ops/wordpress-markdown-git#caching) for details.

### Are relative links supported?

No, relative image links (e.g. `![img](./img.png)`) cannot be processed by this plugin. Please see the notes in the [documentation](https://github.com/gis-ops/wordpress-markdown-git#images) for ways to work around this limitation.

### Can I host the source file in a private repository?

Yes, you can, if you provide the plugin's `config.json` with the necessary credentials for your platform (see [documentation](https://github.com/gis-ops/wordpress-markdown-git#global-attributes) for details). However, be aware that all image URLs you are referencing are openly accessible or provide the necessary authentication means. Also see [#13](https://github.com/gis-ops/wordpress-markdown-git/issues/13#issuecomment-638965192) and the [documentation](https://github.com/gis-ops/wordpress-markdown-git#images) for further details.

### Images

Images cannot (yet) be referenced with a relative link, i.e. `[some_image](./some_image.jpg)` won't work, as WordPress will try to access the image relative to your WordPress installation, e.g. `https://myblog.com/some_image.jpg`. See [#15](https://github.com/gis-ops/wordpress-markdown-git/issues/15) for a discussion on the topic.

The solution is to either
1. upload the image to WordPress and use the provided link
2. push the Markdown file to the cloud, view the file in the browser and copy the provider-generated image address
3. put the images in a repository folder and reference absolute links to your repository's raw files

**Note**, the last two options might be more involved when the image (alongside the Markdown file) is hosted in a private repository. Either the provider provides a token-authenticated URL for hosted images which you can use (see. e.g. [#13](https://github.com/gis-ops/wordpress-markdown-git/issues/13#issuecomment-638965192) for Bitbucket). Or publish the image(s) in a separate **public** repository. Or use option 1.

It's generally recommended to publish (and version) images alongside their Markdown document in Git.

### API rate limit exceeded

If you encounter this message instead of seeing your rendered Markdown file, you most likely have forgotten to provide your Github username and access token in the `config.json`. See [Global attributes](#global-attributes) for a How-To and [Usage](#usage) for more information why this is necessary.
