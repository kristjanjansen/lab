const runners = {
    '.js': { runner: 'node', lang: 'node' },
    '.py': { runner: 'python', lang: 'python' },
    '.r': { runner: 'rscript', lang: 'r' },
    '.jl': { runner: 'julia', lang: 'julia' }
}

module.exports = runners