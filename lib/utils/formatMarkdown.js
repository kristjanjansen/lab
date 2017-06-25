const marked = require('marked');
const chalk = require('chalk');

function toConsole(markdown) {

    let renderer = new marked.Renderer();
    
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
    
    return marked(markdown, { renderer, breaks: true})

}

function toHtml(markdown) {

    let renderer = new marked.Renderer();
    
    renderer.code = (code) => {
        return '<pre>'
            + code
                .split(/\n/)
                .map(row => { return row
                    .replace(/lab/g, '<span class="lab">lab</span>')
                    .replace(/id/g, '<span class="id">id</span>')
                })
                .join('\n')
            + '</pre>'
    }
    
    return marked(markdown, { renderer, breaks: true})

}

module.exports = { toConsole, toHtml }