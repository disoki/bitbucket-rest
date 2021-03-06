var unirest = require('unirest');
var Mustache = require('mustache');


/*******************************************************************************************
 * Bitbucket Class Constrcutor
 ******************************************************************************************/

var BitBucket = function (options) {
    this.username = options.username;
    this.password = options.password;
    this.root = "api.bitbucket.org";
    this.api = require('./api.js');

    self = this;
    this.getCredentials = function () {
        return {user: this.username, pass: this.password, sendImmediately: true} ;
    };
    this.getUrl = function (resource, data) {
        var apiVersion = self.api[resource].apiVersion;
        var apiPath = self.api[resource] ? Mustache.render(self.api[resource].path, data) : '';
        return "https://" + this.root + "/" + apiVersion + apiPath;
    }
    this.getMethod = function (resource) {
        return self.api[resource].method
    }
    this.getMethodToSendData = function(resource) {
        var sendMethods = {
            '1.0' : 'form',
            '2.0' : 'send'
        };
        return sendMethods[self.api[resource].apiVersion]
    }
}
exports.connectClient = function (options) {
    if (!options.username) { throw new Error('Username is required'); }
    if (!options.password) { throw new Error('Password is required'); }
    return new BitBucket(options);
};




/*******************************************************************************************
 * Repository - CRUD
 ******************************************************************************************/

BitBucket.prototype.createRepo = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var newRepo = {
        owner : repository.owner,
        repo_slug : repository.repo_slug,

        name : repository.name ? repository.name : undefined,
        description : repository.description ? repository.description : undefined,
        is_private : repository.is_private ? repository.is_private : undefined,  //true, false

        scm : repository.scm ? repository.scm : undefined,
        forking_policy : repository.forking_policy ? repository.forking_policy : undefined,    // 'no_public_forks', 'allow_forks', 'no_forks'
        language : repository.language ? repository.language : undefined,
        has_issues : repository.has_issues ? repository.has_issues : undefined,
        has_wiki : repository.has_wiki ? repository.has_wiki : undefined
    }

    var self = this;
    var url = self.getUrl('repo.create', repository);
    var method = self.getMethod('repo.create');
    var sendData = self.getMethodToSendData('repo.create')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
    Request[sendData](newRepo)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.getRepoDetails = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.details', repository);
    var method = self.getMethod('repo.details');
    var sendData = self.getMethodToSendData('repo.details')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.updateRepoDetails = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var newRepo = {
        name : repository.name ? repository.name : undefined,
        description : repository.description ? repository.description : undefined,
        is_private : repository.is_private ? repository.is_private : undefined,  //true, false

        language : repository.language ? repository.language : undefined,
        has_issues : repository.has_issues ? repository.has_issues : undefined,
        has_wiki : repository.has_wiki ? repository.has_wiki : undefined
    }

    var self = this;
    var url = self.getUrl('repo.details.update', repository);
    var method = self.getMethod('repo.details.update');
    var sendData = self.getMethodToSendData('repo.details.update')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
    Request[sendData](newRepo)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.deleteRepo = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.delete', repository);
    var method = self.getMethod('repo.delete');
    var sendData = self.getMethodToSendData('repo.delete')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};



/*******************************************************************************************
 * * Repository - Forks
 ******************************************************************************************/

BitBucket.prototype.forkRepo = function (repository, forkRepository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!forkRepository.name) { return cb(new Error('Fork Repository name is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var repo = {
        owner : repository.owner,
        repo_slug : repository.repo_slug
    };

     var forkRepo = {
        name : forkRepository.name ? forkRepository.name : undefined,
        description : forkRepository.description ? forkRepository.description : undefined,
        is_private : forkRepository.is_private ? forkRepository.is_private : undefined,  //true, false

        scm : forkRepository.scm ? forkRepository.scm : undefined,
        language : forkRepository.language ? forkRepository.language : undefined,
    };

    var self = this;
    var url = self.getUrl('repo.fork', repo);
    var method = self.getMethod('repo.fork');
    var sendData = self.getMethodToSendData('repo.fork')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
    Request[sendData](forkRepo)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.getRepoForks = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.fork.list', repository);
    var method = self.getMethod('repo.fork.list');
    var sendData = self.getMethodToSendData('repo.fork.list')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};



/*******************************************************************************************
 * * Repository - Branches
 ******************************************************************************************/

BitBucket.prototype.getRepoBranches = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.branch.list', repository);
    var method = self.getMethod('repo.branch.list');
    var sendData = self.getMethodToSendData('repo.branch.list')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.getRepoMainBranch = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.branch.main', repository);
    var method = self.getMethod('repo.branch.main');
    var sendData = self.getMethodToSendData('repo.branch.main')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};



 /*******************************************************************************************
 * * Repository - Deploy Keys
 ******************************************************************************************/

