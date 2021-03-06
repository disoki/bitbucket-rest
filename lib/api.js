module.exports = {

    'repo.create'               : {'path' : '/repositories/{{owner}}/{{repo_slug}}',                    'method': 'post',  apiVersion : '2.0'},
    'repo.details'              : {'path' : '/repositories/{{owner}}/{{repo_slug}}',                    'method': 'get',   apiVersion : '2.0'},
    'repo.delete'               : {'path' : '/repositories/{{owner}}/{{repo_slug}}',                    'method': 'delete',apiVersion : '2.0'},
    'repo.fork.list'            : {'path' : '/repositories/{{owner}}/{{repo_slug}}/forks',              'method': 'get',   apiVersion : '2.0'},
//    'repo.watcher.list'         : {'path' : '/repositories/{{owner}}/{{repo_slug}}/watchers',           'method': 'get',   apiVersion : '2.0'},

    'repo.fork'                 : {'path' : '/repositories/{{owner}}/{{repo_slug}}/fork',               'method': 'post',  apiVersion : '1.0'},
    'repo.details.update'       : {'path' : '/repositories/{{owner}}/{{repo_slug}}',                    'method': 'put',   apiVersion : '1.0'},
    'repo.branch.list'          : {'path' : '/repositories/{{owner}}/{{repo_slug}}/branches',           'method': 'get',   apiVersion : '1.0'},
    'repo.branch.main'          : {'path' : '/repositories/{{owner}}/{{repo_slug}}/main-branch',        'method': 'get',   apiVersion : '1.0'},


    'repo.deploy-keys.list'      : {'path' : '/repositories/{{owner}}/{{repo_slug}}/deploy-keys',        'method': 'get',   apiVersion : '1.0'},
    'repo.deploy-keys.content'   : {'path' : '/repositories/{{owner}}/{{repo_slug}}/deploy-keys/{{pk}}', 'method': 'get',   apiVersion : '1.0'},
    'repo.deploy-keys.add'       : {'path' : '/repositories/{{owner}}/{{repo_slug}}/deploy-keys',        'method': 'post',  apiVersion : '1.0'},
    'repo.deploy-keys.delete'    : {'path' : '/repositories/{{owner}}/{{repo_slug}}/deploy-keys/{{pk}}', 'method': 'delete',apiVersion : '1.0'},


    'repo.hooks.list'           : {'path' : '/repositories/{{owner}}/{{repo_slug}}/services',            'method': 'get',   apiVersion : '1.0'},
    'repo.hooks.content'        : {'path' : '/repositories/{{owner}}/{{repo_slug}}/services/{{id}}',     'method': 'get',   apiVersion : '1.0'},
    'repo.hooks.add'            : {'path' : '/repositories/{{owner}}/{{repo_slug}}/services',            'method': 'post',  apiVersion : '1.0'},
    'repo.hooks.update'         : {'path' : '/repositories/{{owner}}/{{repo_slug}}/services/{{id}}',     'method': 'put',   apiVersion : '1.0'},
    'repo.hooks.delete'         : {'path' : '/repositories/{{owner}}/{{repo_slug}}/services/{{id}}',     'method': 'delete',apiVersion : '1.0'}
}