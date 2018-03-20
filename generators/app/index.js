const Generator = require('yeoman-generator');
const changeCase = require('change-case');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.argument(
            'portletName',
            {
                type: String,
                required: true
            }
        );
    }

    initializing() {
        // Your initialization methods (checking current project state, getting configs, etc)
    }

    prompting() {
        // Where you prompt users for options (where you'd call this.prompt())
    }

    configuring() {
        // Saving configurations and configure the project (creating .editorconfig files and other metadata files)

        const userVariables = {
            portletName: this.options.portletName,
            bundle: changeCase.dotCase(this.options.portletName),
            camel: changeCase.camelCase(this.options.portletName)
        }

        //Global copy
        this.fs.copy(
            this.templatePath('./'),
            this.destinationPath(`./${this.options.portletName}`)
        );

        // Copy dot files
        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath(`./${this.options.portletName}/.babelrc`)
        );
        this.fs.copy(
            this.templatePath('.editorconfig'),
            this.destinationPath(`./${this.options.portletName}/.editorconfig`)
        );
        this.fs.copy(
            this.templatePath('.npmbundlerrc'),
            this.destinationPath(`./${this.options.portletName}/.npmbundlerrc`)
        );
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath(`./${this.options.portletName}/.gitignore`)
        );

        //Replace user atributes from variable files
        this.fs.copyTpl(
            this.templatePath('bnd.bnd'),
            this.destinationPath(`./${this.options.portletName}/bnd.bnd`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('package-lock.json'),
            this.destinationPath(`./${this.options.portletName}/package-lock.json`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(`./${this.options.portletName}/package.json`),
            userVariables
        )
    }

    default() {
        // If the method name doesn't match a priority, it will be pushed to this group.
    }

    writing() {
        // Where you write the generator specific files (routes, controllers, etc)

        const userVariables = {
            portletName: this.options.portletName,
            bundle: changeCase.dotCase(this.options.portletName),
            camel: changeCase.camelCase(this.options.portletName)
        }

        //Replace user atributes from variable files
        this.fs.copyTpl(
            this.templatePath('src/main/resources/META-INF/resources/js/angular-loader.ts'),
            this.destinationPath(`./${this.options.portletName}/src/main/resources/META-INF/resources/js/angular-loader.ts`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/content/Language.properties'),
            this.destinationPath(`./${this.options.portletName}/src/main/resources/content/Language.properties`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/META-INF/resources/view.jsp'),
            this.destinationPath(`./${this.options.portletName}/src/main/resources/META-INF/resources/view.jsp`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/META-INF/resources/js/app/app.component.ts'),
            this.destinationPath(`./${this.options.portletName}/src/main/resources/META-INF/resources/js/app/app.component.ts`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/META-INF/resources/js/app/app.module.ts'),
            this.destinationPath(`./${this.options.portletName}/src/main/resources/META-INF/resources/js/app/app.module.ts`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/myNpmAngularPortlet/portlet/MyNpmAngularPortlet.java'),
            this.destinationPath(`./${this.options.portletName}/src/main/java/${changeCase.pathCase(this.options.portletName)}/portlet/${changeCase.camelCase(this.options.portletName)}.java`),
            userVariables
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/myNpmAngularPortlet/constants/MyNpmAngularPortletKeys.java'),
            this.destinationPath(`./${this.options.portletName}/src/main/java/${changeCase.pathCase(this.options.portletName)}/constants/${changeCase.camelCase(this.options.portletName)}Keys.java`),
            userVariables
        );
        this.fs.delete(
            this.destinationPath(`./${this.options.portletName}/src/main/java/myNpmAngularPortlet/`)
        );
    }

    conflicts() {
        // Where conflicts are handled (used internally)
    }

    install() {
        // Where installations are run (npm, bower)
        const elementDir = `${process.cwd()}/${this.options.portletName}`;
        process.chdir(elementDir);

        this.installDependencies({
            npm: true,
            bower: false
        })
    }

    end() {
        // Called last, cleanup, say good bye, etc
        this.log('Your portlet has been created succesfully.');
    }
};