function mo_list() {
    read_json('/json/mo_campaign.json', function(json) {
        var element = document.getElementById("list");

        var inner =
            "<table>\n" +

            "<caption><strong>官方任务列表————ACT&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;红色黎明</strong></caption>\n" +

            "<tr>\n" +
            "<th>玩家阵营</th>\n" +
            "<th>任务简介</th>\n" +
            "<th>任务名称</th>\n" +
            "</tr>\n";

        var mo_act1 = json.mo_act1;
        var mo_act2 = json.mo_act2;
        var mo_challenge = json.mo_challenge;

        for (var i = 0; i < mo_act1.length; i++) {
            var color = "";
            var player_class = "";
            switch (mo_act1[i].camp) {
                case "苏联":
                    color = "darkred";
                    player_class = "soviet";
                    break;
                case "盟军":
                    color = "darkblue";
                    player_class = "allies";
                    break;
                case "厄普西隆":
                    color = "#460046";
                    player_class = "epsilon";
                    break;
            }
            inner = inner +
                "<tr>\n" +
                "<td class=\"td1\"><font color=\"" + color + "\">" + mo_act1[i].camp + "</font></td>\n" +
                "<td class=\"td2\"><font color=\"" + color + "\">" + mo_act1[i].summary + "</font></td>\n" +
                "<td class=\"td3\">\n" +
                "<a class=\"" + player_class + "\" ";
            if (mo_act1[i].vid != null) {
                inner = inner + "href=\"https://www.bilibili.com/video/BV" + mo_act1[i].vid + "/\" target=\"_blank\">";
            } else {
                inner = inner + "pointer-events=\"none\">";
            }
            inner = inner + mo_act1[i].name + "</a></td>\n" + "</tr>\n";
        }
        inner = inner + "</table>\n";

        inner = inner + "<table>\n" +

            "<caption><strong>官方任务列表————ACT&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;厄普西隆纪元</strong></caption>\n" +

            "<tr>\n" +
            "<th>玩家阵营</th>\n" +
            "<th>任务简介</th>\n" +
            "<th>任务名称</th>\n" +
            "</tr>\n";

        for (var i = 0; i < mo_act2.length; i++) {
            var color = "";
            var player_class = "";
            switch (mo_act2[i].camp) {
                case "苏联":
                    color = "darkred";
                    player_class = "soviet";
                    break;
                case "盟军":
                    color = "darkblue";
                    player_class = "allies";
                    break;
                case "厄普西隆":
                    color = "#460046";
                    player_class = "epsilon";
                    break;
                case "焚风":
                    color = "#003E3E";
                    player_class = "foehn";
                    break;
            }
            inner = inner +
                "<tr>\n" +
                "<td class=\"td1\"><font color=\"" + color + "\">" + mo_act2[i].camp + "</font></td>\n" +
                "<td class=\"td2\"><font color=\"" + color + "\">" + mo_act2[i].summary + "</font></td>\n" +
                "<td class=\"td3\">\n" +
                "<a class=\"" + player_class + "\" ";
            if (mo_act2[i].vid != null) {
                inner = inner + "href=\"https://www.bilibili.com/video/BV" + mo_act2[i].vid + "/\" target=\"_blank\">";
            } else {
                inner = inner + "pointer-events=\"none\">";
            }
            inner = inner + mo_act2[i].name + "</a></td>\n" + "</tr>\n";
        }

        inner = inner + "</table>\n";

        inner = inner + "<table>\n" +

            "<caption><strong>挑战列表</strong></caption>\n" +

            "<tr>\n" +
            "<th>挑战名称</th>\n" +
            "<th>挑战对手</th>\n" +
            "<th>挑战背景</th>\n" +
            "<th colspan=\"2\">通关视频</th>\n" +
            "</tr>\n";

        for (var i = 0; i < mo_challenge.length; i++) {
            var opponent_color = "";
            var opponent_class = "";
            if (i < 3) {
                opponent_color = "darkblue";
                opponent_class = "allies";
            } else if (i < 5 || i == 11) {
                opponent_color = "darkred";
                opponent_class = "soviet";
            } else if (i < 8 || i == 12) {
                opponent_color = "#460046";
                opponent_class = "epsilon";
            } else if (i < 11 || i == 13) {
                opponent_color = "#003E3E";
                opponent_class = "foehn";
            } else {
                opponent_color = "black";
                opponent_class = "mix";
            }

            inner = inner +
                "<tr>\n" +
                "<td class=\"name_td\">挑战-" + mo_challenge[i].name + "</td>\n" +
                "<td class=\"opponent_td\"><font color=\"" + opponent_color + "\">" + mo_challenge[i].opponent + "</font></td>\n" +
                "<td class=\"summary_td\"><font color=\"" + opponent_color + "\">" + mo_challenge[i].summary + "</font></td>\n" +

                "<td class=\"vid_td\">\n" +
                "<a class=\"mix\" ";
            
            if (mo_challenge[i].boost != null) {
                inner = inner + "href=\"https://www.bilibili.com/video/BV" + mo_challenge[i].boost + "/\" target=\"_blank\">";
            } else {
                inner = inner + "pointer-events=\"none\">";
            }
            inner = inner + "挑战-" + mo_challenge[i].name + "</a></td>\n" +

                "</tr>\n";
        }

        inner = inner + "</table>\n";

        element.innerHTML = inner;
    });

}