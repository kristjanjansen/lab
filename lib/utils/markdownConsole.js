const marked = require('marked');
const chalk = require('chalk');

function markdownConsole(markdown) {

    var renderer = new marked.Renderer();
    
    renderer.image = (href, title, text) => {
        return ''
    }

    renderer.paragraph = (text) => {
        return chalk.gray(`${text}\n\n`)
    }
    
    renderer.br = () => {
        return '\n'
    }
    
    renderer.heading = (text, level) => {
        if (level === 1 || level === 2) {
            return chalk.underline(`${text}\n\n`)
        }
        return `${text}\n\n`
    }
    
    renderer.code = (code, string) => {
        return chalk.gray(code
            .split(/\n/)
            .map(row => `    ${
                row
                    .replace(/lab/g, chalk.green('lab'))
                    .replace(/id/g, chalk.cyan('id'))
            }`)
            .join('\n')
            + '\n\n')
    }
    
    return marked(markdown, { renderer: renderer, breaks: true})

}

module.exports = markdownConsole