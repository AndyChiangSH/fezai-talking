$(function () {
    $("#create").click(function () {
        // 取得輸入框文字
        var input = $("#input").val();
        // console.log(input)

        if (input == "") {
            alert("輸入不得為空白!")
        }
        else {
            var lines = input.split("\n")

            // 取得肥宅程度
            var level = $("#level").val();
            var prefix_prob = 0;
            var postfix1_prob = 0;
            var postfix2_prob = 0;
            // 依照程度給予比例
            if (level == "輕度") {
                prefix_prob = 0.1;
                postfix1_prob = 0.2;
                postfix2_prob = 0.1;
            }
            else if (level == "中度") {
                prefix_prob = 0.3;
                postfix1_prob = 0.4;
                postfix2_prob = 0.3;
            }
            else {
                prefix_prob = 0.5;
                postfix1_prob = 0.6;
                postfix2_prob = 0.5;
            }

            // 一行一行加上綴詞，由機率決定
            var output = ""
            lines.forEach(function (line, index) {
                // console.log(line, index);
                if (line == "") {
                    output = output + "\n"
                }
                else {
                    var prefix_text = ""
                    var postfix1_text = ""
                    var postfix2_text = ""

                    // 前綴詞
                    if (prob_bool(prefix_prob)) {
                        var prefix_index = Math.floor(Math.random() * prefixes.length);
                        prefix_text = prefixes[prefix_index] + " "
                    }
                    // 後綴詞1
                    if (prob_bool(postfix1_prob)) {
                        var postfix1_index = Math.floor(Math.random() * postfixes1.length);
                        postfix1_text = " " + postfixes1[postfix1_index]
                    }
                    // 後綴詞2
                    if (prob_bool(postfix2_prob)) {
                        var postfix2_index = Math.floor(Math.random() * postfixes2.length);
                        postfix2_text = " (" + postfixes2[postfix2_index]
                    }
                    // 將原文加上綴詞
                    output = output + prefix_text + line + postfix1_text + postfix2_text + "\n"
                }
            });
        }

        // 顯示在輸出框
        // console.log(output);
        $("#output").val(output);
    })

    // 機率決定
    function prob_bool(prob) {
        return Math.random() < prob;
    }

    // 一鍵複製功能
    $("#copy").click(function () {
        $("#output").select();
        document.execCommand('copy');

        alert("已複製到剪貼簿!");
    })
})