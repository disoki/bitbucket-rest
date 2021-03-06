var bitbucket = require('../lib/bitbucket.js');
var client = bitbucket.connectClient( {username:'username', password:'password'});

var OWNER = 'account_owner_name';
var REPO_SLUG = 'sample_repo';
var REPO_NAME = 'sample_repo';
var FORK_NAME = 'sample_fork';
var RSA_KEY = 'ssh-rsa MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB sample@gmail.com';
var DEPLOY_KEY_ID = '683815';
var HOOK_URL = 'http://www.sample.com/';
var HOOK_ID = '1516887';
var HOOK_URL_MODIFY = 'http://www.sample.com/service/hook';


///* *******************************************************************
// * REPOSITORY - CRUD
// * ****************************************************************** */
//
// /* Create a New Repository
// * ------------------------------------------------------------------ */
//var repo = {
//    owner : OWNER,
//    repo_slug : REPO_SLUG,
//    name : REPO_NAME,
//    description : 'Sample Repository',
//    is_private : false,
//    forking_policy : 'no_public_forks', //'allow_forks', 'no_forks'
////    language : '',
//    has_issues : false,
//    has_wiki : false,
//    scm : 'git'
//};
//client.createRepo(repo, function(res){
//    console.log(res)
//});
//
///* Get Repository Details
// * ------------------------------------------------------------------ */
//client.getRepoDetails({owner:OWNER, repo_slug:REPO_SLUG}, function(res){
//    console.log(res)
//});
//
///* Update Repository Details
// * ------------------------------------------------------------------ */
//var repoDetail = {
//    owner : OWNER,
//    repo_slug : REPO_SLUG,
//    name : REPO_NAME,
//    description : 'Sample Repository - Updated',
//    is_private : true,
////    language : '',
//    scm : 'git'
//};
//client.updateRepoDetails(repoDetail, function(res){
//    console.log(res)
//});
//
///* Delete a Repository
// * ------------------------------------------------------------------ */
//client.deleteRepo({owner:OWNER, repo_slug : REPO_SLUG}, function(res){
//    console.log(res)
//});
//
//
//
///* *******************************************************************
// * FORKING
// * ****************************************************************** */
//
// /* Fork a Repository
// * ------------------------------------------------------------------ */
//var forkRepo = {
//    name : FORK_NAME,
//    description : 'Forked the Sample Repository',
//    is_private : true,
////    language : '',
//    scm : 'git'
//};
//client.forkRepo({owner : OWNER, repo_slug : REPO_SLUG }, forkRepo, function(res){
//    console.log(res)
//});
//
///* Get the Forked List of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoForks({owner : OWNER, repo_slug : REPO_SLUG}, function(res){
//    console.log(res)
//});
//
//
//
///* *******************************************************************
// * BRANCHES
// * ****************************************************************** */
//
// /* Get the Branches of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoBranches({owner : OWNER, repo_slug : REPO_SLUG}, function(res){
//    console.log(res)
//});
//
///* Get the Main Branch of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoMainBranch({owner : OWNER, repo_slug : REPO_SLUG}, function(res){
//    console.log(res)
//});
//
//
//
///* *******************************************************************
// * DEPLOYMENT KEYS
// * ****************************************************************** */
//
// /* Add a Deploy-Key to a Repository
// * ------------------------------------------------------------------ */
//var repoDeploy = {
//    owner : OWNER,
//    repo_slug : REPO_SLUG,
//    label : 'SampleKey',
//    key : RSA_KEY
//}
//client.addRepoDeployKey(repoDeploy, function(res){
//    console.log(res)
//});
//
///* Get the Deploy-Keys of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoDeployKeys({owner : OWNER, repo_slug : REPO_SLUG}, function(res){
//    console.log(res)
//});
//
///* Get the Content of a single Deploy-Key of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoDeployKeyContent({owner : OWNER, repo_slug : REPO_SLUG, pk: DEPLOY_KEY_ID}, function(res){
//    console.log(res)
//});
//
///* Delete a Deploy-Key of a Repository
// * ------------------------------------------------------------------ */
//client.deleteRepoDeployKey({owner : OWNER, repo_slug : REPO_SLUG, pk: DEPLOY_KEY_ID}, function(res){
//    console.log(res)
//});
//
//
//
///* *******************************************************************
// * HOOK SERVICE
// * ****************************************************************** */
//
///* Add a New Hook Service to a Repository
// * ------------------------------------------------------------------ */
//var repoHook = {
//    owner : OWNER,
//    repo_slug : REPO_SLUG,
//    type : 'POST',
//    URL : HOOK_URL
//}
//client.addRepoHook(repoHook, function(res){
//    console.log(res)
//});
//
///* Get Hooks of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoHooks({owner : OWNER, repo_slug : REPO_SLUG}, function(res){
//    console.log(res)
//});
//
///* Get the Content of a single Hook of a Repository
// * ------------------------------------------------------------------ */
//client.getRepoHookContent({owner : OWNER, repo_slug : REPO_SLUG, id: HOOK_ID}, function(res){
//    console.log(res)
//});
//
//
///* Update a Hook Service of a Repository
// * ------------------------------------------------------------------ */
//var repoHook = {
//    owner : OWNER,
//    repo_slug : REPO_SLUG,
//    id : HOOK_ID,
//    URL : HOOK_URL_MODIFY
//}
//client.updateRepoHook(repoHook, function(res){
//    console.log(res)
//});
//
///* Delete a Hook of a Repository
// * ------------------------------------------------------------------ */
//client.deleteRepoHook({owner : OWNER, repo_slug : REPO_SLUG, id: HOOK_ID}, function(res){
//    console.log(res)
//});
//
