var App = require('yeoman-generator');
var changeCase = require('change-case')

/*var snake = toSnake(answers.title, '-');
var splitted = snake.split("-"); */

module.exports = class extends App {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    
        /*this.argument('title', { type: String, required: true});
        this.argument('bundle', { type: String, required: true});*/
      }

      prompting() {
          return this.prompt([{
              type  : 'input',
              name  : 'title',
              message   : 'Your project name',
              default   : this.appname
          }]).then((answers) => {
            this.fs.copy(
                this.templatePath('.'),
                this.destinationPath('./' + answers.title)
            );
            this.fs.copy(
                this.templatePath('.babelrc'),
                this.destinationPath('./' + answers.title + '/.babelrc')
            );
            this.fs.copy(
                this.templatePath('.npmbundlerrc'),
                this.destinationPath('./' + answers.title + '/.npmbundlerrc')
            );
            this.fs.copy(
                this.templatePath('.gitignore'),
                this.destinationPath('./' + answers.title + '/.gitignore')
            );
            this.fs.copy(
                this.templatePath('.editorconfig'),
                this.destinationPath('./' + answers.title + '/.editorconfig')
            );
            this.fs.copy(
                this.templatePath('gulpfile.js'),
                this.destinationPath('./' + answers.title + '/gulpfile.js')
            );
            this.fs.copy(
                this.templatePath('src/main/java/myNpmAngularPortlet/constants/'),
                this.destinationPath('./' + answers.title+'/src/main/java/'+ changeCase.pathCase(answers.title)+'/')  
            ); 
            this.fs.copy(
                this.templatePath('src/main/java/myNpmAngularPortlet/portlet/'),
                this.destinationPath('./' + answers.title +'/src/main/java/'+ changeCase.pathCase(answers.title) +'/')  
            ); 
            this.fs.delete(
                this.destinationPath('./' + answers.title+'/src/main/java/myNpmAngularPortlet/')
            );
            this.fs.copyTpl(
                this.templatePath('bnd.bnd'),
                this.destinationPath('./' + answers.title+'/bnd.bnd'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('package-lock.json'),
                this.destinationPath('./' + answers.title+'/package-lock.json'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('src/main/resources/META-INF/resources/js/angular-loader.ts'),
                this.destinationPath('./' + answers.title+'/src/main/resources/META-INF/resources/js/angular-loader.ts'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('src/main/resources/content/Language.properties'),
                this.destinationPath('./' + answers.title+'/src/main/resources/content/Language.properties'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('./' + answers.title+'/package.json'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('src/main/resources/META-INF/resources/view.jsp'),
                this.destinationPath('./' + answers.title+'/src/main/resources/META-INF/resources/view.jsp'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title)}
            );
            this.fs.copyTpl(
                this.templatePath('src/main/resources/META-INF/resources/js/app/app.component.ts'),
                this.destinationPath('./' + answers.title +'/src/main/resources/META-INF/resources/js/app/app.component.ts'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('src/main/resources/META-INF/resources/js/app/app.module.ts'),
                this.destinationPath('./' + answers.title +'/src/main/resources/META-INF/resources/js/app/app.module.ts'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title) }
            );
            this.fs.copyTpl(
                this.templatePath('src/main/java/myNpmAngularPortlet/portlet/MyNpmAngularPortlet.java'),
                this.destinationPath('./' + answers.title  +'/src/main/java/'+ changeCase.pathCase(answers.title) + '/portlet/' + changeCase.camelCase(answers.title) +'.java'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title)}
            );
            this.fs.copyTpl(
                this.templatePath('src/main/java/myNpmAngularPortlet/constants/MyNpmAngularPortletKeys.java'),
                this.destinationPath('./' + answers.title  +'/src/main/java/'+ changeCase.pathCase(answers.title) + '/constants/' + changeCase.camelCase(answers.title) +'Keys.java'),
                { title: answers.title, bundle: changeCase.dotCase(answers.title), camel: changeCase.camelCase(answers.title)}
            );
            this.fs.delete(
                this.destinationPath('./' + answers.title  +'/src/main/java/' + changeCase.pathCase(answers.title) + '/MyNpmAngularPortlet.java')
            );
            this.fs.delete(
                this.destinationPath('./' + answers.title  +'/src/main/java/' + changeCase.pathCase(answers.title) + '/MyNpmAngularPortletKeys.java')
            );
          });
      }
};