BitBucket.prototype.getRepoDeployKeys = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.deploy-keys.list', repository);
    var method = self.getMethod('repo.deploy-keys.list');
    var sendData = self.getMethodToSendData('repo.deploy-keys.list')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.getRepoDeployKeyContent = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!repository.pk) { return cb(new Error('Deploy key_id (pk) is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.deploy-keys.content', repository);
    var method = self.getMethod('repo.deploy-keys.content');
    var sendData = self.getMethodToSendData('repo.deploy-keys.content')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.addRepoDeployKey = function (repoDeploy, cb) {

    if (!repoDeploy.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repoDeploy.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var deployKey = {
        label : repoDeploy.label,
        key : repoDeploy.key
    }

    var self = this;
    var url = self.getUrl('repo.deploy-keys.add', repoDeploy);
    var method = self.getMethod('repo.deploy-keys.add');
    var sendData = self.getMethodToSendData('repo.deploy-keys.add')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
    Request[sendData](deployKey)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.deleteRepoDeployKey = function (repository, cb) {

    if (!repository.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repository.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!repository.pk) { return cb(new Error('Deploy key_id (pk) is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.deploy-keys.delete', repository);
    var method = self.getMethod('repo.deploy-keys.delete');
    var sendData = self.getMethodToSendData('repo.deploy-keys.delete')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};



/*******************************************************************************************
 * Repository - Hooks Service
 ******************************************************************************************/

BitBucket.prototype.addRepoHook = function (repoHook, cb) {

    if (!repoHook.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repoHook.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!repoHook.type) { return cb(new Error('Hook type is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var serviceHook = {
        type : repoHook.type,
        URL : repoHook.URL
    }

    var self = this;
    var url = self.getUrl('repo.hooks.add', repoHook);
    var method = self.getMethod('repo.hooks.add');
    var sendData = self.getMethodToSendData('repo.hooks.add')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
    Request[sendData](serviceHook)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.getRepoHooks = function (repoHook, cb) {

    if (!repoHook.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repoHook.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.hooks.list', repoHook);
    var method = self.getMethod('repo.hooks.list');
    var sendData = self.getMethodToSendData('repo.hooks.list')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.getRepoHookContent = function (repoHook, cb) {

    if (!repoHook.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repoHook.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!repoHook.id) { return cb(new Error('Service Hook id is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.hooks.content', repoHook);
    var method = self.getMethod('repo.hooks.content');
    var sendData = self.getMethodToSendData('repo.hooks.content')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.updateRepoHook = function (repoHook, cb) {

    if (!repoHook.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repoHook.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!repoHook.id) { return cb(new Error('Service Hook id is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var serviceHook = {
//        type : repoHook.type,
        URL : repoHook.URL
    }

    var self = this;
    var url = self.getUrl('repo.hooks.update', repoHook);
    var method = self.getMethod('repo.hooks.update');
    var sendData = self.getMethodToSendData('repo.hooks.update')
    var credentials = self.getCredentials();

    var Request = unirest[method](url);
    Request.auth(credentials)
    Request[sendData](serviceHook)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};


BitBucket.prototype.deleteRepoHook = function (repoHook, cb) {

    if (!repoHook.repo_slug) { return cb(new Error('Repository slug is required.'), null); }
    if (!repoHook.owner) { return cb(new Error('Repository owner is required.'), null); }
    if (!repoHook.id) { return cb(new Error('Service Hook id is required.'), null); }
    if (!cb) { return cb(new Error('Callback is required.'), null); }

    var self = this;
    var url = self.getUrl('repo.hooks.delete', repoHook);
    var method = self.getMethod('repo.hooks.delete');
    var sendData = self.getMethodToSendData('repo.hooks.delete')
    var credentials = self.getCredentials();


    var Request = unirest[method](url);
    Request.auth(credentials)
        .end(function (response) {
            cb({status:response.status, data : response.body})
        });
};