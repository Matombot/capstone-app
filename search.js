var https = require('https');
module.exports = function(twitterOptions){
return {
search: function(query, count, cb){
// TODO
}
};
};
var twitter = require('./lib/twitter')({
    consumerKey: credentials.twitter.consumerKey,
    consumerSecret: credentials.twitter.consumerSecret,
    });
    twitter.search('#meadowlarktravel', 10, function(result){
    // tweets will be in result.statuses
    });
    var https = require('https');
module.exports = function(twitterOptions){
// this variable will be invisible outside of this module
var accessToken;
// this function will be invisible outside of this module
function getAccessToken(cb){
if(accessToken) return cb(accessToken);
// TODO: get access token
}
return {
search: function(query, count, cb){
// TODO
},
};
};
function getAccessToken(cb){
    if(accessToken) return cb(accessToken);
    var bearerToken = Buffer(
    encodeURIComponent(twitterOptions.consumerKey) + ':' +
    encodeURIComponent(twitterOptions.consumerSecret)
    ).toString('base64');
    var options = {
    hostname: 'api.twitter.com',
    port: 443,
    method: 'POST',
    path: '/oauth2/token?grant_type=client_credentials',
    headers: {
    'Authorization': 'Basic ' + bearerToken,
    },
    };
    https.request(options, function(res){
    var data = '';
    res.on('data', function(chunk){
    data += chunk;
    });
    res.on('end', function(){
    var auth = JSON.parse(data);
    if(auth.token_type!=='bearer') {
    console.log('Twitter auth failed.');
    return;
    }
    accessToken = auth.access_token;
    cb(accessToken);
    });
    }).end();
    }
 function search (query, count, cb){
        getAccessToken(function(accessToken){
        var options = {
        hostname: 'api.twitter.com',
        port: 443,
        method: 'GET',
        path: '/1.1/search/tweets.json?q=' +
        encodeURIComponent(query) +
        '&count=' + (count || 10),
        headers: {
        'Authorization': 'Bearer ' + accessToken,
        },
        };
        https.request(options, function(res){
        var data = '';
        res.on('data', function(chunk){
        data += chunk;
        });
        res.on('end', function(){
        cb(JSON.parse(data));
        });
        }).end();
    });
}
//rendering tweets
 function embed (statusId, options, cb){
    if(typeof options==='function') {
    cb = options;
    options = {};
    }
    options.id = statusId;
    getAccessToken(function(accessToken){
    var requestOptions = {
    hostname: 'api.twitter.com',
    port: 443,
    method: 'GET',
    path: '/1.1/statuses/oembed.json?' +
    querystring.stringify(options),
    headers: {
    'Authorization': 'Bearer ' + accessToken,
    },
    };
    https.request(requestOptions, function(res){
    var data = '';
    res.on('data', function(chunk){
    data += chunk;
    });
    res.on('end', function(){
    cb(JSON.parse(data));
    });
    }).end();
    });
    }
    //Now we’re ready to search for, and cache, tweets. In our main app file, let’s create an
    //object to store the cache:
    var topTweets = {
    count: 10,
    lastRefreshed: 0,
    refreshInterval: 15 * 60 * 1000,
    tweets: [],
}
function getTopTweets(cb){
    if(Date.now() < topTweets.lastRefreshed + topTweets.refreshInterval)
    return cb(topTweets.tweets);
    twitter.search('#meadowlarktravel', topTweets.count, function(result){
    var formattedTweets = [];
    var promises = [];
    var embedOpts = { omit_script: 1 };
    result.statuses.forEach(function(status){
    var deferred = Q.defer();
    twitter.embed(status.id_str, embedOpts, function(embed){
    formattedTweets.push(embed.html);
    deferred.resolve();
    });
    promises.push(deferred.promise);
    });
    Q.all(promises).then(function(){
    topTweets.lastRefreshed = Date.now();
    cb(topTweets.tweets = formattedTweets);
    });
    });
    }
    