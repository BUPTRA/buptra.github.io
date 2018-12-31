var RE_FACTION = /\s*\((s|a|e)\)/i;
// var CHALLONGE_API_URL = 'http://challonge.doctype-html.com/v1';
var CHALLONGE_API_URL = 'https://api.challonge.com/v1';
var BIG_TEXT_OPT = {minfontsize: 14, maxfontsize: 16};

function getApiKey() {
    var apiKey = getUrlParam('api_key');
    if (apiKey) {
        return apiKey.replace(/\+/g, ''); // 移除多余的空格 (在文本框中输入内容提交后，空格会转义变成+)
    } else {
        return 'bTEtOC8tGjVOldLqDXLwk8i0Xh0ouhNOBGaP5Z73';
    }
}

function getUrlParam(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && decodeURIComponent(result[1]) || "";
}

function findPlayerById(participants, id) {
    return participants.find(function (participant) {
        return participant.id === id;
    });
}

function cleanPlayerName(name) {
    name = name.replace(RE_FACTION, '');
    if (name.length > 13) {
        return name
            .replace(/\[m8s]/i, '[m8s] ')
            .replace(/(CCZD|YZZD|RTJT|APA|SFT|XYZD|JMZD|WDR)-/i, '$1 ');
    }
    return name;
}

function update(p1Name, p2Name, p1Score, p2Score, p1Faction, p2Faction, showScore, callback) {
    var $scoreborad = $('.scoreborad');
    var $splitter = $('.splitter');
    var $player1Name = $('.player1-name .value');
    var $player2Name = $('.player2-name .value');
    var $player1Score = $('.player1-score .value');
    var $player2Score = $('.player2-score .value');
    var $player1Faction = $('.player1-faction .value');
    var $player2Faction = $('.player2-faction .value');

    $player1Faction.addClass('hidden');
    $player2Faction.addClass('hidden');

    afterBoardHide(function () {

        // Name
        $player1Name.html(p1Name).parent().bigtext(BIG_TEXT_OPT);
        $player2Name.html(p2Name).parent().bigtext(BIG_TEXT_OPT);

        // Score
        $player1Score.html(p1Score);
        $player2Score.html(p2Score);

        // Faction
        $player1Faction.data('faction', p1Faction);
        if (p1Faction) {
            $player1Faction.prop('src', './img/' + p1Faction + '.png');
            $player1Faction.removeClass('hidden');
        }
        $player2Faction.data('faction', p2Faction);
        if (p2Faction) {
            $player2Faction.prop('src', './img/' + p2Faction + '.png');
            $player2Faction.removeClass('hidden');
        }

        if ($player1Faction.hasClass('hidden') && $player2Faction.hasClass('hidden')) {
            $('.faction-mask').addClass('hidden');
        } else {
            $('.faction-mask').removeClass('hidden');
        }

        // Splitter
        if (showScore === 'on') {
            $splitter.text('-');
        } else {
            $splitter.text('VS');
            $player1Score.hide();
            $player2Score.hide();
            $splitter.css({
                transform: 'skew(-30deg)'
            });
        }

        $scoreborad.removeClass('hidden');
        $scoreborad.one('webkitTransitionEnd', callback);
    });

    function afterBoardHide(callback) {
        if ($scoreborad.hasClass('hidden')) {
            // 原来就是隐藏的因此无隐藏动画
            setTimeout(function () {
                callback();
            }, 0);
        } else {
            // 有动画
            $scoreborad.addClass('hidden');
            $scoreborad.one('webkitTransitionEnd', callback);
        }
    }
}

function showAlert(selector) {
    var $target = $(selector);

    if ($target.hasClass('hidden')) {
        $target.removeClass('hidden');
        setTimeout(function () {
            $target.addClass('hidden');
        }, 5000);
    }
}

function loadParticipants(tournamentId) {
    var tournament_url = CHALLONGE_API_URL + '/tournaments/' + encodeURIComponent(tournamentId);
    var url = tournament_url + '/participants.json';
    // return $.get(url, {api_key: getApiKey()})
    return $.ajax({
        url: url,
        data: {api_key: getApiKey()},
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', location.origin);}
    })
        .then(function (resp) {
            return resp.map(function (item) {
                return item.participant;
            });
        });
}

function loadParticipant(tournamentId, participantId) {
    var tournament_url = CHALLONGE_API_URL + '/tournaments/' + encodeURIComponent(tournamentId);
    var url = tournament_url + '/participants/' + participantId + '.json';
    // return $.get(url, {api_key: getApiKey()})
    return $.ajax({
        url: url,
        data: {api_key: getApiKey()},
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', location.origin);}
    })
        .then(function (resp) {
            return resp.participant;
        });
}

function loadTournaments() {
    var url = CHALLONGE_API_URL + '/tournaments.json';
    // return $.get(url, {api_key: getApiKey()})
    return $.ajax({
        url: url,
        data: {api_key: getApiKey()},
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', location.origin);}
    })
        .then(function (resp) {
            return resp.map(function (item) {
                return item.tournament;
            });
        });
}

function loadMatches(tournamentId) {
    var url = CHALLONGE_API_URL + '/tournaments/' + encodeURIComponent(tournamentId) + '/matches.json';
    // return $.get(url, {api_key: getApiKey()})
    return $.ajax({
        url: url,
        data: {api_key: getApiKey()},
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', location.origin);}
    })
        .then(function (resp) {
            return resp.map(function (item) {
                return item.match;
            });
        });
}

function loadMatch(tournamentId, matchId) {
    var url = CHALLONGE_API_URL + '/tournaments/' + encodeURIComponent(tournamentId) + '/matches/' + matchId + '.json';
    // return $.get(url, {api_key: getApiKey()})
    return $.ajax({
        url: url,
        data: {api_key: getApiKey()},
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', location.origin);}
    })
        .then(function (resp) {
            return resp.match;
        });
}
